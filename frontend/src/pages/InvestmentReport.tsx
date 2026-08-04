import { PageHeader } from "@/components/PageHeader";
import { ReportViewer } from "@/components/ReportViewer";
import { ErrorState } from "@/components/ErrorState";
import { useInvestmentReport } from "@/hooks/useAnalysis";
import { MOCK_REPORT } from "@/services/mock";

const RECOMMENDATION_VARIANT: Record<string, "success" | "warning" | "danger"> = {
  Buy: "success",
  Hold: "warning",
  Sell: "danger",
};

export function InvestmentReport() {
  const { data, isLoading, isError, refetch } = useInvestmentReport(MOCK_REPORT.id);

  return (
    <div>
      <PageHeader
        eyebrow="Investment Committee"
        title="Investment Report"
        description={`${MOCK_REPORT.companyName} · ${MOCK_REPORT.fiscalYear} · Confidence ${
          data?.confidence ?? "—"
        }%`}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <ReportViewer
          title={data?.title}
          markdown={data?.markdown}
          isLoading={isLoading}
          toc={data?.tableOfContents}
          showPrint
          onRegenerate={() => refetch()}
          badge={
            data
              ? { label: data.recommendation, variant: RECOMMENDATION_VARIANT[data.recommendation] }
              : undefined
          }
        />
      )}
    </div>
  );
}
