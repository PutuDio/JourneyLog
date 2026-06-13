"use client";

import Link from "next/link";
import { ChevronRight, Calendar as CalendarIcon, Sun, CalendarDays, StickyNote, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AddListDialog } from "./add-list-dialog";
import { AddEventDialog } from "./add-event-dialog";
import { AddTagDialog } from "./add-tag-dialog";

export function TaskSidebar({ lists, tags }: { lists: any[]; tags: any[] }) {
  return (
    <div className="w-64 shrink-0 bg-background h-full flex flex-col pt-4">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 bg-muted/50 border-none rounded-lg" />
        </div>
        
        <AddEventDialog 
          lists={lists} 
          trigger={
            <button className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Add Event
            </button>
          } 
        />
      </div>

      <div className="flex-1 overflow-auto px-2 space-y-6">
        {/* TASKS */}
        <div className="px-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tasks</h3>
          <div className="space-y-1">
            <Link href="/calendar?view=upcoming" className="flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <div className="flex items-center gap-3">
                <ChevronRight className="h-4 w-4" />
                Upcoming
              </div>
            </Link>
            <Link href="/calendar?view=today" className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4" />
                Today
              </div>
            </Link>
            <Link href="/calendar" className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-muted text-foreground transition-colors font-medium">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4" />
                Calendar
              </div>
            </Link>
            <Link href="/calendar?view=sticky" className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <div className="flex items-center gap-3">
                <StickyNote className="h-4 w-4" />
                Sticky Wall
              </div>
            </Link>
          </div>
        </div>

        <Separator className="mx-4 w-auto opacity-50" />

        {/* LISTS */}
        <div className="px-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Lists</h3>
          <div className="space-y-1">
            {lists.map((list) => (
              <Link key={list.id} href={`/calendar?list=${list.id}`} className="flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-sm ${list.color || 'bg-blue-500'}`} />
                  {list.name}
                </div>
              </Link>
            ))}
            <AddListDialog />
          </div>
        </div>

        <Separator className="mx-4 w-auto opacity-50" />

        {/* TAGS */}
        <div className="px-2 pb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2 px-1 mt-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium cursor-pointer">Tag 1</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium cursor-pointer">Tag 2</span>
            <AddTagDialog />
          </div>
        </div>
      </div>
      
    </div>
  );
}
