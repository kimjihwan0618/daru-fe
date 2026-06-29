import { BriefcaseBusiness, House } from "lucide-react";

export function RouteMap({ eta, delay }: { eta: number; delay: number }) {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-[#dfe6ef] bg-[#f6f8f6]">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(28deg, transparent 47%, #e4e8e5 48%, #e4e8e5 50%, transparent 51%), linear-gradient(95deg, transparent 47%, #e7ebe8 48%, #e7ebe8 50%, transparent 51%)", backgroundSize: "78px 56px, 92px 65px" }} />
      <div className="absolute left-5 top-5 z-10 space-y-2 rounded-xl bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur">
        <div className="flex items-center gap-2 font-semibold"><House size={15} className="text-[#20a565]" /> 집</div>
        <div className="flex items-center gap-2 text-[#64738a]"><BriefcaseBusiness size={15} className="text-[#f05d5e]" /> 회사 · 분당수서로</div>
      </div>
      <svg viewBox="0 0 500 250" className="absolute inset-0 h-full w-full" role="img" aria-label="집에서 회사까지의 출근 경로">
        <path d="M63 170 C115 132, 146 134, 192 160 S277 202, 330 151 S388 91, 446 62" fill="none" stroke="white" strokeWidth="13" strokeLinecap="round" />
        <path d="M63 170 C115 132, 146 134, 192 160 S277 202, 330 151" fill="none" stroke="#22a665" strokeWidth="7" strokeLinecap="round" />
        <path d="M330 151 C365 117, 388 91, 446 62" fill="none" stroke="#f06b4f" strokeWidth="7" strokeLinecap="round" />
        <circle cx="63" cy="170" r="12" fill="#22a665" stroke="white" strokeWidth="4" />
        <circle cx="446" cy="62" r="12" fill="#f05d5e" stroke="white" strokeWidth="4" />
      </svg>
      <div className="absolute inset-x-4 bottom-4 z-10 grid grid-cols-2 rounded-xl border border-[#e0e7ef] bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
        <Metric label="예상 소요 시간" value={eta} suffix="분" className="border-r border-[#e3e9f0] text-[#1fa261]" />
        <Metric label="평소보다 지연" value={`+${delay}`} suffix="분" className="pl-5 text-[#ee5e5f]" />
      </div>
    </div>
  );
}

function Metric({ label, value, suffix, className }: { label: string; value: string | number; suffix: string; className?: string }) {
  return <div className={className}><p className="text-xs font-semibold text-[#6e7b90]">{label}</p><p className="mt-1 text-3xl font-bold">{value}<span className="ml-1 text-base">{suffix}</span></p></div>;
}
