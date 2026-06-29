import { Building2, Landmark, Sparkles, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Priority } from "../model";

const icons = [Building2, Landmark, ThermometerSun];

export function PrioritiesCard({ priorities, onEvidence }: { priorities: Priority[]; onEvidence: (priority: Priority) => void }) {
  return (
    <Card className="p-5 sm:p-7">
      <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles size={20} className="text-[#28538d]" />오늘 나에게 중요한 변화 3가지</CardTitle></CardHeader>
      <div className="space-y-2.5">
        {priorities.map((priority, index) => {
          const Icon = icons[index];
          return (
            <div key={priority.id} className="group flex items-center gap-3 rounded-xl border border-[#e2e8f0] px-3 py-3 transition hover:border-[#b9c9dc] hover:bg-[#f9fbfd] sm:px-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f0f3f8] text-xs font-bold text-[#4d607a]">{priority.id}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf1fb] text-[#19467e]"><Icon size={18} /></span>
              <p className="min-w-0 flex-1 text-sm font-semibold leading-6 sm:text-[15px]">{priority.title}</p>
              <Button size="sm" variant="secondary" onClick={() => onEvidence(priority)}>근거 보기</Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
