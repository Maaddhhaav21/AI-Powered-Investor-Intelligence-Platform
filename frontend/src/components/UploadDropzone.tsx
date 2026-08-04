import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, Loader2, UploadCloud, X } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { ProcessingStep } from "@/types/report";

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  progress: number;
  steps: ProcessingStep[];
  file: File | null;
  onReset: () => void;
  isComplete: boolean;
}

export function UploadDropzone({
  onFileSelected,
  isUploading,
  progress,
  steps,
  file,
  onReset,
  isComplete,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const selected = files[0];
      if (selected.type !== "application/pdf") return;
      onFileSelected(selected);
    },
    [onFileSelected]
  );

  if (file) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
          </div>
          {!isUploading && (
            <button
              onClick={onReset}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {isComplete ? "Processing complete" : "Uploading & processing"}
            </span>
            <span className="mono-tabular font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="mt-5 space-y-2.5">
          {steps.map((step) => (
            <ProcessingStepRow key={step.id} step={step} />
          ))}
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex items-center justify-between rounded-lg border border-success/30 bg-success/10 px-4 py-3"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-success">
              <Check className="h-4 w-4" />
              Report indexed and ready to explore
            </div>
            <Button size="sm" variant="subtle" onClick={onReset}>
              Upload another
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-20 text-center transition-colors",
        isDragging && "border-primary bg-primary/5"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <motion.div
        animate={isDragging ? { scale: 1.08 } : { scale: 1 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
      >
        <UploadCloud className="h-7 w-7" />
        {isDragging && (
          <span className="absolute inset-0 animate-pulse-ring rounded-2xl border-2 border-primary" />
        )}
      </motion.div>
      <div>
        <p className="text-sm font-semibold text-foreground">
          Drop your annual report here, or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">PDF only, up to 50MB</p>
      </div>
    </div>
  );
}

function ProcessingStepRow({ step }: { step: ProcessingStep }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          step.status === "done" && "border-success bg-success text-success-foreground",
          step.status === "active" && "border-primary text-primary",
          step.status === "pending" && "border-border text-transparent",
          step.status === "error" && "border-danger bg-danger text-danger-foreground"
        )}
      >
        <AnimatePresence mode="wait">
          {step.status === "done" && (
            <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Check className="h-3 w-3" />
            </motion.span>
          )}
          {step.status === "active" && (
            <Loader2 className="h-3 w-3 animate-spin" />
          )}
        </AnimatePresence>
      </div>
      <span
        className={cn(
          "transition-colors",
          step.status === "pending" ? "text-muted-foreground" : "text-foreground",
          step.status === "done" && "text-muted-foreground line-through decoration-success/50"
        )}
      >
        {step.label}
      </span>
    </div>
  );
}
