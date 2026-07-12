import React, { useState } from "react";
import { SearchCheck, CheckCircle2, XCircle } from "lucide-react";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { RULE_DB } from "../data/constants.js";
import { Card, Button, PageHeader, useInputStyle } from "./Primitives.jsx";

export function FactChecker() {
  const t = useT();
  const inputStyle = useInputStyle();
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const run = () => {
    setSearched(true);
    const query = q.toLowerCase();
    const match = RULE_DB.find((r) => r.q.split(" ").some((w) => w.length > 3 && query.includes(w)));
    setResult(match || null);
  };

  return (
    <div>
      <PageHeader eyebrow="Verification Desk" title="Fact Checker" subtitle='Kuddus loves citing "the rules." Let’s see if the rules agree with him.' icon={SearchCheck} />

      <Card style={{ padding: 20, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 10 }} className="flex-col sm:flex-row">
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder='Did Kuddus really say "tallest boys sit in front"?'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
          />
          <Button icon={SearchCheck} onClick={run}>Verify</Button>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {RULE_DB.slice(0, 4).map((r) => (
            <button
              key={r.q}
              onClick={() => { setQ(r.q); setSearched(true); setResult(r); }}
              style={{
                background: t.mode === "light" ? "#FAF8FE" : "#0A0C0A", border: `1px solid ${t.glassBorder}`,
                color: t.textMuted, borderRadius: 20, padding: "5px 12px", fontSize: 11, cursor: "pointer",
              }}
            >
              "{r.q}"
            </button>
          ))}
        </div>
      </Card>

      {searched && (
        <Card style={{ padding: 22, border: `1px solid ${result ? (result.verdict ? t.success : t.danger) : t.glassBorder}` }}>
          {!result ? (
            <p style={{ color: t.textFaint, fontSize: 13 }}>No record found matching that claim. Try one of the suggestions above.</p>
          ) : (
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 20,
                  background: result.verdict ? t.successDim : t.dangerDim, color: result.verdict ? t.success : t.danger,
                  fontFamily: fontDisplay, fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 14,
                }}
              >
                {result.verdict ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                {result.verdict ? "TRUE" : "FALSE"}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 10.5, color: t.textMuted, marginBottom: 5, textTransform: "uppercase" }}>Matched Rule</div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: t.text }}>{result.rule}</p>
              <div style={{ fontFamily: fontMono, fontSize: 10.5, color: t.textMuted, marginBottom: 5, textTransform: "uppercase" }}>Explanation</div>
              <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>{result.explain}</p>
            </div>
          )}
        </Card>
      )}

      <h3 style={{ fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1, color: t.textMuted, margin: "22px 0 10px", textTransform: "uppercase" }}>
        Full Rulebook Index
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {RULE_DB.map((r) => (
          <div key={r.q} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 14px", background: t.mode === "light" ? "#FAF8FE" : "#0A0C0A", border: `1px solid ${t.glassBorder}`, borderRadius: 8 }}>
            <span style={{ fontSize: 12.5, color: t.text, textTransform: "capitalize" }}>{r.q}</span>
            <span style={{ fontFamily: fontMono, fontSize: 10.5, fontWeight: 700, color: r.verdict ? t.success : t.danger, flexShrink: 0 }}>
              {r.verdict ? "TRUE" : "FALSE"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
