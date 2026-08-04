import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { RiskCard } from "@/components/RiskCard";
import { ErrorState } from "@/components/ErrorState";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRiskAnalysis } from "@/hooks/useAnalysis";
import { MOCK_REPORT } from "@/services/mock";
import { cn } from "@/lib/utils";

function scoreColor(score: number) {
  if (score >= 60) return "hsl(var(--danger))";
  if (score >= 40) return "hsl(var(--warning))";
  return "hsl(var(--success))";
}

function RiskGauge({ score, label }: { score: number; label: string }) {
  const radius = 70;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="100" viewBox="0 0 180 100">
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="hsl(var(--surface-2))"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <motion.path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke={scoreColor(score)}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="-mt-8 flex flex-col items-center">
        <span className="mono-tabular text-3xl font-bold text-foreground">{score}</span>
        <span className="text-xs font-medium text-muted-foreground">{label} Risk</span>
      </div>
    </div>
  );
}

export function RiskAnalysis() {
  const { data, isLoading, isError, refetch } = useRiskAnalysis(MOCK_REPORT.id);

  return (
    <div>
      <PageHeader
        eyebrow="Risk Intelligence"
        title="Risk Analysis"
        description={`${MOCK_REPORT.companyName} · ${MOCK_REPORT.fiscalYear}`}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardContent className="flex flex-col items-center justify-center p-6">
                {isLoading ? (
                  <Skeleton className="h-28 w-44" />
                ) : (
                  <RiskGauge score={data?.overallScore ?? 0} label={data?.scoreLabel ?? ""} />
                )}
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Composite score across all risk categories, weighted by severity and likelihood.
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-semibold text-foreground">Risk Heatmap</p>
                {isLoading ? (
                  <Skeleton className="h-40 w-full" />
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {data?.categories.map((cat, i) => (
                      <motion.div
                        key={cat.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-lg border border-border p-3"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${scoreColor(cat.score)} ${Math.min(
                            cat.score,
                            60
                          )}%, transparent)`,
                        }}
                      >
                        <p className="text-xs font-medium text-foreground">{cat.category}</p>
                        <p className="mono-tabular mt-1 text-lg font-bold text-foreground">
                          {cat.score}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <p className="mb-4 text-sm font-semibold text-foreground">Risk Categories</p>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-44 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data?.items.map((risk, i) => (
                  <RiskCard key={risk.id} risk={risk} delay={i * 0.04} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
