import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <Avatar className="mt-0.5 shrink-0">
        {isUser ? (
          <AvatarFallback className="from-muted to-muted bg-surface-2 text-foreground">
            MM
          </AvatarFallback>
        ) : (
          <AvatarFallback>
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className={cn("flex max-w-[78%] flex-col gap-2", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm border border-border bg-surface text-foreground"
          )}
        >
          {isUser ? message.content : <MarkdownViewer content={message.content} className="prose-p:my-0" />}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.sources.map((source) => (
              <div
                key={source.id}
                className="group flex max-w-[220px] items-start gap-2 rounded-lg border border-border bg-surface px-2.5 py-2 text-left transition-colors hover:border-primary/40"
              >
                <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-foreground">
                    {source.label}
                    {source.page && <span className="text-muted-foreground"> · p.{source.page}</span>}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">{source.snippet}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
      <Avatar className="mt-0.5 shrink-0">
        <AvatarFallback>
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </AvatarFallback>
      </Avatar>
      <Card className="flex items-center gap-1 rounded-tl-sm px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </Card>
    </motion.div>
  );
}
