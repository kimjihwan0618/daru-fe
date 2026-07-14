import { CalendarClock, CarFront, Clock3, Globe2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Briefing } from "@/app/(page)/(home)/type/briefing";
import { scheduleCardStyles } from "./styles";

const icons = [Clock3, Globe2, CarFront];

export function ScheduleCard({ schedule }: { schedule: Briefing["schedule"] }) {
  return (
    <Card className={scheduleCardStyles.root}>
      <CardHeader className={scheduleCardStyles.header}>
        <CardTitle className={scheduleCardStyles.title}>
          <CalendarClock size={20} className={scheduleCardStyles.titleIcon} />
          오늘의 일정
        </CardTitle>
      </CardHeader>
      <div className={scheduleCardStyles.list}>
        {schedule.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.time} className={scheduleCardStyles.item}>
              <span className={scheduleCardStyles.icon}>
                <Icon size={19} />
              </span>
              <span className={scheduleCardStyles.time}>{item.time}</span>
              <span className={scheduleCardStyles.label}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
