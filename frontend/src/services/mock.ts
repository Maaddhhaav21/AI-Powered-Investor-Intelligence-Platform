// Demo-mode mock data so the product is fully explorable without a live backend.
// Toggle off by setting VITE_USE_MOCKS=false once real endpoints are wired up.
import type { Report } from "@/types/report";
import type { ChatResponse } from "@/types/chat";
import type {
  ExecutiveSummary,
  FinancialAnalysis,
  InvestmentReport,
  MetricsResponse,
  RiskAnalysis,
} from "@/types/analysis";

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

export const MOCK_REPORT: Report = {
  id: "rep_apple_fy24",
  companyName: "Apple Inc.",
  ticker: "AAPL",
  fileName: "AAPL_10-K_FY2024.pdf",
  fileSizeBytes: 4_812_302,
  fiscalYear: "FY2024",
  uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  status: "ready",
  pageCount: 214,
};

export const MOCK_REPORTS: Report[] = [
  MOCK_REPORT,
  {
    id: "rep_msft_fy24",
    companyName: "Microsoft Corporation",
    ticker: "MSFT",
    fileName: "MSFT_10-K_FY2024.pdf",
    fileSizeBytes: 5_233_921,
    fiscalYear: "FY2024",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: "ready",
    pageCount: 198,
  },
  {
    id: "rep_nvda_fy24",
    companyName: "NVIDIA Corporation",
    ticker: "NVDA",
    fileName: "NVDA_10-K_FY2024.pdf",
    fileSizeBytes: 3_921_004,
    fiscalYear: "FY2024",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    status: "ready",
    pageCount: 156,
  },
  {
    id: "rep_tsla_fy24",
    companyName: "Tesla, Inc.",
    ticker: "TSLA",
    fileName: "TSLA_10-K_FY2024.pdf",
    fileSizeBytes: 2_710_558,
    fiscalYear: "FY2024",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    status: "processing",
    pageCount: 132,
  },
];

const quarters = ["Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24"];

export const MOCK_FINANCIALS: FinancialAnalysis = {
  reportId: MOCK_REPORT.id,
  revenue: quarters.map((period, i) => ({
    period,
    value: [90753, 81797, 85777, 94930][i],
  })),
  cashFlow: quarters.map((period, i) => ({
    period,
    value: [39895, 22690, 28858, 29943][i],
  })),
  netIncome: quarters.map((period, i) => ({
    period,
    value: [22956, 23636, 21448, 14736][i],
  })),
  grossMargin: quarters.map((period, i) => ({
    period,
    value: [45.9, 46.6, 46.3, 46.2][i],
  })),
  operatingMargin: quarters.map((period, i) => ({
    period,
    value: [31.5, 30.1, 29.6, 31.6][i],
  })),
  kpis: [
    { label: "Total Revenue", value: 391035, change: 2.0, format: "currency" },
    { label: "Gross Margin", value: 46.2, change: 0.4, format: "percent" },
    { label: "Operating Income", value: 123216, change: -1.1, format: "currency" },
    { label: "Free Cash Flow", value: 108807, change: -8.2, format: "currency" },
  ],
};

export const MOCK_RISK: RiskAnalysis = {
  reportId: MOCK_REPORT.id,
  overallScore: 38,
  scoreLabel: "Moderate",
  categories: [
    { category: "Business", score: 42 },
    { category: "Financial", score: 25 },
    { category: "Operational", score: 33 },
    { category: "Legal", score: 55 },
    { category: "Technology", score: 30 },
    { category: "Supply Chain", score: 48 },
  ],
  items: [
    {
      id: "r1",
      category: "Supply Chain",
      title: "Concentration in contract manufacturing",
      description:
        "A significant share of assembly is concentrated with a small number of partners, primarily in one region, creating exposure to disruption.",
      severity: 4,
      likelihood: 3,
    },
    {
      id: "r2",
      category: "Legal",
      title: "Ongoing antitrust proceedings",
      description:
        "Multiple regulatory bodies are pursuing antitrust actions related to platform and marketplace practices.",
      severity: 4,
      likelihood: 4,
    },
    {
      id: "r3",
      category: "Business",
      title: "Product cycle dependency",
      description:
        "A large portion of revenue is tied to a single product category's annual refresh cycle.",
      severity: 3,
      likelihood: 3,
    },
    {
      id: "r4",
      category: "Technology",
      title: "AI infrastructure investment lag",
      description:
        "Competitors have moved faster on generative AI integration, which could erode differentiation over time.",
      severity: 3,
      likelihood: 2,
    },
    {
      id: "r5",
      category: "Financial",
      title: "Foreign exchange exposure",
      description:
        "A substantial share of revenue is generated internationally, exposing results to currency fluctuation.",
      severity: 2,
      likelihood: 3,
    },
    {
      id: "r6",
      category: "Operational",
      title: "Key personnel retention",
      description:
        "Continued execution depends on retaining a small group of senior operating executives.",
      severity: 2,
      likelihood: 2,
    },
  ],
};

export const MOCK_METRICS: MetricsResponse = {
  reportId: MOCK_REPORT.id,
  metrics: [
    { key: "revenue", label: "Revenue", value: 391035, change: 2.0, format: "currency", trend: MOCK_FINANCIALS.revenue },
    { key: "net_income", label: "Net Income", value: 93736, change: -3.4, format: "currency", trend: MOCK_FINANCIALS.netIncome },
    { key: "eps", label: "EPS (Diluted)", value: 6.08, change: 9.3, format: "number", trend: [] },
    { key: "cash", label: "Cash & Equivalents", value: 29943, change: 4.1, format: "currency", trend: MOCK_FINANCIALS.cashFlow },
    { key: "debt", label: "Total Debt", value: 106629, change: -5.6, format: "currency", trend: [] },
    { key: "assets", label: "Total Assets", value: 364980, change: 3.7, format: "currency", trend: [] },
    { key: "liabilities", label: "Total Liabilities", value: 308030, change: 1.8, format: "currency", trend: [] },
    { key: "ocf", label: "Operating Cash Flow", value: 118254, change: 6.9, format: "currency", trend: MOCK_FINANCIALS.cashFlow },
  ],
};

export const MOCK_SUMMARY: ExecutiveSummary = {
  reportId: MOCK_REPORT.id,
  generatedAt: new Date().toISOString(),
  markdown: `## Overview

Apple closed fiscal 2024 with revenue of **$391.0B**, up 2.0% year over year, led by resilient Services growth and a stable iPhone installed base. Margins held near record levels even as the company increased R&D investment toward on-device AI features.

## Key Takeaways

- **Services** crossed a new high-margin milestone, now representing over a quarter of total revenue.
- **Gross margin** expanded to 46.2%, supported by mix shift and cost discipline.
- **Capital return** remained aggressive, with buybacks continuing to reduce share count meaningfully.
- **Greater China** revenue softened, partially offset by strength in India and other emerging markets.

## Outlook

Management pointed to an AI-driven upgrade cycle as the primary catalyst for the next fiscal year, alongside continued Services momentum and disciplined opex growth.`,
};

export const MOCK_INVESTMENT_REPORT: InvestmentReport = {
  reportId: MOCK_REPORT.id,
  title: "Apple Inc. (AAPL) — Investment Analysis",
  generatedAt: new Date().toISOString(),
  recommendation: "Hold",
  confidence: 72,
  tableOfContents: [
    { id: "investment-thesis", title: "Investment Thesis", level: 1 },
    { id: "financial-position", title: "Financial Position", level: 1 },
    { id: "key-risks", title: "Key Risks", level: 1 },
    { id: "valuation", title: "Valuation", level: 1 },
    { id: "recommendation", title: "Recommendation", level: 1 },
  ],
  markdown: `## Investment Thesis

Apple's durable ecosystem and expanding Services base support a premium multiple, though the next leg of growth depends on a convincing AI-hardware upgrade cycle.

## Financial Position

The balance sheet remains fortress-like: **$391.0B** in revenue against **$308.0B** in total liabilities, with operating cash flow of **$118.3B** funding continued buybacks and dividends without added leverage.

## Key Risks

Regulatory pressure across multiple jurisdictions and concentration in contract manufacturing remain the two most material overhangs on the thesis.

## Valuation

Shares trade near the upper end of their five-year forward P/E range, pricing in continued execution rather than leaving room for a re-rating.

## Recommendation

We rate AAPL a **Hold**: the franchise quality is undisputed, but the current multiple already reflects a favorable outcome for the AI-driven upgrade cycle.`,
};

export function mockChatAnswer(question: string): ChatResponse {
  const q = question.toLowerCase();
  if (q.includes("revenue")) {
    return {
      answer:
        "Apple reported total revenue of $391.0B for fiscal 2024, up 2.0% year over year. Services led growth while iPhone revenue was roughly flat against a tough prior-year comparison.",
      sources: [
        { id: "s1", label: "Consolidated Statement of Operations", page: 28, snippet: "Total net sales $391,035 million, up from $383,285 million." },
        { id: "s2", label: "Segment Reporting", page: 41, snippet: "Services net sales grew 12.9% year over year." },
      ],
    };
  }
  if (q.includes("risk")) {
    return {
      answer:
        "The filing highlights antitrust proceedings across several jurisdictions, concentration in a small number of contract manufacturers, and foreign exchange exposure as the most material risk factors.",
      sources: [
        { id: "s3", label: "Item 1A. Risk Factors", page: 8, snippet: "The Company is subject to complex and changing laws and regulations worldwide." },
      ],
    };
  }
  if (q.includes("cash flow")) {
    return {
      answer:
        "Operating cash flow was $118.3B for the year, up 6.9%, comfortably funding $94B+ in combined buybacks and dividends without new leverage.",
      sources: [
        { id: "s4", label: "Statement of Cash Flows", page: 31, snippet: "Cash generated by operating activities of $118,254 million." },
      ],
    };
  }
  return {
    answer:
      "Here's a summary: Apple grew revenue 2.0% to $391.0B in FY2024, held gross margin near 46%, and continued returning capital aggressively while investing in on-device AI for the next product cycle.",
    sources: [
      { id: "s5", label: "Management Discussion & Analysis", page: 24, snippet: "Fiscal 2024 was a year of continued investment in innovation." },
    ],
  };
}
