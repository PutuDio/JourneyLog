import Link from "next/link";
import { getDashboardStats } from "@/actions/notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteCard } from "@/components/notes/note-card";
import { CategoryBadge } from "@/components/notes/category-badge";
import { FileText, MapPin, NotebookPen, Dumbbell, ArrowRight } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Travel: <MapPin className="h-5 w-5" />,
  Daily: <NotebookPen className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  Travel: "bg-[#e0f4ff] text-[#00687b]",
  Daily: "bg-[#d4f0d4] text-[#1b5e20]",
  Gym: "bg-[#ffe0cc] text-[#e65100]",
};

export default async function DashboardPage() {
  const { total, categoryCounts, recentNotes } = await getDashboardStats();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Ringkasan catatanmu</p>
      </div>

      {/* Total Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Total Catatan
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-primary">
            <FileText className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{total}</p>
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {categoryCounts.map((cat) => {
          const colorClass = categoryColors[cat.name] ?? "bg-muted text-muted-foreground";
          return (
            <Card key={cat.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CategoryBadge name={cat.name} />
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}>
                  {categoryIcons[cat.name] ?? <FileText className="h-5 w-5" />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{cat.count}</p>
                <p className="text-xs text-muted-foreground mt-1">catatan aktif</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Notes */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Catatan Terbaru</h2>
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recentNotes.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant p-10 text-center">
            <p className="text-muted-foreground">
              Belum ada catatan. Tap tombol + untuk membuat.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
