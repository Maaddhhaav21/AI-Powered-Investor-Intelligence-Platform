import { PageHeader } from "@/components/PageHeader";
import { ChatWindow } from "@/components/ChatWindow";

export function Chat() {
  return (
    <div>
      <PageHeader
        eyebrow="Grounded Q&A"
        title="Chat"
        description="Ask questions about the uploaded annual report."
      />

      <ChatWindow reportId="latest" reportLabel="Uploaded Report" />
    </div>
  );
}
