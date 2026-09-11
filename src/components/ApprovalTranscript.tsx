"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// The moment the whole site is about, played the way the real one runs: a
// turn reads a file, proposes an edit, the diff lands in scrollback, and the
// frame turns into a question. It stops there. The page cannot answer for you,
// and that is the point.
//
// Every string here is one the agent paints. The frame title, the prompt row
// and the status hint are `title`, `prompt_row` and `status_row` in
// crates/axio/src/tui/paint.rs; the diff preview is `preview_lines` in
// tui/scrollback.rs, two spaces in, one colour per line kind. tests/approval
// pins them.

export const SUBJECT = "edit:crates/axio-pty/src/session.rs";
export const TITLE = `approve  ${SUBJECT}`;
export const PROMPT = "allow?  y once   a this session   n no, and say why   esc no";
export const HINT = "the change above is what runs";

const MODEL = "claude-opus-5";
const METER = "6s · 2.1k in / 180 out";
const RUNNING_HINT = "ctrl-c or esc to interrupt";

// The frame is as wide as the prompt row needs, and every other rule is built
// to that width from measured parts rather than counted dashes, so the corners
// meet whatever the strings say.
const chars = (s: string) => [...s].length;
const MID = `│ ${PROMPT} │`;
const WIDTH = chars(MID);
const rule = (left: string, right: string) =>
  left + "─".repeat(WIDTH - chars(left) - chars(right)) + right;
const TOP_APPROVE = rule(`╭─ ${TITLE} `, "╮");
const TOP_RUNNING = rule(`╭─ ${MODEL} `, ` ${METER} ─╮`);
const BOTTOM = `╰${"─".repeat(WIDTH - 2)}╯`;
const RUNNING_MID = `│ …${" ".repeat(WIDTH - 4)}│`;

export const FRAME = { top: TOP_APPROVE, mid: MID, bottom: BOTTOM };

// One finished tool call, the way `tool_line` lays it out: the name in a
// six-wide column, the subject, the time against the right margin.
const READ = {
  name: "read",
  detail: "crates/axio-pty/src/session.rs",
  ms: "3ms",
};
const READ_LEFT = `  ⏺ ${READ.name.padEnd(6)}  ${READ.detail}`;
const READ_GAP = " ".repeat(Math.max(1, WIDTH - chars(READ_LEFT) - chars(READ.ms)));

const DIFF: { kind: "hunk" | "ctx" | "del" | "add"; text: string }[] = [
  { kind: "hunk", text: "@@ -140,11 +140,14 @@ impl HarnessSession" },
  { kind: "ctx", text: "     pub fn status(&self) -> Option<ExitStatus> {" },
  { kind: "del", text: "-        self.child.lock().try_wait().ok().flatten()" },
  { kind: "add", text: "+        self.exit.load(Ordering::Acquire).map(Into::into)" },
  { kind: "ctx", text: "     }" },
];

type Phase = "reading" | "previewing" | "asking";

const motionQuery = "(prefers-reduced-motion: reduce)";
const reducedMotion = () => window.matchMedia(motionQuery).matches;
const serverMotion = () => false;
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

// The prompt row as the TUI colours it: `allow?` and each key in the warning
// colour, what the key does dimmed beside it.
function PromptRow() {
  const keys: [string, string][] = [
    ["y", "once"],
    ["a", "this session"],
    ["n", "no, and say why"],
    ["esc", "no"],
  ];
  return (
    <>
      <span className="dim">│</span>
      {" "}
      <span className="warn">allow?</span>
      {"  "}
      {keys.map(([key, what], i) => (
        <span key={key}>
          <b className="warn">{key}</b>
          <span className="dim">{` ${what}`}</span>
          {i < keys.length - 1 ? "   " : " "}
        </span>
      ))}
      <span className="dim">│</span>
    </>
  );
}

export default function ApprovalTranscript() {
  const reduce = useSyncExternalStore(subscribeMotion, reducedMotion, serverMotion);
  const [animatedPhase, setPhase] = useState<Phase>("reading");
  const [animatedRead, setRead] = useState(false);
  const timers = useRef<number[]>([]);

  const phase: Phase = reduce ? "asking" : animatedPhase;
  const read = reduce || animatedRead;

  useEffect(() => {
    if (reduce) return;
    const at = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    at(500, () => setRead(true));
    at(1000, () => setPhase("previewing"));
    at(1700, () => setPhase("asking"));
    const scheduled = timers.current;
    return () => scheduled.forEach(clearTimeout);
  }, [reduce]);

  const asking = phase === "asking";
  const previewed = phase !== "reading";

  return (
    <figure className="terminal hero__figure" aria-label="The agent asking before it edits a file">
      <figcaption className="terminal__bar">
        <span className="terminal__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        a turn, stopped at the question
      </figcaption>
      <pre>
        <span className="dim">{"$ "}</span>
        {"axio\n\n"}
        <span className={read ? "in" : "out"}>
          {"  "}
          <span className="ok">⏺</span>
          {` ${READ.name.padEnd(6)}  ${READ.detail}`}
          <span className="dim">
            {READ_GAP}
            {READ.ms}
          </span>
          {"\n"}
        </span>
        <span className={previewed ? "in" : "out"}>
          {DIFF.map((line) => (
            <span key={line.text} className={`diff-${line.kind}`}>
              {"  "}
              {line.text}
              {"\n"}
            </span>
          ))}
        </span>
        {"\n"}
        <span className="dim">{asking ? TOP_APPROVE : TOP_RUNNING}</span>
        {"\n"}
        {asking ? <PromptRow /> : <span className="dim">{RUNNING_MID}</span>}
        {"\n"}
        <span className="dim">{BOTTOM}</span>
        {"\n"}
        <span className="dim">
          {asking
            ? HINT.padStart(WIDTH)
            : `  · working${RUNNING_HINT.padStart(WIDTH - chars("  · working"))}`}
        </span>
      </pre>
    </figure>
  );
}
