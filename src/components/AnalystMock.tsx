// Axio Analyst's sidebar, drawn beside the IL it is looking at. The resting
// layout is what the plugin actually shows: one header row naming the function,
// the empty state with the facts that will be sent and four suggested
// questions, and one composer whose scope chip carries the pack count.
export default function AnalystMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__bar">
        <i />
        Binary Ninja
        <span className="sep">/</span>
        <span>parser.bin</span>
        <span className="right">HLIL · x86_64</span>
      </div>
      <div className="ana">
        <pre className="ana__il">
          <span className="addr">0040a1c0</span>{"  "}
          <span className="kw">int64_t</span> <span className="fn">parse_record</span>
          {"(char* buf, int64_t len)\n\n"}
          <span className="addr">0040a1d4</span>{"      "}
          <span className="kw">if</span>{" (len < 0x18)\n"}
          <span className="addr">0040a1da</span>{"          "}
          <span className="kw">return</span>{" -1\n\n"}
          <span className="addr">0040a1e8</span>{"      "}
          {"int32_t tag = *(uint32_t*)buf\n"}
          <span className="hot">
            <span className="addr">0040a1f2</span>{"      "}
            {"int64_t n = *(uint64_t*)(buf + 8)\n"}
          </span>
          <span className="hot">
            <span className="addr">0040a1fb</span>{"      "}
            <span className="kw">if</span>{" (n > len - 0x18)\n"}
          </span>
          <span className="addr">0040a203</span>{"          "}
          <span className="kw">return</span>{" -2\n\n"}
          <span className="addr">0040a210</span>{"      "}
          {"void* out = malloc(n + 1)\n"}
          <span className="addr">0040a21e</span>{"      "}
          {"memcpy(out, buf + 0x18, n)\n"}
          <span className="addr">0040a22c</span>{"      "}
          {"*(uint8_t*)(out + n) = 0\n"}
          <span className="addr">0040a232</span>{"      "}
          <span className="kw">return</span>{" dispatch(tag, out)\n"}
        </pre>
        <div className="ana__side">
          <div className="ana__head">
            <b>parse_record</b>
            <span className="addr">0040a1c0</span>
            <span className="more">···</span>
          </div>
          <div className="ana__empty">
            <dl>
              <dt>arch</dt>
              <dd>x86_64 · linux</dd>
              <dt>provider</dt>
              <dd>claude · high effort</dd>
              <dt>context</dt>
              <dd>function · 2 packs</dd>
            </dl>
            <ul>
              <li className="on">Explain this function</li>
              <li>What does the length check protect?</li>
              <li>Trace where n is used</li>
              <li>Which callers reach dispatch?</li>
            </ul>
          </div>
          <div className="ana__composer">
            <div className="prompt">Ask about parse_record…</div>
            <div className="row">
              <span className="chip">parse_record +2</span>
              <span className="hint">ctrl-enter</span>
              <span className="send">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
