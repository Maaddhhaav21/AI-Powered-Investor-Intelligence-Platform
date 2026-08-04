import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendChatMessage } from "@/services/chat";
import { USE_MOCKS } from "@/services/mock";
import type { ChatMessage } from "@/types/chat";

const SUGGESTED_QUESTIONS = [
  "Summarize the annual report.",
  "What are the major risks?",
  "What is the company's revenue?",
  "What are the key financial metrics?",
];

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useChat(reportId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      return sendChatMessage({
        reportId,
        question,
      });
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
      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: "Unable to generate a response. Please try again.",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
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
