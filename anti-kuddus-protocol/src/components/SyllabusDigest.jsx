import React, { useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { fontMono, useT } from "../theme.js";
import { Card, Button, Field, PageHeader, useInputStyle } from "./Primitives.jsx";

function summarizeLocal(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const parts = clean.split(/(?<=[.;\n])\s+|\n/).map((s) => s.trim()).filter((s) => s.length > 4);
  return parts.slice(0, 10).map((s) => {
    const words = s.split(" ");
    return words.length > 14 ? words.slice(0, 14).join(" ") + "…" : s.replace(/[.;]+$/, "");
  });
}

async function summarizeWithAI(text) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content:
          "You are compressing a bloated school syllabus into the real, examinable topics only. " +
          "Strip filler like page numbers, writer biographies, indexes, or barcodes. " +
          "Respond with ONLY a JSON array of short topic strings (max 10 items, each under 12 words), no prose, no markdown fences.\n\nSyllabus:\n" + text,
      }],
    }),
  });
  const data = await response.json();
  const raw = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  if (!Array.isArray(parsed)) throw new Error("Unexpected AI response shape");
  return parsed.slice(0, 10).map(String);
}

export function SyllabusDigest() {
  const t = useT();
  const inputStyle = useInputStyle();
  const [input, setInput] = useState("");
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const [errorNote, setErrorNote] = useState("");

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true); setErrorNote("");
    try {
      const result = await summarizeWithAI(input);
      setBullets(result); setSource("ai");
    } catch {
      setBullets(summarizeLocal(input)); setSource("local");
      setErrorNote("AI service unavailable — showing a quick local extract instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Decompression Unit" title="Syllabus Digest" subtitle="Paste the bloated syllabus. Get the topics, not the padding." icon={BookOpen} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="grid-cols-1 lg:grid-cols-2">
        <Card style={{ padding: 20 }}>
          <Field label="Paste syllabus text">
            <textarea style={{ ...inputStyle, minHeight: 240, resize: "vertical" }} placeholder="Unit 1: Introduction to..." value={input} onChange={(e) => setInput(e.target.value)} />
          </Field>
          <Button icon={Sparkles} onClick={run} style={{ width: "100%", opacity: loading ? 0.75 : 1 }} disabled={loading}>
            {loading ? "Summarizing…" : "Summarize"}
          </Button>
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: fontMono, fontSize: 10.5, color: t.textMuted, textTransform: "uppercase" }}>Extracted Topics</span>
            {source && <span style={{ fontFamily: fontMono, fontSize: 9.5, color: source === "ai" ? t.primary : t.textMuted }}>{source === "ai" ? "CLAUDE AI" : "LOCAL"}</span>}
          </div>
          {errorNote && <p style={{ color: t.danger, fontSize: 11, marginTop: 8 }}>{errorNote}</p>}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {bullets.length === 0 && !loading && <p style={{ color: t.textFaint, fontSize: 12.5 }}>Nothing summarized yet.</p>}
            {loading && <p style={{ color: t.textFaint, fontSize: 12.5 }}>Cross-referencing chapters…</p>}
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: t.mode === "light" ? "#FAF8FE" : "#0A0C0A", border: `1px solid ${t.glassBorder}`, borderRadius: 8, padding: "9px 12px" }}>
                <span style={{ color: t.primary, fontFamily: fontMono, fontSize: 11.5, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 12.5, color: t.text, lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
