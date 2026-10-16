import { getNotes } from "@/actions/notes";
import { NoteCard } from "@/components/notes/note-card";
import { Archive, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ArchivedNotesPage() {
  const notes = await getNotes({ archived: true });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Arsip Catatan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {notes.length} catatan tersimpan di arsip
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/notes">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Kembali
          </Link>
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/60 bg-surface-container-low/50 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-muted-foreground mb-4">
            <Archive className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Arsip masih kosong</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Catatan yang kamu arsipkan akan tampil di sini agar tetap tersimpan rapi tanpa memenuhi halaman utama.
          </p>
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
