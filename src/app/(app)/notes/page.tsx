import { Suspense } from "react";
import Link from "next/link";
import { getNotes } from "@/actions/notes";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { NoteCard } from "@/components/notes/note-card";
import { NotesSearch } from "@/components/notes/notes-search";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Catatan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {notes.length} momen tersimpan dalam jurnalmu
          </p>
        </div>
        <Button asChild className="self-start sm:self-auto gap-2 shadow-(--shadow-md)">
          <Link href="/notes/new">
            <Plus className="h-4 w-4" />
            Tulis Catatan
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-2xl" />}>
        <NotesSearch categories={categories} tags={tags} />
      </Suspense>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/60 bg-surface-container-low/50 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-primary mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Belum ada catatan ditemukan</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Coba ubah kata kunci pencarian, sesuaikan filter, atau buat catatan baru untuk memulai cerita.
          </p>
          <Button asChild className="mt-6 gap-2" variant="outline">
            <Link href="/notes/new">
              <Plus className="h-4 w-4" />
              Buat Catatan Baru
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
