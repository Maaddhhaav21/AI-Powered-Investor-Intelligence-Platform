import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { ResponsiveContainer, Area, AreaChart } from "recharts";
import type { FinancialSeriesPoint } from "@/types/analysis";

interface MetricCardProps {
  label: string;
  value: number;
  change?: number;
  format?: "currency" | "percent" | "number";
  icon?: LucideIcon;
  trend?: FinancialSeriesPoint[];
  delay?: number;
}

export function MetricCard({
  label,
  value,
  change,
  format = "number",
  icon: Icon,
  trend,
  delay = 0,
}: MetricCardProps) {
  const isPositive = (change ?? 0) >= 0;
  const formattedValue =
    format === "currency"
      ? formatCurrency(value * 1_000_000)
      : format === "percent"
      ? `${value.toFixed(1)}%`
      : formatNumber(value, false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden transition-shadow hover:shadow-elevated">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="mono-tabular mt-1.5 text-2xl font-bold text-foreground">
                {formattedValue}
              </p>
            </div>
            {Icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            {typeof change === "number" && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  isPositive ? "text-success" : "text-danger"
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {formatPercent(change)}
              </div>
            )}
            {trend && trend.length > 1 && (
              <div className="h-8 w-20 opacity-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1.5}
                      fill={`url(#spark-${label})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
