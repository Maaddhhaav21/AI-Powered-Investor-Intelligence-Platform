import { api } from "./api";
import type {
  ExecutiveSummary,
  FinancialAnalysis,
  InvestmentReport,
  MetricsResponse,
  RiskAnalysis,
} from "@/types/analysis";

export async function getExecutiveSummary(): Promise<ExecutiveSummary> {
  const { data } = await api.get<ExecutiveSummary>("/analysis/summary");
  return data;
}

export async function getFinancialAnalysis(): Promise<FinancialAnalysis> {
  const { data } = await api.get<FinancialAnalysis>(
    "/analysis/financial-analysis",
  );
  return data;
}

export async function getRiskAnalysis(): Promise<RiskAnalysis> {
  const { data } = await api.get<RiskAnalysis>("/analysis/risk-analysis");
  return data;
}

export async function getMetrics(): Promise<MetricsResponse> {
  const { data } = await api.get<MetricsResponse>("/analysis/metrics");
  return data;
}

export async function getInvestmentReport(): Promise<InvestmentReport> {
  const { data } = await api.get<InvestmentReport>(
    "/analysis/investment-report",
  );
  return data;
}
