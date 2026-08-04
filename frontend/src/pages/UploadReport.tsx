import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { UploadDropzone } from "@/components/UploadDropzone";
import { useUploadReport } from "@/hooks/useReports";
import type { ProcessingStep } from "@/types/report";

const STEP_DEFS: { id: ProcessingStep["id"]; label: string }[] = [
  { id: "uploaded", label: "PDF Uploaded" },
  { id: "markdown", label: "Markdown Generated" },
  { id: "chunking", label: "Chunking Complete" },
  { id: "embeddings", label: "Embeddings Created" },
  { id: "vectorstore", label: "Stored in Vector DB" },
];

export function UploadReport() {
  const { mutate, isPending, isSuccess, progress, reset } = useUploadReport();
  const [file, setFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>(
    STEP_DEFS.map((s) => ({ ...s, status: "pending" }))
  );

  useEffect(() => {
    if (!isPending && !isSuccess) return;
    const activeIndex = Math.min(
      STEP_DEFS.length - 1,
      Math.floor((progress / 100) * STEP_DEFS.length)
    );
    setSteps(
      STEP_DEFS.map((s, i) => ({
        ...s,
        status: isSuccess || i < activeIndex ? "done" : i === activeIndex ? "active" : "pending",
      }))
    );
  }, [progress, isPending, isSuccess]);

  const handleFileSelected = (selected: File) => {
    setFile(selected);
    setSteps(STEP_DEFS.map((s) => ({ ...s, status: "pending" })));
    mutate(selected);
  };

  const handleReset = () => {
    setFile(null);
    setSteps(STEP_DEFS.map((s) => ({ ...s, status: "pending" })));
    reset();
  };

  return (
    <div>
      <PageHeader
        eyebrow="Ingestion Pipeline"
        title="Upload Report"
        description="Drop a 10-K, annual report, or investor filing to index it for chat, summaries, and analysis."
      />
      <div className="mx-auto max-w-2xl">
        <UploadDropzone
          file={file}
          isUploading={isPending}
          progress={isSuccess ? 100 : progress}
          steps={steps}
          onFileSelected={handleFileSelected}
          onReset={handleReset}
          isComplete={isSuccess}
        />
      </div>
    </div>
  );
}
