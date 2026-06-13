import { notFound } from "next/navigation";
import { getNoteById } from "@/actions/notes";
import { getCategories } from "@/actions/categories";
import { NoteForm } from "@/components/notes/note-form";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [note, categories] = await Promise.all([getNoteById(id), getCategories()]);
  if (!note) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Catatan</h1>
      <NoteForm categories={categories} note={note} />
    </div>
  );
}
