"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { z } from "zod";

export async function getTags() {
  const userId = await requireUserId();
  return prisma.tag.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}

const tagSchema = z.object({
  name: z.string().min(1).max(30),
});

export async function createTag(formData: FormData) {
  const userId = await requireUserId();
  const parsed = tagSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: "Nama tag tidak valid" };

  const name = parsed.data.name.trim().toLowerCase();
  const existing = await prisma.tag.findUnique({
    where: { userId_name: { userId, name } },
  });
  if (existing) return { success: true, tag: existing };

  const tag = await prisma.tag.create({ data: { userId, name } });
  revalidatePath("/notes");
  return { success: true, tag };
}

export async function deleteTag(tagId: string) {
  const userId = await requireUserId();
  const tag = await prisma.tag.findFirst({ where: { id: tagId, userId } });
  if (!tag) return { error: "Tag tidak ditemukan" };

  await prisma.tag.delete({ where: { id: tagId } });
  revalidatePath("/notes");
  return { success: true };
}

export async function getOrCreateTags(userId: string, tagNames: string[]) {
  const tags = [];
  for (const raw of tagNames) {
    const name = raw.trim().toLowerCase();
    if (!name) continue;
    const tag = await prisma.tag.upsert({
      where: { userId_name: { userId, name } },
      create: { userId, name },
      update: {},
    });
    tags.push(tag);
  }
  return tags;
}
