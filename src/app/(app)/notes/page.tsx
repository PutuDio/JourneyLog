import { Suspense } from "react";
import { getNotes } from "@/actions/notes";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { NoteCard } from "@/components/notes/note-card";
import { NotesSearch } from "@/components/notes/notes-search";
import { Skeleton } from "@/components/ui/skeleton";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const [notes, categories, tags] = await Promise.all([
    getNotes({
      search: params.q,
      categoryId: params.category && params.category !== "all" ? params.category : undefined,
      tagId: params.tag && params.tag !== "all" ? params.tag : undefined,
      archived: false,
    }),
    getCategories(),
    getTags(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catatan</h1>
        <p className="text-sm text-muted-foreground">
          {notes.length} catatan ditemukan
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-20 w-full" />}>
        <NotesSearch categories={categories} tags={tags} />
      </Suspense>

      {notes.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Tidak ada catatan. Coba ubah filter atau buat catatan baru.
        </p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
