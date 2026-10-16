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
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-72" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant/30 bg-card/95 backdrop-blur-lg md:bottom-auto md:top-0 md:flex md:h-screen md:w-72 md:flex-col md:border-r md:border-t-0 md:shadow-(--shadow-sm)">
        {/* Logo area - desktop */}
        <div className="hidden px-6 py-6 md:block">
          <Link href="/dashboard" className="text-xl font-bold text-primary tracking-tight">
            JourneyLog
          </Link>
          {userName && (
            <p className="mt-2 truncate text-sm text-muted-foreground">Halo, {userName} 👋</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-around px-2 py-2 md:flex-1 md:flex-col md:items-stretch md:gap-1 md:px-4 md:py-0">
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
                  "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 md:flex-row md:gap-3 md:text-sm",
                  active
                    ? "bg-primary-container text-primary font-bold"
                    : "text-muted-foreground hover:bg-surface-container-high hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout - desktop */}
        <div className="hidden px-6 pb-6 md:block">
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="mx-auto max-w-250 px-6 py-8">{children}</main>

      {/* FAB */}
      <Link
        href="/notes/new"
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-lg) transition-all duration-200 hover:bg-[#004d5c] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] active:scale-95 md:bottom-8"
        aria-label="Buat catatan baru"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}
