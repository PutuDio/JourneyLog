import Link from "next/link";
import { getDashboardStats } from "@/actions/notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteCard } from "@/components/notes/note-card";
import { CategoryBadge } from "@/components/notes/category-badge";
import { FileText, MapPin, NotebookPen, Dumbbell } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Travel: <MapPin className="h-5 w-5 text-sky-600" />,
  Daily: <NotebookPen className="h-5 w-5 text-emerald-600" />,
  Gym: <Dumbbell className="h-5 w-5 text-orange-600" />,
};

export default async function DashboardPage() {
  const { total, categoryCounts, recentNotes } = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Ringkasan catatanmu</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Catatan
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{total}</p>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        {categoryCounts.map((cat) => (
          <Card key={cat.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CategoryBadge name={cat.name} />
              {categoryIcons[cat.name] ?? <FileText className="h-5 w-5" />}
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{cat.count}</p>
              <p className="text-xs text-muted-foreground">catatan aktif</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Catatan Terbaru</h2>
          <Link href="/notes" className="text-sm text-primary hover:underline">
            Lihat semua
          </Link>
        </div>
        {recentNotes.length === 0 ? (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Belum ada catatan. Tap tombol + untuk membuat.
          </p>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
