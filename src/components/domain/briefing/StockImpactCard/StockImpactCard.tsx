import { ChevronRight, Info } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Briefing } from "@/app/(page)/(home)/type/briefing";
import {
  stockChangeVariants,
  stockImpactCardStyles,
} from "./styles";

const lines = [
  "3,14 12,11 20,18 28,7 36,14 45,9 54,19 62,12 72,17 82,7 92,13 103,10",
  "3,10 12,15 20,9 28,20 36,17 45,22 54,14 62,19 72,12 82,18 92,15 103,20",
  "3,18 12,8 20,13 28,6 36,15 45,11 54,18 62,10 72,16 82,7 92,12 103,9",
];

export function StockImpactCard({ stocks }: { stocks: Briefing["stocks"] }) {
  return (
    <Card id="stocks" className={stockImpactCardStyles.root}>
      <CardHeader className={stockImpactCardStyles.header}>
        <CardTitle>관심 종목 영향</CardTitle>
        <button
          aria-label="관심 종목 전체 보기"
          className={stockImpactCardStyles.moreButton}
        >
          <ChevronRight size={19} />
        </button>
      </CardHeader>
      <div className={stockImpactCardStyles.list}>
        {stocks.map((stock, index) => (
          <div key={stock.symbol} className={stockImpactCardStyles.item}>
            <div>
              <p className={stockImpactCardStyles.name}>{stock.name}</p>
              <p className={stockImpactCardStyles.issue}>{stock.issue}</p>
            </div>
            <div className={stockImpactCardStyles.metrics}>
              <Sparkline index={index} positive={stock.change > 0} />
              <div className={stockImpactCardStyles.priceGroup}>
                <p className={stockImpactCardStyles.price}>{stock.price}</p>
                <p
                  className={stockChangeVariants({
                    positive: stock.change > 0,
                  })}
                >
                  {stock.change > 0 ? "+" : ""}
                  {stock.change}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className={stockImpactCardStyles.disclaimer}>
        <Info size={13} /> 시세는 예시 데이터이며 투자 권유가 아닙니다.
      </p>
    </Card>
  );
}

function Sparkline({ index, positive }: { index: number; positive: boolean }) {
  return (
    <svg
      viewBox="0 0 106 28"
      className={stockImpactCardStyles.sparkline}
      aria-hidden="true"
    >
      <polyline
        points={lines[index]}
        fill="none"
        stroke={positive ? "#f05d5e" : "#21a566"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
