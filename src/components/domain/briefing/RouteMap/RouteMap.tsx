import { BriefcaseBusiness, House } from "lucide-react";
import { routeMapStyles } from "./styles";

export function RouteMap({ eta, delay }: { eta: number; delay: number }) {
  return (
    <div className={routeMapStyles.root}>
      <div
        className={routeMapStyles.grid}
        style={{
          backgroundImage:
            "linear-gradient(28deg, transparent 47%, #e4e8e5 48%, #e4e8e5 50%, transparent 51%), linear-gradient(95deg, transparent 47%, #e7ebe8 48%, #e7ebe8 50%, transparent 51%)",
          backgroundSize: "78px 56px, 92px 65px",
        }}
      />
      <div className={routeMapStyles.legend}>
        <div className={routeMapStyles.origin}>
          <House size={15} className={routeMapStyles.originIcon} /> 집
        </div>
        <div className={routeMapStyles.destination}>
          <BriefcaseBusiness
            size={15}
            className={routeMapStyles.destinationIcon}
          />{" "}
          회사 · 분당수서로
        </div>
      </div>
      <svg
        viewBox="0 0 500 250"
        className={routeMapStyles.map}
        role="img"
        aria-label="집에서 회사까지의 출근 경로"
      >
        <path
          d="M63 170 C115 132, 146 134, 192 160 S277 202, 330 151 S388 91, 446 62"
          fill="none"
          stroke="white"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M63 170 C115 132, 146 134, 192 160 S277 202, 330 151"
          fill="none"
          stroke="#22a665"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M330 151 C365 117, 388 91, 446 62"
          fill="none"
          stroke="#f06b4f"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle
          cx="63"
          cy="170"
          r="12"
          fill="#22a665"
          stroke="white"
          strokeWidth="4"
        />
        <circle
          cx="446"
          cy="62"
          r="12"
          fill="#f05d5e"
          stroke="white"
          strokeWidth="4"
        />
      </svg>
      <div className={routeMapStyles.metrics}>
        <Metric
          label="예상 소요 시간"
          value={eta}
          surrix="분"
          className={routeMapStyles.eta}
        />
        <Metric
          label="평소보다 지연"
          value={`+${delay}`}
          surrix="분"
          className={routeMapStyles.delay}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  surrix,
  className,
}: {
  label: string;
  value: string | number;
  surrix: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={routeMapStyles.metricLabel}>{label}</p>
      <p className={routeMapStyles.metricValue}>
        {value}
        <span className={routeMapStyles.metricSurrix}>{surrix}</span>
      </p>
    </div>
  );
}
