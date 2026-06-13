import { getNotes } from "@/actions/notes";
import { NoteCard } from "@/components/notes/note-card";

export default async function ArchivedNotesPage() {
  const notes = await getNotes({ archived: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Arsip</h1>
        <p className="text-sm text-muted-foreground">
          Catatan yang diarsipkan ({notes.length})
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Tidak ada catatan di arsip.
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
