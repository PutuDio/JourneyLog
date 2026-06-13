"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale/id";

// Pre-defined pastel colors for sticky notes
const stickyColors = [
  "bg-[#fdf4c8]", // yellow
  "bg-[#ffd1dc]", // pink
  "bg-[#d1e8ff]", // blue
  "bg-[#d4f0d4]", // green
  "bg-[#e6d9f2]", // purple
];

export function StickyWallView({ tasks }: { tasks: any[] }) {
  // Hanya ambil tugas yang belum selesai untuk di dinding
  const activeTasks = tasks.filter(t => !t.isCompleted);

  return (
    <div className="bg-transparent h-full overflow-auto">
      <h2 className="text-3xl font-bold mb-6 text-foreground">Sticky Wall</h2>
      
      {activeTasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <p className="text-muted-foreground">Tidak ada tugas aktif di dinding.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeTasks.map((task, index) => {
            const colorClass = stickyColors[index % stickyColors.length];
            return (
              <div 
                key={task.id} 
                className={`${colorClass} rounded-sm p-4 shadow-sm min-h-[200px] flex flex-col relative group`}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{task.description}</p>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between text-xs text-gray-600 font-medium">
                  {task.dueDate ? (
                    <span>{format(new Date(task.dueDate), "dd MMM yyyy", { locale: id })}</span>
                  ) : (
                    <span>No Date</span>
                  )}
                  {task.list && (
                    <span className="bg-black/5 px-2 py-1 rounded-md">{task.list.name}</span>
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
