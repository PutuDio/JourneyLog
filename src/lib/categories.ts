import { prisma } from "@/lib/prisma";
import { DEFAULT_CATEGORIES } from "@/lib/utils";

export async function createDefaultCategories(userId: string) {
  await prisma.category.createMany({
    data: DEFAULT_CATEGORIES.map((name) => ({ userId, name })),
    skipDuplicates: true,
  });
}
