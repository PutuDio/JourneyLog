"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { archiveNote, deleteNote } from "@/actions/notes";
import { Archive, ArchiveRestore, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

export function NoteActions({
  noteId,
  isArchived,
}: {
  noteId: string;
  isArchived: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleArchive() {
    startTransition(async () => {
      const result = await archiveNote(noteId, !isArchived);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(isArchived ? "Catatan dipulihkan" : "Catatan diarsipkan");
      router.push(isArchived ? "/notes" : "/notes/archived");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Hapus catatan ini secara permanen?")) return;
    startTransition(async () => {
      const result = await deleteNote(noteId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Catatan dihapus");
      router.push("/notes");
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/notes/${noteId}/edit`}>
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleArchive}
        disabled={pending}
      >
        {isArchived ? (
          <>
            <ArchiveRestore className="h-4 w-4" />
            Pulihkan
          </>
        ) : (
          <>
            <Archive className="h-4 w-4" />
            Arsipkan
          </>
        )}
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={pending}>
        <Trash2 className="h-4 w-4" />
        Hapus
      </Button>
    </div>
  );
}
