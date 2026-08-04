export interface Report {
  id: string;
  companyName: string;
  ticker?: string;
  fileName: string;
  fileSizeBytes: number;
  fiscalYear: string;
  uploadedAt: string;
  status: "processing" | "ready" | "failed";
  pageCount?: number;
}

export type ProcessingStepId =
  | "uploaded"
  | "markdown"
  | "chunking"
  | "embeddings"
  | "vectorstore";

export interface ProcessingStep {
  id: ProcessingStepId;
  label: string;
  status: "pending" | "active" | "done" | "error";
}

export interface UploadResponse {
  report: Report;
}
