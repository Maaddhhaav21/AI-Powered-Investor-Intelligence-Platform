export interface ExecutiveSummary {
  reportId: string;
  markdown: string;
  generatedAt: string;
}

export interface FinancialSeriesPoint {
  period: string;
  value: number;
}

export interface FinancialAnalysis {
  reportId: string;
  revenue: FinancialSeriesPoint[];
  cashFlow: FinancialSeriesPoint[];
  netIncome: FinancialSeriesPoint[];
  grossMargin: FinancialSeriesPoint[];
  operatingMargin: FinancialSeriesPoint[];
  kpis: {
    label: string;
    value: number;
    change: number;
    format: "currency" | "percent" | "number";
  }[];
}

export type RiskCategory =
  | "Business"
  | "Financial"
  | "Operational"
  | "Legal"
  | "Technology"
  | "Supply Chain";

export interface RiskItem {
  id: string;
  category: RiskCategory;
  title: string;
  description: string;
  severity: number; // 1-5
  likelihood: number; // 1-5
}

export interface RiskAnalysis {
  reportId: string;
  overallScore: number; // 0-100
  scoreLabel: "Low" | "Moderate" | "Elevated" | "High" | "Critical";
  categories: { category: RiskCategory; score: number }[];
  items: RiskItem[];
}

export interface MetricDefinition {
  key: string;
  label: string;
  value: number;
  change: number;
  format: "currency" | "percent" | "number";
  trend: FinancialSeriesPoint[];
}

export interface MetricsResponse {
  reportId: string;
  metrics: MetricDefinition[];
}

export interface InvestmentReport {
  reportId: string;
  title: string;
  markdown: string;
  tableOfContents: { id: string; title: string; level: number }[];
  generatedAt: string;
  recommendation: "Buy" | "Hold" | "Sell";
  confidence: number;
}
