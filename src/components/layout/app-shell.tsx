"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  NotebookPen,
  Archive,
  LogOut,
  Plus,
  Settings,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/notes", label: "Catatan", icon: NotebookPen },
  { href: "/calendar", label: "Kalender", icon: Calendar },
  { href: "/notes/archived", label: "Arsip", icon: Archive },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function AppShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-64">
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur md:bottom-auto md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:border-r md:border-t-0">
        <div className="hidden border-b p-4 md:block">
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            JourneyLog
          </Link>
          {userName && (
            <p className="mt-1 truncate text-sm text-muted-foreground">Halo, {userName}</p>
          )}
        </div>

        <nav className="flex items-center justify-around px-2 py-2 md:flex-1 md:flex-col md:items-stretch md:gap-1 md:p-4">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/notes" &&
                pathname.startsWith("/notes") &&
                !pathname.startsWith("/notes/archived") &&
                !pathname.startsWith("/notes/new"));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors md:flex-row md:gap-3 md:text-sm",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden p-4 md:block">
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </form>
        </div>
      </aside>

      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>

      <Link
        href="/notes/new"
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 md:bottom-8"
        aria-label="Buat catatan baru"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}
