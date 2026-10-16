import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNoteById } from "@/actions/notes";
import { CategoryBadge } from "@/components/notes/category-badge";
import { NoteActions } from "@/components/notes/note-actions";
import { formatDistanceToNow } from "@/lib/date";
import { ArrowLeft, Clock, MapPin, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(id);
  if (!note) notFound();

  const tags = note.noteTags.map((nt) => nt.tag.name);
  const mapsQuery =
    note.locationName ||
    note.locationAddress ||
    (note.latitude && note.longitude ? `${note.latitude},${note.longitude}` : "");
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;

  return (
    <article className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="rounded-full gap-1.5 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/notes">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <NoteActions noteId={note.id} isArchived={note.isArchived} />
      </div>

      <div className="rounded-2xl border border-outline-variant/30 bg-card p-6 md:p-10 shadow-(--shadow-md) space-y-8">
        <div className="space-y-4 pb-6 border-b border-outline-variant/20">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge name={note.category.name} />
            {note.isArchived && (
              <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                Diarsipkan
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl leading-tight">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 opacity-70" />
              <span>Terakhir diperbarui {formatDistanceToNow(note.updatedAt)}</span>
            </div>
          </div>

          {/* Location Badge / Card */}
          {(note.locationName || note.locationAddress) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-surface-container-low p-4 border border-outline-variant/30">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-container text-primary mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  {note.locationName && (
                    <h3 className="font-bold text-foreground text-sm">
                      {note.locationName}
                    </h3>
                  )}
                  {note.locationAddress && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {note.locationAddress}
                    </p>
                  )}
                </div>
              </div>

              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start sm:self-center rounded-full bg-card px-3.5 py-1.5 text-xs font-bold text-primary shadow-(--shadow-sm) hover:bg-primary-container transition-colors border border-outline-variant/30"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Buka Peta
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content body */}
        <div
          className="prose prose-neutral md:prose-lg max-w-none dark:prose-invert leading-relaxed"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        {/* Photos & Images */}
        {note.images.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-outline-variant/20">
            <h2 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
              Foto Kenangan ({note.images.length})
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {note.images.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-outline-variant/30 shadow-(--shadow-sm) group bg-surface-container"
                >
                  <Image
                    src={img.imageUrl}
                    alt={note.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
