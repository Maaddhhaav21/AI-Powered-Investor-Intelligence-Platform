import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { UploadReport } from "@/pages/UploadReport";
import { Chat } from "@/pages/Chat";
import { ExecutiveSummary } from "@/pages/ExecutiveSummary";
import { FinancialAnalysis } from "@/pages/FinancialAnalysis";
import { RiskAnalysis } from "@/pages/RiskAnalysis";
import { Metrics } from "@/pages/Metrics";
import { InvestmentReport } from "@/pages/InvestmentReport";
import { Settings } from "@/pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadReport />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/executive-summary" element={<ExecutiveSummary />} />
        <Route path="/financial-analysis" element={<FinancialAnalysis />} />
        <Route path="/risk-analysis" element={<RiskAnalysis />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/investment-report" element={<InvestmentReport />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
