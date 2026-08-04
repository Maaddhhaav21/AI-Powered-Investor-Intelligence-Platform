import { api } from "./api";

export interface AIResponse {
  answer: string;
  sources: any[];
}

export async function getExecutiveSummary(): Promise<AIResponse> {
  const { data } = await api.get<AIResponse>("/analysis/summary");
  return data;
}

export async function getFinancialAnalysis(): Promise<AIResponse> {
  const { data } = await api.get<AIResponse>("/analysis/financial-analysis");
  return data;
}

export async function getRiskAnalysis(): Promise<AIResponse> {
  const { data } = await api.get<AIResponse>("/analysis/risk-analysis");
  return data;
}

export async function getMetrics(): Promise<AIResponse> {
  const { data } = await api.get<AIResponse>("/analysis/metrics");
  return data;
}

export async function getInvestmentReport(): Promise<AIResponse> {
  const { data } = await api.get<AIResponse>("/analysis/investment-report");
  return data;
}
