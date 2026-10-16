import { notFound } from "next/navigation";
import Link from "next/link";
import { getNoteById } from "@/actions/notes";
import { getCategories } from "@/actions/categories";
import { NoteForm } from "@/components/notes/note-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
          <Link href={`/notes/${note.id}`} aria-label="Kembali ke detail catatan">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Edit Catatan
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Perbarui cerita dan detail catatan ini
          </p>
        </div>
      </div>

      <NoteForm categories={categories} note={note} />
    </div>
  );
}
