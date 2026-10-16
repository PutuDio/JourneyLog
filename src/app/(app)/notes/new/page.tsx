import Link from "next/link";
import { getCategories } from "@/actions/categories";
import { NoteForm } from "@/components/notes/note-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function NewNotePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
          <Link href="/notes" aria-label="Kembali ke daftar catatan">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Catatan Baru
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Abadikan ide, kegiatan, dan momen berhargamu
          </p>
        </div>
      </div>

      <NoteForm categories={categories} />
    </div>
  );
}
