import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendChatMessage } from "@/services/chat";
import { mockChatAnswer, USE_MOCKS } from "@/services/mock";
import type { ChatMessage } from "@/types/chat";

const SUGGESTED_QUESTIONS = [
  "What was Apple's revenue?",
  "What are the major risks?",
  "Summarize the annual report.",
  "What is the cash flow?",
];

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat(reportId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      if (USE_MOCKS) {
        await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
        return mockChatAnswer(question);
      }
      return sendChatMessage({ reportId, question });
    },
    onMutate: (question: string) => {
      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: question,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: data.answer,
        createdAt: new Date().toISOString(),
        sources: data.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: "I wasn't able to reach the analysis service. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const ask = (question: string) => {
    if (!question.trim() || mutation.isPending) return;
    mutation.mutate(question.trim());
  };

  return {
    messages,
    ask,
    isThinking: mutation.isPending,
    suggestedQuestions: SUGGESTED_QUESTIONS,
  };
}
