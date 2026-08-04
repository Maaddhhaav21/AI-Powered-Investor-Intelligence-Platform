import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DocumentSkeleton } from "@/components/LoadingSkeleton";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ReportViewerProps {
  title?: string;
  markdown?: string;
  isLoading?: boolean;
  toc?: TocItem[];
  onRegenerate?: () => void;
  showPrint?: boolean;
  badge?: { label: string; variant?: "default" | "success" | "warning" | "danger" };
}

export function ReportViewer({
  title,
  markdown,
  isLoading,
  toc,
  onRegenerate,
  showPrint,
  badge,
}: ReportViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(title ?? "report").toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_240px]">
      <Card className="order-2 lg:order-1">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
              {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!markdown}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!markdown}>
                <Download className="h-3.5 w-3.5" />
                Markdown
              </Button>
              {showPrint && (
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </Button>
              )}
              {onRegenerate && (
                <Button variant="subtle" size="sm" onClick={onRegenerate}>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Regenerate
                </Button>
              )}
            </div>
          </div>

          {isLoading || !markdown ? (
            <DocumentSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MarkdownViewer content={markdown} />
            </motion.div>
          )}
        </CardContent>
      </Card>

      {toc && toc.length > 0 && (
        <div className="order-1 lg:order-2">
          <div className="sticky top-20 rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "block truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
                    item.level > 1 && "pl-4"
                  )}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
