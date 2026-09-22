"use client";

import { TranscriptPlayer } from "@tessera/mocks";
import { HERO } from "@/content/transcripts";

/** A turn, played once: two tool calls, an answer typed out, the prompt resting. */
export default function HeroTranscript() {
  const typedAt = 1080;
  const doneAt = typedAt + HERO.answer.length * 16 + 260;
  return (
    <TranscriptPlayer
      label="An example axio turn"
      title="a turn, played once"
      head={<><span className="ts-terminal__dim">{"$ "}</span>{"axio\n\n"}</>}
      idle={{ frame: { title: HERO.model, meter: HERO.meter, row: HERO.prompt, width: HERO.boxWidth }, hint: `  ${"· thinking".padEnd(32)}ctrl-c to interrupt` }}
      steps={[
        ...HERO.tools.map((line, i) => ({ at: i === 0 ? 500 : 840, kind: "line" as const, key: line.name, node: <>{"  "}<span className="ts-terminal__acc">⏺</span>{` ${line.name.padEnd(8)}${line.arg}`}{line.delta ? <span className="ts-terminal__dim">{`  ${line.delta}`}</span> : ""}<span className="ts-terminal__dim">{" ".repeat(Math.max(1, 38 - line.arg.length - (line.delta ? line.delta.length + 2 : 0)))}{line.ms}</span>{"\n"}</> })),
        { at: typedAt, kind: "typed", key: "answer", text: HERO.answer, indent: "\n  " },
        { at: doneAt, kind: "frame", key: "done", frame: { title: HERO.model, meter: HERO.meter, row: HERO.prompt, width: HERO.boxWidth }, hint: `  ${"".padEnd(32)}/ for commands` },
      ]}
    />
  );
}
