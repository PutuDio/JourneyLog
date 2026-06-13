"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getTasks() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      include: {
        list: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { tasks };
  } catch (error) {
    return { error: "Gagal mengambil tugas" };
  }
}

export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  if (!title) return { error: "Judul wajib diisi" };

  const description = formData.get("description") as string | null;
  const listId = formData.get("listId") as string | null;
  const startDateStr = formData.get("startDate") as string | null;
  const endDateStr = formData.get("endDate") as string | null;
  const allDay = formData.get("allDay") === "true";

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: session.user.id,
        listId: listId || null,
        startDate: startDateStr ? new Date(startDateStr) : null,
        endDate: endDateStr ? new Date(endDateStr) : null,
        allDay,
      },
    });

    revalidatePath("/calendar");
    return { task };
  } catch (error) {
    return { error: "Gagal membuat tugas" };
  }
}

export async function updateTask(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const listId = formData.get("listId") as string | null;
  const startDateStr = formData.get("startDate") as string | null;
  const endDateStr = formData.get("endDate") as string | null;
  const allDay = formData.get("allDay") === "true";
  const isCompleted = formData.get("isCompleted") === "true";

  try {
    const task = await prisma.task.update({
      where: { id, userId: session.user.id },
      data: {
        title,
        description,
        listId: listId || null,
        startDate: startDateStr ? new Date(startDateStr) : null,
        endDate: endDateStr ? new Date(endDateStr) : null,
        allDay,
        isCompleted,
      },
    });

    revalidatePath("/calendar");
    return { task };
  } catch (error) {
    return { error: "Gagal memperbarui tugas" };
  }
}

export async function deleteTask(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.task.delete({
      where: { id, userId: session.user.id },
    });

    revalidatePath("/calendar");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus tugas" };
  }
}

export async function getTaskLists() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const taskLists = await prisma.taskList.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });
    return { taskLists };
  } catch (error) {
    return { error: "Gagal mengambil daftar tugas" };
  }
}

export async function createTaskList(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  if (!name) return { error: "Nama wajib diisi" };
  const color = formData.get("color") as string | null;

  try {
    const taskList = await prisma.taskList.create({
      data: {
        name,
        color,
        userId: session.user.id,
      },
    });

    revalidatePath("/calendar");
    return { taskList };
  } catch (error) {
    return { error: "Gagal membuat daftar tugas" };
  }
}
