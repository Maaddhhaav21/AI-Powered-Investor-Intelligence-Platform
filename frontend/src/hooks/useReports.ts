import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getReport, getReports, uploadReport } from "@/services/upload";
import { MOCK_REPORT, MOCK_REPORTS, USE_MOCKS } from "@/services/mock";
import { useState } from "react";

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      if (USE_MOCKS) {
        await new Promise((r) => setTimeout(r, 500));
        return MOCK_REPORTS;
      }
      return getReports();
    },
  });
}

export function useReport(reportId: string | undefined) {
  return useQuery({
    queryKey: ["report", reportId],
    queryFn: async () => {
      if (USE_MOCKS) {
        await new Promise((r) => setTimeout(r, 300));
        return MOCK_REPORT;
      }
      return getReport(reportId!);
    },
    enabled: !!reportId,
  });
}

export function useUploadReport() {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      setProgress(0);
      if (USE_MOCKS) {
        for (let p = 10; p <= 100; p += 10) {
          await new Promise((r) => setTimeout(r, 140));
          setProgress(p);
        }
        return { report: { ...MOCK_REPORT, fileName: file.name, fileSizeBytes: file.size } };
      }
      return uploadReport(file, setProgress);
    },
    onSuccess: () => {
      toast.success("Report processed and indexed successfully.");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  return { ...mutation, progress };
}
