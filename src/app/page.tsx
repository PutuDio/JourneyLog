import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, NotebookPen, Dumbbell, Sparkles } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <span className="text-xl font-bold text-primary tracking-tight">JourneyLog</span>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Daftar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container">
            <Sparkles className="h-4 w-4" />
            Gratis untuk semua orang
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[57px] lg:leading-16">
            Satu tempat untuk semua{" "}
            <span className="text-primary">catatanmu</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-muted-foreground">
            Perjalanan, aktivitas harian, dan latihan gym — terorganisir dengan kategori,
            tag, pencarian cepat, dan dokumentasi foto. Buat rumah untuk kenanganmu.
          </p>
          <Button size="lg" className="mt-10 px-10 text-base" asChild>
            <Link href="/register">Mulai Gratis</Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-6 text-left sm:grid-cols-3">
          <FeatureCard
            icon={<MapPin className="h-6 w-6" />}
            color="bg-[#e0f4ff] text-[#00687b]"
            title="Travel"
            description="Jurnal perjalanan, lokasi, dan foto kenangan yang tersimpan rapi."
          />
          <FeatureCard
            icon={<NotebookPen className="h-6 w-6" />}
            color="bg-[#d4f0d4] text-[#1b5e20]"
            title="Daily"
            description="Catatan harian, to-do, dan rutinitas pribadi yang mudah diakses."
          />
          <FeatureCard
            icon={<Dumbbell className="h-6 w-6" />}
            color="bg-[#ffe0cc] text-[#e65100]"
            title="Gym"
            description="Pelacakan latihan dan progres tubuh dalam satu tempat."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 JourneyLog. Buat rumah untuk kenanganmu.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  description,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl bg-card p-6 shadow-(--shadow-md) transition-all duration-200 hover:shadow-(--shadow-lg) hover:bg-surface-container-low">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
