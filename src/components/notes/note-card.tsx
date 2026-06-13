import Link from "next/link";
import { formatDistanceToNow } from "@/lib/date";
import { CategoryBadge } from "@/components/notes/category-badge";
import type { NoteWithRelations } from "@/types/note";

export function NoteCard({ note }: { note: NoteWithRelations }) {
  const preview = note.content.replace(/<[^>]+>/g, "").slice(0, 120);
  const tags = note.noteTags.map((nt) => nt.tag.name);

  return (
    <Link
      href={`/notes/${note.id}`}
      className="block rounded-xl border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold line-clamp-1">{note.title}</h3>
        <CategoryBadge name={note.category.name} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {preview || "Tanpa konten"} 
      </p>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
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
      <p className="mt-3 text-xs text-muted-foreground">
        {formatDistanceToNow(note.updatedAt)}
      </p>
    </Link>
  );
}
