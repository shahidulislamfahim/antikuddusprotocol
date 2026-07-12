import React, { useState } from "react";
import { Gavel, Send, CheckCircle2 } from "lucide-react";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { Card, Button, Field, PageHeader, useInputStyle, useDrawerGlassStyle } from "./Primitives.jsx";

export function StrikePortal({ strikes, setStrikes, log, setLog }) {
  const t = useT();
  const inputStyle = useInputStyle();
  const drawerGlassStyle = useDrawerGlassStyle();
  const [category, setCategory] = useState("Tiffin Theft");
  const [desc, setDesc] = useState("");
  const [toast, setToast] = useState(false);

  const submit = () => {
    if (!desc.trim()) return;
    const agent = `Agent #${Math.floor(1000 + Math.random() * 9000)}`;
    setLog([{ id: Date.now(), category, desc, agent }, ...log]);
    setStrikes(Math.min(3, strikes + 1));
    setDesc("");
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Confidential Filing"
        title="Strike Portal"
        subtitle="Submit a verified account of misconduct. Reports are anonymized before they reach the strike count."
        icon={Gavel}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }} className="grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
        <Card style={{ padding: 22 }}>
          <Field label="Category">
            <select style={drawerGlassStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Tiffin Theft</option>
              <option>Bribes</option>
              <option>Syllabus Bloat</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="What happened?">
            <textarea
              style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
              placeholder="Describe the incident."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Field>
          <Button icon={Send} onClick={submit} style={{ width: "100%" }}>File Anonymous Report</Button>
          {toast && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, background: t.successDim, border: `1px solid ${t.success}`, borderRadius: 8, padding: "10px 14px", color: t.success, fontSize: 12.5, fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Report filed. Strike logged.
            </div>
          )}
        </Card>
        <div>
          <Card style={{ padding: 18 }}>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: t.textMuted, marginBottom: 6 }}>WARNINGS</div>
            <div style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 700, color: strikes >= 2 ? t.danger : t.primary }}>{strikes}/3</div>
          </Card>
          <h3 style={{ fontFamily: fontMono, fontSize: 10.5, color: t.textMuted, margin: "16px 0 8px", letterSpacing: 1 }}>RECENT FILINGS</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {log.length === 0 && <p style={{ color: t.textFaint, fontSize: 12.5 }}>No reports yet.</p>}
            {log.slice(0, 5).map((r) => (
              <Card key={r.id} style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: fontMono, fontSize: 10, color: t.primary }}>{r.agent}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 10, color: t.textMuted }}>{r.category}</span>
                </div>
                <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.4 }}>{r.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
