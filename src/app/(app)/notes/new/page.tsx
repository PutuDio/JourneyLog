import { getCategories } from "@/actions/categories";
import { NoteForm } from "@/components/notes/note-form";

export default async function NewNotePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Catatan Baru</h1>
      <NoteForm categories={categories} />
    </div>
  );
}
