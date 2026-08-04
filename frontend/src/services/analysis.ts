import { api } from "./api";

export interface MarkdownResponse {
  markdown: string;
}

export async function getExecutiveSummary(): Promise<MarkdownResponse> {
  const { data } = await api.get("/analysis/summary");
  return data;
}

export async function getFinancialAnalysis(): Promise<MarkdownResponse> {
  const { data } = await api.get("/analysis/financial-analysis");
  return data;
}

export async function getRiskAnalysis(): Promise<MarkdownResponse> {
  const { data } = await api.get("/analysis/risk-analysis");
  return data;
}

export async function getMetrics(): Promise<MarkdownResponse> {
  const { data } = await api.get("/analysis/metrics");
  return data;
}

export async function getInvestmentReport(): Promise<MarkdownResponse> {
  const { data } = await api.get("/analysis/investment-report");
  return data;
}
