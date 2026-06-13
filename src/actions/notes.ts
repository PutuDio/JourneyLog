"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { getOrCreateTags } from "@/actions/tags";
import { noteInclude } from "@/types/note";
import { z } from "zod";

export async function getNotes(options?: {
  search?: string;
  categoryId?: string;
  tagId?: string;
  archived?: boolean;
}) {
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

  return prisma.note.findMany({
    where,
    include: noteInclude,
    orderBy: { updatedAt: "desc" },
    take: search ? 50 : undefined,
  });
}

export async function getNoteById(noteId: string) {
  const userId = await requireUserId();
  return prisma.note.findFirst({
    where: { id: noteId, userId },
    include: noteInclude,
  });
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
    }),
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
  isArchived: z.coerce.boolean().optional(),
});

export async function createNote(formData: FormData) {
  const userId = await requireUserId();
  const parsed = noteSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
    tags: formData.get("tags"),
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
      noteTags: {
        create: tags.map((tag) => ({ tagId: tag.id })),
      },
    },
    include: noteInclude,
  });

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
      ...(parsed.data.isArchived !== undefined
        ? { isArchived: parsed.data.isArchived }
        : {}),
      noteTags: {
        create: tags.map((tag) => ({ tagId: tag.id })),
      },
    },
    include: noteInclude,
  });

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
