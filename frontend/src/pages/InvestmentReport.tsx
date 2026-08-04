import { PageHeader } from "@/components/PageHeader";
import { ReportViewer } from "@/components/ReportViewer";
import { ErrorState } from "@/components/ErrorState";
import { useInvestmentReport } from "@/hooks/useAnalysis";

export function InvestmentReport() {
  const { data, isLoading, isError, refetch } = useInvestmentReport();

  console.log("Investment Report Response:", data);

  return (
    <div>
      <PageHeader
        eyebrow="Investment Committee"
        title="Investment Report"
        description="AI Generated Investment Report"
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <ReportViewer
          title="Investment Report"
          markdown={data?.markdown ?? ""}
          isLoading={isLoading}
          showPrint={true}
          onRegenerate={() => refetch()}
          badge={{
            label: "AI Generated",
            variant: "success",
          }}
        />
      )}
    </div>
  );
}
