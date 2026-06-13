import { notFound } from "next/navigation";
import Image from "next/image";
import { getNoteById } from "@/actions/notes";
import { CategoryBadge } from "@/components/notes/category-badge";
import { NoteActions } from "@/components/notes/note-actions";
import { formatDistanceToNow } from "@/lib/date";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(id);
  if (!note) notFound();

  const tags = note.noteTags.map((nt) => nt.tag.name);

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge name={note.category.name} />
          {note.isArchived && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">Diarsipkan</span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p className="text-sm text-muted-foreground">
          Diperbarui {formatDistanceToNow(note.updatedAt)}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <NoteActions noteId={note.id} isArchived={note.isArchived} />

      <div
        className="prose prose-sm max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {note.images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {note.images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-lg border"
            >
              <Image src={img.imageUrl} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
