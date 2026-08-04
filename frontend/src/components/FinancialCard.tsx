import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

interface FinancialCardProps {
  label: string;
  value: number;
  change: number;
  format: "currency" | "percent" | "number";
  delay?: number;
}

export function FinancialCard({ label, value, change, format, delay = 0 }: FinancialCardProps) {
  const isPositive = change >= 0;
  const display =
    format === "currency"
      ? formatCurrency(value * 1_000_000)
      : format === "percent"
      ? `${value.toFixed(1)}%`
      : value.toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="mono-tabular text-xl font-bold text-foreground">{display}</span>
            <span className={cn("text-xs font-semibold", isPositive ? "text-success" : "text-danger")}>
              {formatPercent(change)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
