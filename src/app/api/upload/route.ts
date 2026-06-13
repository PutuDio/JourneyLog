import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStorageBucket, getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limit = rateLimit(`upload:${session.user.id}:${ip}`, 20, 60_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Terlalu banyak permintaan" }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const noteId = formData.get("noteId") as string | null;

    if (!file || !noteId) {
      return NextResponse.json({ error: "File dan noteId wajib" }, { status: 400 });
    }

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId: session.user.id },
    });
    if (!note) {
      return NextResponse.json({ error: "Catatan tidak ditemukan" }, { status: 404 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak didukung" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${session.user.id}/${noteId}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = getSupabaseAdmin();
    const bucket = getStorageBucket();

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json(
        { error: uploadError.message || "Gagal mengunggah gambar" },
        { status: 500 }
      );
    }

    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);

    const image = await prisma.noteImage.create({
      data: { noteId, imageUrl: publicUrl.publicUrl },
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Konfigurasi storage belum tersedia";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = rateLimit(`delete-image:${session.user.id}`, 30, 60_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Terlalu banyak permintaan" }, { status: 429 });
  }

  const imageId = request.nextUrl.searchParams.get("imageId");
  if (!imageId) {
    return NextResponse.json({ error: "imageId wajib" }, { status: 400 });
  }

  const image = await prisma.noteImage.findFirst({
    where: { id: imageId },
    include: { note: true },
  });

  if (!image || image.note.userId !== session.user.id) {
    return NextResponse.json({ error: "Gambar tidak ditemukan" }, { status: 404 });
  }

  try {
    const url = new URL(image.imageUrl);
    const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/);
    if (pathMatch) {
      const supabase = getSupabaseAdmin();
      await supabase.storage.from(getStorageBucket()).remove([pathMatch[1]]);
    }
  } catch {
    // continue even if storage delete fails
  }

  await prisma.noteImage.delete({ where: { id: imageId } });
  return NextResponse.json({ success: true });
}
