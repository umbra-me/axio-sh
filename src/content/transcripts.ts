import type { TranscriptFrame } from "@tessera/mocks";
import { measureTranscriptFrame } from "@tessera/mocks";

// Every string here is one the agent paints. The frame title, the prompt row
// and the status hint are `title`, `prompt_row` and `status_row` in
// crates/axio/src/tui/paint.rs; the diff preview is `preview_lines` in
// tui/scrollback.rs, two spaces in, one colour per line kind. tests/approval
// pins them.
export const SUBJECT = "edit:crates/axio-pty/src/session.rs";
export const TITLE = `approve  ${SUBJECT}`;
export const PROMPT = "allow?  y once   a this session   n no, and say why   esc no";
export const HINT = "the change above is what runs";
export const PROMPT_KEYS: [string, string][] = [["y", "once"], ["a", "this session"], ["n", "no, and say why"], ["esc", "no"]];

export const APPROVAL_FRAME: TranscriptFrame = { title: TITLE, row: PROMPT };
export const RUNNING_FRAME: TranscriptFrame = { title: "claude-opus-5", meter: "6s · 2.1k in / 180 out", row: "…", width: measureTranscriptFrame(APPROVAL_FRAME).width };
export const RUNNING_HINT = "ctrl-c or esc to interrupt";

// The frame is as wide as the prompt row needs, and every rule is built to
// that width from measured parts rather than counted dashes, so the corners
// meet whatever the strings say.
const measured = measureTranscriptFrame(APPROVAL_FRAME);
export const FRAME = { top: measured.top, mid: measured.mid, bottom: measured.bottom };
export const WIDTH = measured.width;

/** One finished tool call, the way `tool_line` lays it out: name in a six-wide column, the subject, the time against the right margin. */
export const READ = { name: "read", detail: "crates/axio-pty/src/session.rs", ms: "3ms" };
export const DIFF: { kind: "hunk" | "ctx" | "del" | "add"; text: string }[] = [
  { kind: "hunk", text: "@@ -140,11 +140,14 @@ impl HarnessSession" },
  { kind: "ctx", text: "     pub fn status(&self) -> Option<ExitStatus> {" },
  { kind: "del", text: "-        self.child.lock().try_wait().ok().flatten()" },
  { kind: "add", text: "+        self.exit.load(Ordering::Acquire).map(Into::into)" },
  { kind: "ctx", text: "     }" },
];

/** The hero's shorter turn: two tool calls, a typed answer, a resting prompt. */
export const HERO = {
  model: "claude-opus-5",
  meter: "4s · 1.2k in / 340 out",
  prompt: "› explain the change",
  boxWidth: 54,
  tools: [{ name: "read", arg: "src/parse.rs", delta: "", ms: "3ms" }, { name: "edit", arg: "src/parse.rs", delta: "+12 −4", ms: "18ms" }],
  answer: "Done — the lexer now owns the span table.",
};
