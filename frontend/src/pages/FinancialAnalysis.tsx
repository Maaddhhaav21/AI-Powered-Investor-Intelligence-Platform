import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { ChartCard } from "@/components/ChartCard";
import { FinancialCard } from "@/components/FinancialCard";
import { ErrorState } from "@/components/ErrorState";
import { GridSkeleton } from "@/components/LoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialAnalysis } from "@/hooks/useAnalysis";
import { MOCK_REPORT } from "@/services/mock";
import { formatCurrency } from "@/lib/utils";

const chartTooltipStyle = {
  background: "hsl(var(--surface-2))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 10,
  fontSize: 12,
};

export function FinancialAnalysis() {
  const { data, isLoading, isError, refetch } = useFinancialAnalysis(MOCK_REPORT.id);

  return (
    <div>
      <PageHeader
        eyebrow="Deep Dive"
        title="Financial Analysis"
        description={`${MOCK_REPORT.companyName} · ${MOCK_REPORT.fiscalYear}`}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <>
          {isLoading ? (
            <GridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data?.kpis.map((kpi, i) => (
                <FinancialCard key={kpi.label} {...kpi} delay={i * 0.05} />
              ))}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartCard title="Revenue" description="Quarterly, in millions USD" delay={0.05}>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={data?.revenue}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}B`} />
                    <RTooltip contentStyle={chartTooltipStyle} formatter={(v: number) => formatCurrency(v * 1_000_000)} />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revenueFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Cash Flow" description="Operating cash flow, quarterly" delay={0.1}>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data?.cashFlow}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}B`} />
                    <RTooltip contentStyle={chartTooltipStyle} formatter={(v: number) => formatCurrency(v * 1_000_000)} />
                    <Bar dataKey="value" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Net Income" description="Quarterly, in millions USD" delay={0.15}>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={data?.netIncome}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}B`} />
                    <RTooltip contentStyle={chartTooltipStyle} formatter={(v: number) => formatCurrency(v * 1_000_000)} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Margins" description="Gross vs operating margin (%)" delay={0.2}>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={data?.grossMargin.map((g, i) => ({
                    period: g.period,
                    gross: g.value,
                    operating: data?.operatingMargin[i]?.value ?? 0,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                    <RTooltip contentStyle={chartTooltipStyle} />
                    <Line type="monotone" dataKey="gross" name="Gross Margin" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="operating" name="Operating Margin" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>
        </>
      )}
    </div>
  );
}
