import { getTasks, getTaskLists } from "@/actions/tasks";
import { TaskCalendar } from "@/components/calendar/task-calendar";
import { TaskSidebar } from "@/components/calendar/task-sidebar";
import { TodayView } from "@/components/calendar/views/today-view";
import { UpcomingView } from "@/components/calendar/views/upcoming-view";
import { StickyWallView } from "@/components/calendar/views/sticky-wall";

export const metadata = {
  title: "Kalender & Aktivitas | JourneyLog",
};

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; list?: string }>;
}) {
  const { view, list } = await searchParams;
  const { tasks } = await getTasks();
  const { taskLists } = await getTaskLists();

  const safeTasks = tasks || [];
  const safeLists = taskLists || [];
  
  let content = <TaskCalendar tasks={safeTasks} lists={safeLists} />;
  
  if (view === "today") {
    content = <TodayView tasks={safeTasks} />;
  } else if (view === "upcoming") {
    content = <UpcomingView tasks={safeTasks} />;
  } else if (view === "sticky") {
    content = <StickyWallView tasks={safeTasks} />;
  }

  return (
    <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-card rounded-2xl overflow-hidden border border-outline-variant/30 shadow-(--shadow-md)">
      <TaskSidebar lists={safeLists} tags={[]} />
      <div className="flex-1 bg-surface-container-low/40 p-4 md:p-6 overflow-auto">
        {content}
      </div>
    </div>
  );
}
