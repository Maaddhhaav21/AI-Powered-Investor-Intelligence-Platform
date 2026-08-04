import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { ErrorState } from "@/components/ErrorState";
import { GridSkeleton } from "@/components/LoadingSkeleton";
import { useMetrics } from "@/hooks/useAnalysis";
import { MOCK_REPORT } from "@/services/mock";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  CreditCard,
  Landmark,
  Scale,
  PiggyBank,
  Activity,
} from "lucide-react";

const ICONS: Record<string, typeof DollarSign> = {
  revenue: DollarSign,
  net_income: TrendingUp,
  eps: Activity,
  cash: Wallet,
  debt: CreditCard,
  assets: Landmark,
  liabilities: Scale,
  ocf: PiggyBank,
};

export function Metrics() {
  const { data, isLoading, isError, refetch } = useMetrics(MOCK_REPORT.id);

  return (
    <div>
      <PageHeader
        eyebrow="Fundamentals"
        title="Metrics"
        description={`${MOCK_REPORT.companyName} · ${MOCK_REPORT.fiscalYear}`}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <GridSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data?.metrics.map((m, i) => (
            <MetricCard
              key={m.key}
              label={m.label}
              value={m.value}
              change={m.change}
              format={m.format}
              icon={ICONS[m.key]}
              trend={m.trend}
              delay={i * 0.04}
            />
          ))}
        </div>
      )}
    </div>
  );
}
