"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale/id";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-overrides.css";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { AddEventDialog } from "./add-event-dialog";

const locales = {
  "id": id,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type TaskEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
};

export function TaskCalendar({ tasks, lists }: { tasks: any[]; lists: any[] }) {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());

  const events: TaskEvent[] = tasks
    .filter((t) => t.startDate || t.dueDate)
    .map((task) => ({
      id: task.id,
      title: task.title,
      start: new Date(task.startDate || task.dueDate),
      end: new Date(task.endDate || task.dueDate || task.startDate),
      allDay: task.allDay || !task.startDate,
    }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    const newDate = new Date(date);
    if (action === "TODAY") {
      setDate(new Date());
    } else if (action === "PREV") {
      if (view === "month") newDate.setMonth(date.getMonth() - 1);
      else if (view === "week") newDate.setDate(date.getDate() - 7);
      else newDate.setDate(date.getDate() - 1);
      setDate(newDate);
    } else if (action === "NEXT") {
      if (view === "month") newDate.setMonth(date.getMonth() + 1);
      else if (view === "week") newDate.setDate(date.getDate() + 7);
      else newDate.setDate(date.getDate() + 1);
      setDate(newDate);
    }
  };

  return (
    <div className="flex h-full flex-col bg-card rounded-2xl shadow-(--shadow-md) border border-outline-variant/30 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground capitalize">
            {format(date, "MMMM yyyy", { locale: id })}
          </h2>
          <div className="flex items-center gap-1 bg-surface-container rounded-full p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleNavigate("PREV")}
              aria-label="Bulan sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 rounded-full text-xs font-semibold"
              onClick={() => handleNavigate("TODAY")}
            >
              Hari ini
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleNavigate("NEXT")}
              aria-label="Bulan berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container rounded-full p-1 shadow-inner">
            <button
              onClick={() => setView("day")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                view === "day"
                  ? "bg-primary text-primary-foreground shadow-(--shadow-sm)"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hari
            </button>
            <button
              onClick={() => setView("week")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                view === "week"
                  ? "bg-primary text-primary-foreground shadow-(--shadow-sm)"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Minggu
            </button>
            <button
              onClick={() => setView("month")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                view === "month"
                  ? "bg-primary text-primary-foreground shadow-(--shadow-sm)"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Bulan
            </button>
          </div>

          <AddEventDialog 
            lists={lists} 
            trigger={
              <Button size="sm" className="gap-2 shadow-(--shadow-md)">
                <Plus className="h-4 w-4" /> Tambah Kegiatan
              </Button>
            } 
          />
        </div>
      </div>
      
      <div className="flex-1 min-h-125">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          culture="id"
          toolbar={false}
          components={{
            event: CustomEvent,
          }}
        />
      </div>
    </div>
  );
}

function CustomEvent({ event }: { event: TaskEvent }) {
  return (
    <div className="text-xs px-2 py-1 rounded-lg bg-primary-container text-on-primary-container border-l-[3px] border-primary font-bold truncate shadow-xs">
      {event.title}
    </div>
  );
}
