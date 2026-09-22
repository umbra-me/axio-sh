"use client";

import { TranscriptPlayer } from "@tessera/mocks";
import { APPROVAL_FRAME, DIFF, HINT, PROMPT_KEYS, READ, RUNNING_FRAME, RUNNING_HINT, WIDTH } from "@/content/transcripts";

const chars = (s: string) => [...s].length;
const READ_LEFT = `  ⏺ ${READ.name.padEnd(6)}  ${READ.detail}`;
const READ_GAP = " ".repeat(Math.max(1, WIDTH - chars(READ_LEFT) - chars(READ.ms)));

// The prompt row as the TUI colours it: `allow?` and each key in the warning
// colour, what the key does dimmed beside it.
const promptRow = (
  <>
    <span className="warn">allow?</span>
    {"  "}
    {PROMPT_KEYS.map(([key, what], i) => (
      <span key={key}>
        <b className="warn">{key}</b>
        <span className="ts-terminal__dim">{` ${what}`}</span>
        {i < PROMPT_KEYS.length - 1 ? "   " : " "}
      </span>
    ))}
  </>
);

/**
 * The moment the whole site is about, played the way the real one runs: a
 * turn reads a file, proposes an edit, the diff lands in scrollback, and the
 * frame turns into a question. It stops there. The page cannot answer for you,
 * and that is the point.
 */
export default function ApprovalTranscript() {
  return (
    <TranscriptPlayer
      label="The agent asking before it edits a file"
      title="a turn, stopped at the question"
      className="hero__figure"
      head={<><span className="ts-terminal__dim">{"$ "}</span>{"axio\n\n"}</>}
      idle={{ frame: RUNNING_FRAME, hint: `  · working${RUNNING_HINT.padStart(WIDTH - chars("  · working"))}` }}
      steps={[
        { at: 500, kind: "line", key: "read", node: <>{"  "}<span className="ok">⏺</span>{` ${READ.name.padEnd(6)}  ${READ.detail}`}<span className="ts-terminal__dim">{READ_GAP}{READ.ms}</span>{"\n"}</> },
        { at: 1000, kind: "line", key: "diff", node: DIFF.map((line) => <span key={line.text} className={`diff-${line.kind}`}>{"  "}{line.text}{"\n"}</span>) },
        { at: 1700, kind: "frame", key: "ask", frame: { ...APPROVAL_FRAME, rowNode: promptRow }, hint: HINT },
      ]}
    />
  );
}
