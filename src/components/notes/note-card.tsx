import Link from "next/link";
import { formatDistanceToNow } from "@/lib/date";
import { CategoryBadge } from "@/components/notes/category-badge";
import type { NoteWithRelations } from "@/types/note";
import { Clock, MapPin, ImageIcon } from "lucide-react";

export function NoteCard({ note }: { note: NoteWithRelations }) {
  const preview = note.content.replace(/<[^>]+>/g, "").slice(0, 140);
  const tags = note.noteTags.map((nt) => nt.tag.name);

  return (
    <Link
      href={`/notes/${note.id}`}
      className="group block rounded-2xl border border-outline-variant/30 bg-card p-6 shadow-(--shadow-md) transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-container-low hover:shadow-(--shadow-lg)"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {note.title}
        </h3>
        <CategoryBadge name={note.category.name} />
      </div>

      {note.locationName && (
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary-container/30 px-2.5 py-0.5 rounded-full">
          <MapPin className="h-3 w-3" />
          <span className="truncate max-w-60">{note.locationName}</span>
        </div>
      )}

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {preview || "Belum ada konten catatan..."}
      </p>

      {tags.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary-container/40 group-hover:text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-outline-variant/20">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 opacity-70" />
          <span>{formatDistanceToNow(note.updatedAt)}</span>
        </div>

        {note.images.length > 0 && (
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-surface-container px-2 py-0.5 rounded-full">
            <ImageIcon className="h-3 w-3 text-primary" />
            <span>{note.images.length} foto</span>
          </div>
        )}
      </div>
    </Link>
  );
}
