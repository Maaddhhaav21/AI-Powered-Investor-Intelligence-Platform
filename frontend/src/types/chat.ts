export type ChatRole = "user" | "assistant";

export interface SourceCitation {
  id: string;
  label: string;
  page?: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  sources?: SourceCitation[];
  isStreaming?: boolean;
}

export interface ChatRequest {
  reportId: string;
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: SourceCitation[];
}
