import { CalendarClock, CarFront, Clock3, Globe2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Briefing } from "../model";

const icons = [Clock3, Globe2, CarFront];

export function ScheduleCard({ schedule }: { schedule: Briefing["schedule"] }) {
  return (
    <Card className="p-5 sm:p-7">
      <CardHeader className="mb-3"><CardTitle className="flex items-center gap-2"><CalendarClock size={20} className="text-[#28538d]" />오늘의 일정</CardTitle></CardHeader>
      <div className="divide-y divide-[#e7ecf2]">
        {schedule.map((item, index) => {
          const Icon = icons[index];
          return <div key={item.time} className="flex items-center gap-4 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef2f8] text-[#294a75]"><Icon size={19} /></span><span className="w-12 font-semibold text-[#29415f]">{item.time}</span><span className="font-medium text-[#334861]">{item.label}</span></div>;
        })}
      </div>
    </Card>
  );
}
