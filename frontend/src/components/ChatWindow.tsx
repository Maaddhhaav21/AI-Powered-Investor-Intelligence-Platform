import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";

export function ChatWindow({ reportId, reportLabel }: { reportId: string; reportLabel: string }) {
  const { messages, ask, isThinking, suggestedQuestions } = useChat(reportId);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = () => {
    ask(input);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col rounded-xl border border-border bg-surface">
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Ask anything about {reportLabel}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Answers are grounded in the filing, with cited sources.
              </p>
            </div>
            <div className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
              {suggestedQuestions.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ y: -2 }}
                  onClick={() => ask(q)}
                  className="rounded-lg border border-border bg-card px-3 py-2.5 text-left text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-surface-2"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {isThinking && <TypingIndicator />}
          </>
        )}
      </div>

      <div className="border-t border-border p-3 md:p-4">
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 focus-within:ring-2 focus-within:ring-ring">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about revenue, risks, cash flow…"
            className="min-h-[36px] border-none bg-transparent shadow-none focus-visible:ring-0"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isThinking}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
