import { ChevronRight, CircleDollarSign, Landmark, Newspaper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Briefing } from "../model";

const styles = ["from-[#0f376c] to-[#2b6cab]", "from-[#356b5b] to-[#76a282]", "from-[#564281] to-[#9c79bc]"];
const icons = [CircleDollarSign, Landmark, Sparkles];

export function NewsClusters({ clusters }: { clusters: Briefing["clusters"] }) {
  return (
    <Card id="issues" className="mt-5 p-5 sm:p-7">
      <CardHeader className="items-end"><div><p className="mb-1 text-xs font-bold text-[#2a5b96]">AI 이슈 클러스터링</p><CardTitle>중복 뉴스 24건을 3개 이슈로 정리했어요</CardTitle></div><Button variant="ghost" size="sm">전체 이슈 보기 <ChevronRight size={17} /></Button></CardHeader>
      <div className="grid gap-4 lg:grid-cols-3">
        {clusters.map((cluster, index) => {
          const Icon = icons[index];
          return (
            <article key={cluster.topic} className="group overflow-hidden rounded-2xl border border-[#e0e7ef] bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#173c72]/8">
              <div className={cn("relative h-28 overflow-hidden bg-gradient-to-br", styles[index])}><div className="absolute -right-6 -top-8 h-36 w-36 rounded-full border-[20px] border-white/10" /><Icon className="absolute bottom-5 left-5 text-white/90" size={36} strokeWidth={1.5} /></div>
              <div className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-extrabold text-[#24578f]">{cluster.topic} · {cluster.count}건</span><span className="flex items-center gap-1 text-[11px] text-[#8390a2]"><Newspaper size={13} /> 출처 {cluster.count}</span></div><h3 className="font-bold leading-6">{cluster.title}</h3><p className="mt-2 text-sm leading-6 text-[#6a788c]">{cluster.summary}</p></div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
