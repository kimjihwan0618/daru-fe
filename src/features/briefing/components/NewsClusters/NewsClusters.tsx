import {
  ChevronRight,
  CircleDollarSign,
  Landmark,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Briefing } from "../../model";
import { clusterVisualVariants, newsClustersStyles } from "./styles";

const tones = ["brand", "success", "violet"] as const;
const icons = [CircleDollarSign, Landmark, Sparkles];

export function NewsClusters({ clusters }: { clusters: Briefing["clusters"] }) {
  return (
    <Card id="issues" className={newsClustersStyles.root}>
      <CardHeader className={newsClustersStyles.header}>
        <div>
          <p className={newsClustersStyles.eyebrow}>AI 이슈 클러스터링</p>
          <CardTitle>중복 뉴스 24건을 3개 이슈로 정리했어요</CardTitle>
        </div>
        <Button variant="ghost" size="sm">
          전체 이슈 보기 <ChevronRight size={17} />
        </Button>
      </CardHeader>
      <div className={newsClustersStyles.grid}>
        {clusters.map((cluster, index) => {
          const Icon = icons[index];
          return (
            <article key={cluster.topic} className={newsClustersStyles.article}>
              <div className={clusterVisualVariants({ tone: tones[index] })}>
                <div className={newsClustersStyles.decoration} />
                <Icon
                  className={newsClustersStyles.visualIcon}
                  size={36}
                  strokeWidth={1.5}
                />
              </div>
              <div className={newsClustersStyles.body}>
                <div className={newsClustersStyles.meta}>
                  <span className={newsClustersStyles.topic}>
                    {cluster.topic} · {cluster.count}건
                  </span>
                  <span className={newsClustersStyles.source}>
                    <Newspaper size={13} /> 출처 {cluster.count}
                  </span>
                </div>
                <h3 className={newsClustersStyles.title}>{cluster.title}</h3>
                <p className={newsClustersStyles.summary}>{cluster.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
