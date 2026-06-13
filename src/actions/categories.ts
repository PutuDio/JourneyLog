"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { z } from "zod";

export async function getCategories() {
  const userId = await requireUserId();
  return prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}

const categorySchema = z.object({
  name: z.string().min(1).max(50),
});

export async function createCategory(formData: FormData) {
  const userId = await requireUserId();
  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: "Nama kategori tidak valid" };

  const name = parsed.data.name.trim();
  const existing = await prisma.category.findUnique({
    where: { userId_name: { userId, name } },
  });
  if (existing) return { error: "Kategori sudah ada" };

  await prisma.category.create({ data: { userId, name } });
  revalidatePath("/notes");
  revalidatePath("/dashboard");
  return { success: true };
}
