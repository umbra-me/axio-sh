import { AgentSurface } from "@tessera/mocks";
import { agentSurface } from "@/content/agent-surface";

export default function Surface({ className }: { className?: string }) {
  return <AgentSurface {...agentSurface} className={className} />;
}
