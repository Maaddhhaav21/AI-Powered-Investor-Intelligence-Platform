import { api } from "./api";
import type { Report, UploadResponse } from "@/types/report";

export async function uploadReport(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<UploadResponse>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      onProgress?.(percent);
    },
  });

  return data;
}

export async function getReports(): Promise<Report[]> {
  const { data } = await api.get<Report[]>("/reports");
  return data;
}

export async function getReport(reportId: string): Promise<Report> {
  const { data } = await api.get<Report>(`/reports/${reportId}`);
  return data;
}
