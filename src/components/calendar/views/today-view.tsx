"use client";

import { isToday, isSameDay } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";

export function TodayView({ tasks }: { tasks: any[] }) {
  const todayTasks = tasks.filter((t) => {
    if (t.dueDate && isToday(new Date(t.dueDate))) return true;
    if (t.startDate && isToday(new Date(t.startDate))) return true;
    return false;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full overflow-auto">
      <h2 className="text-3xl font-bold mb-6">Today <span className="text-muted-foreground font-normal text-xl ml-2">{todayTasks.length}</span></h2>
      
      <div className="space-y-4">
        {todayTasks.length === 0 ? (
          <p className="text-muted-foreground">Tidak ada tugas hari ini.</p>
        ) : (
          todayTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors">
              <Checkbox checked={task.isCompleted} className="mt-1" />
              <div className="flex-1">
                <h4 className={`font-medium ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h4>
                {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
                
                <div className="flex items-center gap-4 mt-3">
                  {task.list && (
                    <div className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full ${task.list.color || 'bg-blue-500'}`} />
                      {task.list.name}
                    </div>
                  )}
                  {task.dueDate && (
                    <span className="text-xs text-muted-foreground">
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
