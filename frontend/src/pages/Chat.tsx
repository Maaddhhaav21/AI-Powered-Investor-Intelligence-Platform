import { PageHeader } from "@/components/PageHeader";
import { ChatWindow } from "@/components/ChatWindow";
import { MOCK_REPORT } from "@/services/mock";

export function Chat() {
  return (
    <div>
      <PageHeader
        eyebrow="Grounded Q&A"
        title="Chat"
        description={`Currently chatting with ${MOCK_REPORT.companyName} · ${MOCK_REPORT.fiscalYear}`}
      />
      <ChatWindow reportId={MOCK_REPORT.id} reportLabel={MOCK_REPORT.companyName} />
    </div>
  );
}
