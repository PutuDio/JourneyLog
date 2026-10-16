"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Sun,
  ChevronRight,
  StickyNote,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AddListDialog } from "./add-list-dialog";
import { AddEventDialog } from "./add-event-dialog";
import { AddTagDialog } from "./add-tag-dialog";
import { cn } from "@/lib/utils";

export function TaskSidebar({ lists, tags }: { lists: any[]; tags: any[] }) {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const currentList = searchParams.get("list");

  return (
    <div className="w-64 shrink-0 bg-card border-r border-outline-variant/30 h-full flex flex-col pt-4">
      <div className="px-4 mb-4 space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Aktivitas</h2>
        
        <AddEventDialog 
          lists={lists} 
          trigger={
            <button className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-full text-sm font-bold shadow-(--shadow-md) hover:bg-[#004d5c] hover:shadow-(--shadow-lg) transition-all duration-200">
              <Plus className="h-4 w-4" /> Tambah Kegiatan
            </button>
          } 
        />
      </div>

      <div className="flex-1 overflow-auto px-3 space-y-6">
        {/* TASKS VIEWS */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Tampilan
          </h3>
          <div className="space-y-1">
            <Link
              href="/calendar"
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-colors",
                !currentView && !currentList
                  ? "bg-primary-container text-primary font-bold"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
              )}
            >
              <CalendarDays className="h-4 w-4" />
              <span>Kalender Bulanan</span>
            </Link>

            <Link
              href="/calendar?view=today"
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-colors",
                currentView === "today"
                  ? "bg-primary-container text-primary font-bold"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
              )}
            >
              <Sun className="h-4 w-4" />
              <span>Hari Ini</span>
            </Link>

            <Link
              href="/calendar?view=upcoming"
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-colors",
                currentView === "upcoming"
                  ? "bg-primary-container text-primary font-bold"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
              )}
            >
              <ChevronRight className="h-4 w-4" />
              <span>Mendatang</span>
            </Link>

            <Link
              href="/calendar?view=sticky"
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-colors",
                currentView === "sticky"
                  ? "bg-primary-container text-primary font-bold"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
              )}
            >
              <StickyNote className="h-4 w-4" />
              <span>Sticky Wall</span>
            </Link>
          </div>
        </div>

        <Separator className="opacity-40" />

        {/* LISTS */}
        <div>
          <div className="flex items-center justify-between mb-2 px-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Kategori List
            </h3>
          </div>
          <div className="space-y-1">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/calendar?list=${list.id}`}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors",
                  currentList === list.id
                    ? "bg-primary-container text-primary font-bold"
                    : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${list.color || 'bg-primary'}`} />
                  <span>{list.name}</span>
                </div>
              </Link>
            ))}
            <AddListDialog />
          </div>
        </div>

        <Separator className="opacity-40" />

        {/* TAGS */}
        <div className="pb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Tag Cepat
          </h3>
          <div className="flex flex-wrap gap-1.5 px-3 mt-2">
            <span className="px-2.5 py-1 bg-surface-container text-muted-foreground rounded-full text-xs font-medium cursor-pointer hover:bg-primary-container hover:text-primary transition-colors">
              Penting
            </span>
            <span className="px-2.5 py-1 bg-surface-container text-muted-foreground rounded-full text-xs font-medium cursor-pointer hover:bg-primary-container hover:text-primary transition-colors">
              Harian
            </span>
            <AddTagDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
