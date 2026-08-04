import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RiskItem } from "@/types/analysis";

const CATEGORY_COLORS: Record<string, string> = {
  Business: "accent",
  Financial: "success",
  Operational: "warning",
  Legal: "danger",
  Technology: "default",
  "Supply Chain": "outline",
};

function severityLabel(score: number) {
  if (score >= 4) return { label: "High", cls: "text-danger" };
  if (score >= 3) return { label: "Elevated", cls: "text-warning" };
  return { label: "Low", cls: "text-success" };
}

export function RiskCard({ risk, delay = 0 }: { risk: RiskItem; delay?: number }) {
  const sev = severityLabel(risk.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="h-full transition-shadow hover:shadow-elevated">
        <CardContent className="flex h-full flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <Badge variant={(CATEGORY_COLORS[risk.category] as any) ?? "outline"}>
              {risk.category}
            </Badge>
            <span className={cn("text-xs font-semibold", sev.cls)}>{sev.label} severity</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">{risk.title}</h3>
          <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
            {risk.description}
          </p>
          <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span>Severity</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-3 rounded-full",
                      i < risk.severity ? "bg-danger" : "bg-surface-2"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Likelihood</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-3 rounded-full",
                      i < risk.likelihood ? "bg-warning" : "bg-surface-2"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
