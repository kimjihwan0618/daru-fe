import { Building2, Landmark, Sparkles, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Priority } from "@/app/(page)/(home)/type/briefing";
import { prioritiesCardStyles } from "./styles";

const icons = [Building2, Landmark, ThermometerSun];

export function PrioritiesCard({
  priorities,
  onEvidence,
}: {
  priorities: Priority[];
  onEvidence: (priority: Priority) => void;
}) {
  return (
    <Card className={prioritiesCardStyles.root}>
      <CardHeader>
        <CardTitle className={prioritiesCardStyles.title}>
          <Sparkles size={20} className={prioritiesCardStyles.titleIcon} />
          오늘 나에게 중요한 변화 3가지
        </CardTitle>
      </CardHeader>
      <div className={prioritiesCardStyles.list}>
        {priorities.map((priority, index) => {
          const Icon = icons[index];
          return (
            <div key={priority.id} className={prioritiesCardStyles.item}>
              <span className={prioritiesCardStyles.index}>{priority.id}</span>
              <span className={prioritiesCardStyles.icon}>
                <Icon size={18} />
              </span>
              <p className={prioritiesCardStyles.text}>{priority.title}</p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEvidence(priority)}
              >
                근거 보기
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
