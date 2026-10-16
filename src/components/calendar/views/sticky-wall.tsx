"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Calendar } from "lucide-react";

// Pre-defined warm pastel colors for sticky notes that harmonize with Journey palette
const stickyColors = [
  "bg-[#fdf4c8] text-[#332a00] border-[#f2e299]", // soft yellow
  "bg-[#ffd9e2] text-[#3e1422] border-[#f5b8c6]", // soft rose
  "bg-[#d5eeff] text-[#002f4a] border-[#b0dcf5]", // soft cyan/teal
  "bg-[#dcf5dc] text-[#133814] border-[#b8e6b8]", // soft sage green
  "bg-[#f5e0f5] text-[#331333] border-[#e6c4e6]", // soft mauve
];

export function StickyWallView({ tasks }: { tasks: any[] }) {
  const activeTasks = tasks.filter((t) => !t.isCompleted);

  return (
    <div className="bg-transparent h-full overflow-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          Sticky Wall
          <span className="rounded-full bg-surface-container px-3 py-0.5 text-sm font-bold text-muted-foreground">
            {activeTasks.length}
          </span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Catatan tempel visual untuk tugas dan pengingat aktifmu
        </p>
      </div>
      
      {activeTasks.length === 0 ? (
        <div className="bg-card rounded-2xl shadow-(--shadow-sm) border border-outline-variant/30 p-12 text-center">
          <p className="text-muted-foreground text-sm">Tidak ada tugas aktif di dinding tempel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeTasks.map((task, index) => {
            const colorClass = stickyColors[index % stickyColors.length];
            return (
              <div 
                key={task.id} 
                className={`${colorClass} rounded-2xl p-6 shadow-(--shadow-md) hover:shadow-(--shadow-lg) transition-all duration-200 min-h-55 flex flex-col justify-between border`}
              >
                <div>
                  <h4 className="font-bold text-lg leading-snug mb-2">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm opacity-90 whitespace-pre-wrap leading-relaxed line-clamp-4">
                      {task.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold">
                  {task.dueDate ? (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(task.dueDate), "dd MMM yyyy", { locale: id })}
                    </span>
                  ) : (
                    <span>Tanpa batas waktu</span>
                  )}
                  {task.list && (
                    <span className="bg-black/10 px-2.5 py-0.5 rounded-full">{task.list.name}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
