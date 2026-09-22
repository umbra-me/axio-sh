import type { AgentSurfaceProps } from "@tessera/mocks";

/**
 * The desktop surface, drawn rather than screenshotted: four sessions across
 * two repositories, each wearing its agent's colour, one of them holding a
 * question the person has not answered yet. That is the argument the headline
 * beside it makes, so the two are saying the same thing in two registers.
 * Marked aria-hidden; every fact in it is stated in words elsewhere.
 */
export const agentSurface: AgentSurfaceProps = {
  color: "var(--ts-product-agent)",
  program: "axio",
  summary: "4 sessions",
  projects: [
    { name: "axio", sessions: [{ label: "span table", accent: "var(--ts-text-link)", state: "running", age: "4m" }, { label: "pty exit codes", accent: "var(--ts-hosted-agent-claude)", state: "waiting", age: "2m", active: true }] },
    { name: "axio-sh", sessions: [{ label: "bump next 16", accent: "var(--ts-hosted-agent-codex)", state: "running", age: "11m" }, { label: "dep audit", accent: "var(--ts-hosted-agent-pi)", state: "idle", age: "1h" }] },
  ],
  crumbs: { items: ["axio"], current: "pty exit codes" },
  diff: [
    { kind: "hunk", text: "@@ -140,11 +140,14 @@ impl HarnessSession" },
    { kind: "ctx", text: "     /// The child's status, once the waiter has seen it." },
    { kind: "ctx", text: "     pub fn status(&self) -> Option<ExitStatus> {" },
    { kind: "del", text: "-        self.child.lock().try_wait().ok().flatten()" },
    { kind: "add", text: "+        self.exit.load(Ordering::Acquire).map(Into::into)" },
    { kind: "ctx", text: "     }" },
    { kind: "ctx", text: "" },
    { kind: "hunk", text: "@@ -204,6 +207,9 @@ impl Drop for Master" },
    { kind: "ctx", text: "     fn drop(&mut self) {" },
    { kind: "add", text: "+        // Closing blocks until the pipe drains, so it" },
    { kind: "add", text: "+        // cannot happen on the thread that asked." },
    { kind: "ctx", text: "         let pty = self.pty.take();" },
  ],
  prompt: { title: "approve  edit:crates/axio-pty/src/session.rs", row: "allow? y once   a this session   n no" },
  status: [{ tone: "ok", text: "2 running" }, { text: "1 idle" }, { tone: "warn", text: "1 waiting on you" }],
};
