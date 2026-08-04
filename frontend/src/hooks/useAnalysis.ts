import { useQuery } from "@tanstack/react-query";

import {
  getExecutiveSummary,
  getFinancialAnalysis,
  getInvestmentReport,
  getMetrics,
  getRiskAnalysis,
} from "@/services/analysis";

export function useExecutiveSummary() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getExecutiveSummary,
  });
}

export function useFinancialAnalysis() {
  return useQuery({
    queryKey: ["financial-analysis"],
    queryFn: getFinancialAnalysis,
  });
}

export function useRiskAnalysis() {
  return useQuery({
    queryKey: ["risk-analysis"],
    queryFn: getRiskAnalysis,
  });
}

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: getMetrics,
  });
}

export function useInvestmentReport() {
  return useQuery({
    queryKey: ["investment-report"],
    queryFn: getInvestmentReport,
  });
}
