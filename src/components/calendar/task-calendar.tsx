"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale/id";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-overrides.css";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
      start: task.startDate || task.dueDate,
      end: task.endDate || task.dueDate || task.startDate,
      allDay: task.allDay || !task.startDate, // if only due date, make it all day
    }));

  return (
    <div className="flex h-full flex-col bg-white rounded-xl shadow-sm border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{format(date, "MMMM yyyy", { locale: id })}</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("day")}
              className="text-xs h-8"
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("week")}
              className="text-xs h-8"
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("month")}
              className="text-xs h-8"
            >
              Month
            </Button>
          </div>
          <AddEventDialog 
            lists={lists} 
            trigger={
              <Button size="sm" className="ml-4 gap-2">
                <Plus className="h-4 w-4" /> Add Event
              </Button>
            } 
          />
        </div>
      </div>
      
      <div className="flex-1 min-h-[600px]">
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
          toolbar={false} // We built custom toolbar above
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
    <div className="text-xs p-1 rounded-sm bg-blue-100 text-blue-800 border-l-2 border-blue-500 w-full h-full font-medium truncate">
      {event.title}
    </div>
  );
}
