"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { getOrCreateTags } from "@/actions/tags";
import { noteInclude, NoteWithRelations } from "@/types/note";
import { getStorageBucket, getSupabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

async function uploadFilesForNote(userId: string, noteId: string, files: File[]) {
  try {
    const supabase = getSupabaseAdmin();
    const bucket = getStorageBucket();

    for (const file of files) {
      if (!file || typeof file !== "object" || !file.size) continue;
      if (!ALLOWED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_SIZE) continue;

      const ext = file.name?.split(".").pop() ?? "jpg";
      const randomStr = Math.random().toString(36).substring(2, 8);
      const path = `${userId}/${noteId}/${Date.now()}-${randomStr}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, { contentType: file.type, upsert: false });

      if (!uploadError) {
        const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
        await prisma.noteImage.create({
          data: { noteId, imageUrl: publicUrl.publicUrl },
        });
      }
    }
  } catch (err) {
    console.error("Error uploading note images:", err);
  }
}

export async function getNotes(options?: {
  search?: string;
  categoryId?: string;
  tagId?: string;
  archived?: boolean;
}): Promise<NoteWithRelations[]> {
  const userId = await requireUserId();
  const search = options?.search?.trim();
  const archived = options?.archived ?? false;

  const where = {
    userId,
    isArchived: archived,
    ...(options?.categoryId ? { categoryId: options.categoryId } : {}),
    ...(options?.tagId
      ? { noteTags: { some: { tagId: options.tagId } } }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { content: { contains: search, mode: "insensitive" as const } },
            { locationName: { contains: search, mode: "insensitive" as const } },
            { locationAddress: { contains: search, mode: "insensitive" as const } },
            {
              noteTags: {
                some: {
                  tag: { name: { contains: search, mode: "insensitive" as const } },
                },
              },
            },
            {
              category: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
  };

  const notes = await prisma.note.findMany({
    where,
    include: noteInclude,
    orderBy: { updatedAt: "desc" },
    take: search ? 50 : undefined,
  });

  return notes as NoteWithRelations[];
}

export async function getNoteById(noteId: string): Promise<NoteWithRelations | null> {
  const userId = await requireUserId();
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
    include: noteInclude,
  });
  return note as NoteWithRelations | null;
}

export async function getDashboardStats() {
  const userId = await requireUserId();

  const [total, categories, recentNotes] = await Promise.all([
    prisma.note.count({ where: { userId, isArchived: false } }),
    prisma.category.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            notes: { where: { isArchived: false } },
          },
        },
      },
    }),
    prisma.note.findMany({
      where: { userId, isArchived: false },
      include: noteInclude,
      orderBy: { updatedAt: "desc" },
      take: 5,
    }) as Promise<NoteWithRelations[]>,
  ]);

  const categoryCounts = categories.map((c) => ({
    id: c.id,
    name: c.name,
    count: c._count.notes,
  }));

  return { total, categoryCounts, recentNotes };
}

const noteSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200),
  content: z.string(),
  categoryId: z.string().min(1),
  tags: z.string().optional(),
  locationName: z.string().optional(),
  locationAddress: z.string().optional(),
  latitude: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number().optional()
  ),
  longitude: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number().optional()
  ),
  isArchived: z.coerce.boolean().optional(),
});

export async function createNote(formData: FormData) {
  const userId = await requireUserId();
  const parsed = noteSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
    tags: formData.get("tags"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Data tidak valid" };
  }

  const category = await prisma.category.findFirst({
    where: { id: parsed.data.categoryId, userId },
  });
  if (!category) return { error: "Kategori tidak valid" };

  const tagNames = parsed.data.tags
    ? parsed.data.tags.split(",").map((t) => t.trim())
    : [];
  const tags = await getOrCreateTags(userId, tagNames);

  const note = await prisma.note.create({
    data: {
      userId,
      categoryId: parsed.data.categoryId,
      title: parsed.data.title.trim(),
      content: parsed.data.content,
      locationName: parsed.data.locationName?.trim() || null,
      locationAddress: parsed.data.locationAddress?.trim() || null,
      latitude: parsed.data.latitude ?? null,
      longitude: parsed.data.longitude ?? null,
      noteTags: {
        create: tags.map((tag) => ({ tagId: tag.id })),
      },
    },
    include: noteInclude,
  });

  // Handle photos uploaded directly during creation
  const files = formData.getAll("images") as File[];
  if (files && files.length > 0) {
    await uploadFilesForNote(userId, note.id, files);
  }

  revalidatePath("/dashboard");
  revalidatePath("/notes");
  return { success: true, note };
}

export async function updateNote(noteId: string, formData: FormData) {
  const userId = await requireUserId();
  const parsed = noteSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
    tags: formData.get("tags"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    isArchived: formData.get("isArchived"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Data tidak valid" };
  }

  const existing = await prisma.note.findFirst({
    where: { id: noteId, userId },
  });
  if (!existing) return { error: "Catatan tidak ditemukan" };

  const tagNames = parsed.data.tags
    ? parsed.data.tags.split(",").map((t) => t.trim())
    : [];
  const tags = await getOrCreateTags(userId, tagNames);

  await prisma.noteTag.deleteMany({ where: { noteId } });

  const note = await prisma.note.update({
    where: { id: noteId },
    data: {
      title: parsed.data.title.trim(),
      content: parsed.data.content,
      categoryId: parsed.data.categoryId,
      locationName: parsed.data.locationName?.trim() || null,
      locationAddress: parsed.data.locationAddress?.trim() || null,
      latitude: parsed.data.latitude ?? null,
      longitude: parsed.data.longitude ?? null,
      ...(parsed.data.isArchived !== undefined
        ? { isArchived: parsed.data.isArchived }
        : {}),
      noteTags: {
        create: tags.map((tag) => ({ tagId: tag.id })),
      },
    },
    include: noteInclude,
  });

  // Handle additional photos uploaded during update
  const files = formData.getAll("images") as File[];
  if (files && files.length > 0) {
    await uploadFilesForNote(userId, note.id, files);
  }

  revalidatePath("/dashboard");
  revalidatePath("/notes");
  revalidatePath(`/notes/${noteId}`);
  return { success: true, note };
}

export async function archiveNote(noteId: string, archived = true) {
  const userId = await requireUserId();
  const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
  if (!note) return { error: "Catatan tidak ditemukan" };

  await prisma.note.update({
    where: { id: noteId },
    data: { isArchived: archived },
  });

  revalidatePath("/dashboard");
  revalidatePath("/notes");
  return { success: true };
}

export async function deleteNote(noteId: string) {
  const userId = await requireUserId();
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
    include: { images: true },
  });
  if (!note) return { error: "Catatan tidak ditemukan" };

  await prisma.note.delete({ where: { id: noteId } });

  revalidatePath("/dashboard");
  revalidatePath("/notes");
  return { success: true, imageUrls: note.images.map((i) => i.imageUrl) };
}
