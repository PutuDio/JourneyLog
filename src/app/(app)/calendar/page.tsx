import { getTasks, getTaskLists } from "@/actions/tasks";
import { TaskCalendar } from "@/components/calendar/task-calendar";
import { TaskSidebar } from "@/components/calendar/task-sidebar";
import { TodayView } from "@/components/calendar/views/today-view";
import { UpcomingView } from "@/components/calendar/views/upcoming-view";
import { StickyWallView } from "@/components/calendar/views/sticky-wall";

export const metadata = {
  title: "Calendar | JourneyLog",
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
    <div className="flex h-[calc(100vh-(--spacing(20)))] md:h-[calc(100vh-(--spacing(12)))] bg-background -mx-4 -my-6 md:mx-0 md:my-0 rounded-xl overflow-hidden border">
      <TaskSidebar lists={taskLists || []} tags={[]} />
      <div className="flex-1 bg-muted/20 p-6 overflow-auto">
        {content}
      </div>
    </div>
  );
}
