import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, NotebookPen, Dumbbell } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <span className="text-xl font-bold text-primary">JourneyLog</span>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Daftar</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 text-center md:pt-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Satu tempat untuk semua catatanmu
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Perjalanan, aktivitas harian, dan latihan gym — terorganisir dengan kategori,
          tag, pencarian cepat, dan dokumentasi foto.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/register">Mulai Gratis</Link>
        </Button>

        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          <FeatureCard
            icon={<MapPin className="h-6 w-6 text-sky-600" />}
            title="Travel"
            description="Jurnal perjalanan, lokasi, dan foto kenangan."
          />
          <FeatureCard
            icon={<NotebookPen className="h-6 w-6 text-emerald-600" />}
            title="Daily"
            description="Catatan harian, to-do, dan rutinitas pribadi."
          />
          <FeatureCard
            icon={<Dumbbell className="h-6 w-6 text-orange-600" />}
            title="Gym"
            description="Pelacakan latihan dan progres tubuh."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
