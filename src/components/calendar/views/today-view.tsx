"use client";

import { isToday } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Clock } from "lucide-react";

export function TodayView({ tasks }: { tasks: any[] }) {
  const todayTasks = tasks.filter((t) => {
    if (t.dueDate && isToday(new Date(t.dueDate))) return true;
    if (t.startDate && isToday(new Date(t.startDate))) return true;
    return false;
  });

  return (
    <div className="bg-card rounded-2xl shadow-(--shadow-md) border border-outline-variant/30 p-6 md:p-8 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Hari Ini
            <span className="rounded-full bg-primary-container px-3 py-0.5 text-sm font-bold text-on-primary-container">
              {todayTasks.length}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Daftar tugas dan kegiatan yang dijadwalkan untuk hari ini
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-outline-variant/60 p-10 text-center">
            <p className="text-muted-foreground text-sm">Tidak ada kegiatan untuk hari ini. Nikmati harimu!</p>
          </div>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-4 p-4 rounded-2xl border border-outline-variant/30 bg-card hover:bg-surface-container-low hover:border-primary/40 transition-all duration-200 shadow-xs"
            >
              <Checkbox checked={task.isCompleted} className="mt-1" />
              <div className="flex-1">
                <h4 className={`font-bold text-base ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-3 mt-3">
                  {task.list && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-surface-container rounded-full text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full ${task.list.color || 'bg-primary'}`} />
                      {task.list.name}
                    </div>
                  )}
                  {task.dueDate && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3.5 w-3.5 opacity-70" />
                      {format(new Date(task.dueDate), "HH:mm", { locale: id })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
