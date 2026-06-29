import { ChevronRight, Info } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Briefing } from "../model";

const lines = [
  "3,14 12,11 20,18 28,7 36,14 45,9 54,19 62,12 72,17 82,7 92,13 103,10",
  "3,10 12,15 20,9 28,20 36,17 45,22 54,14 62,19 72,12 82,18 92,15 103,20",
  "3,18 12,8 20,13 28,6 36,15 45,11 54,18 62,10 72,16 82,7 92,12 103,9",
];

export function StockImpactCard({ stocks }: { stocks: Briefing["stocks"] }) {
  return (
    <Card id="stocks" className="p-5 sm:p-7">
      <CardHeader className="mb-3"><CardTitle>관심 종목 영향</CardTitle><button aria-label="관심 종목 전체 보기" className="focus-ring rounded-lg p-2 text-[#718097] hover:bg-[#f3f6fa]"><ChevronRight size={19} /></button></CardHeader>
      <div className="divide-y divide-[#e8edf3]">
        {stocks.map((stock, index) => (
          <div key={stock.symbol} className="grid grid-cols-[1fr_auto] items-center gap-4 py-4">
            <div><p className="font-bold">{stock.name}</p><p className="mt-1 line-clamp-1 text-xs text-[#77849a]">{stock.issue}</p></div>
            <div className="flex items-center gap-3"><Sparkline index={index} positive={stock.change > 0} /><div className="min-w-[78px] text-right"><p className="text-sm font-semibold">{stock.price}</p><p className={cn("mt-1 text-xs font-bold", stock.change > 0 ? "text-[#ed585c]" : "text-[#20a265]")}>{stock.change > 0 ? "+" : ""}{stock.change}%</p></div></div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8994a5]"><Info size={13} /> 시세는 예시 데이터이며 투자 권유가 아닙니다.</p>
    </Card>
  );
}

function Sparkline({ index, positive }: { index: number; positive: boolean }) {
  return <svg viewBox="0 0 106 28" className="h-7 w-24" aria-hidden="true"><polyline points={lines[index]} fill="none" stroke={positive ? "#f05d5e" : "#21a566"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
