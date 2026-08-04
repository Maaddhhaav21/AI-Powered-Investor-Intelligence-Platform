import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileStack,
  MessagesSquare,
  Building2,
  BookOpenText,
  UploadCloud,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GridSkeleton, TableRowSkeleton } from "@/components/LoadingSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { useReports } from "@/hooks/useReports";
import { formatBytes, relativeTime } from "@/lib/utils";

const QUICK_ACTIONS = [
  { to: "/upload", label: "Upload Report", description: "Index a new annual report", icon: UploadCloud },
  { to: "/chat", label: "Chat with Report", description: "Ask questions, get cited answers", icon: MessagesSquare },
  { to: "/investment-report", label: "Generate Report", description: "Draft an investment memo", icon: Sparkles },
];

const ACTIVITY = [
  { id: 1, label: "Executive summary generated for Apple Inc.", time: "2h ago" },
  { id: 2, label: "Risk analysis completed for Microsoft Corporation", time: "5h ago" },
  { id: 3, label: "New report uploaded — NVIDIA Corporation", time: "1d ago" },
  { id: 4, label: "Investment report exported for Apple Inc.", time: "2d ago" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { data: reports, isLoading, isError, refetch } = useReports();

  const stats = [
    { label: "Total Reports", value: reports?.length ?? 0, icon: FileStack, change: 12.5 },
    { label: "Total Queries", value: 1284, icon: MessagesSquare, change: 8.1 },
    { label: "Companies Analyzed", value: 37, icon: Building2, change: 4.2 },
    { label: "Investment Reports", value: 152, icon: BookOpenText, change: -2.3 },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-surface to-surface p-8"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          <Badge variant="accent" className="mb-3">
            <Sparkles className="h-3 w-3" />
            Retrieval-Augmented Intelligence
          </Badge>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            AI Powered Investor Intelligence Platform
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
            Analyze annual reports using Retrieval-Augmented Generation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => navigate("/upload")}>
              <UploadCloud className="h-4 w-4" />
              Upload Report
            </Button>
            <Button variant="outline" onClick={() => navigate("/chat")}>
              <MessagesSquare className="h-4 w-4" />
              Chat with Report
            </Button>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <GridSkeleton count={4} />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <MetricCard key={s.label} {...s} format="number" delay={i * 0.05} />
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="text-sm font-semibold text-foreground">Recent Reports</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/upload")}>
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          {isLoading ? (
            <div>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="p-5">
              <ErrorState onRetry={() => refetch()} />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {reports?.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {report.ticker ?? report.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.companyName}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.fiscalYear} · {formatBytes(report.fileSizeBytes)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === "ready" ? "success" : "warning"}>
                      {report.status}
                    </Badge>
                    <span className="hidden text-xs text-muted-foreground sm:block">
                      {relativeTime(report.uploadedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="border-b border-border p-5">
            <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="space-y-2 p-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.to}
                onClick={() => navigate(action.to)}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-surface-2"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="border-b border-border p-5">
          <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        </div>
        <CardContent className="p-5">
          <div className="space-y-5">
            {ACTIVITY.map((item, i) => (
              <div key={item.id} className="relative flex gap-3 pl-1">
                {i !== ACTIVITY.length - 1 && (
                  <span className="absolute left-[7px] top-5 h-full w-px bg-border" />
                )}
                <span className="relative mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background" />
                <div>
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
