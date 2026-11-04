import { AgentSurface } from "@tessera/mocks";
import { agentSurface } from "@/content/agent-surface";
import ReadableMock from "./ReadableMock";

export default function Surface({ className }: { className?: string }) {
  return <ReadableMock><AgentSurface {...agentSurface} className={className} /></ReadableMock>;
}
