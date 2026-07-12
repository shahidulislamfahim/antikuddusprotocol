import React from "react";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { FEATURES } from "../data/constants.js";
import { Card, PageHeader } from "./Primitives.jsx";

export function Dashboard({ setPage, strikes, reports }) {
  const t = useT();
  return (
    <div>
      <PageHeader
        eyebrow="Case File Overview"
        title="Dashboard"
        subtitle="Seven instruments. One mission: hold Kodu Kuddus accountable. Every entry here is anonymous."
        icon={ShieldCheck}
      />

      <Card style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: t.text }}>Impeachment Meter</span>
          <span style={{ fontFamily: fontMono, color: strikes >= 2 ? t.danger : t.primary, fontWeight: 700, fontSize: 18 }}>
            {strikes}/3
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, height: 12 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1, borderRadius: 4,
                background: i < strikes ? t.danger : (t.mode === "light" ? "#F1EAFC" : "#0F2318"),
                border: `1px solid ${i < strikes ? t.danger : t.glassBorder}`,
              }}
            />
          ))}
        </div>
        <p style={{ fontFamily: fontMono, fontSize: 11, color: t.textMuted, marginTop: 10 }}>
          {strikes >= 2
            ? "One more verified strike triggers formal removal proceedings."
            : `${3 - strikes} more verified strikes until removal proceedings begin.`}
        </p>
      </Card>

      <div style={{ display: "flex", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
        <Card style={{ padding: "14px 18px", flex: "1 1 160px" }}>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: t.textMuted, letterSpacing: 1 }}>REPORTS FILED</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 600, marginTop: 4, color: t.text }}>{reports}</div>
        </Card>
        <Card style={{ padding: "14px 18px", flex: "1 1 160px" }}>
          <div style={{ fontFamily: fontMono, fontSize: 10, color: t.textMuted, letterSpacing: 1 }}>THREAT LEVEL</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 600, marginTop: 4, color: t.primary }}>
            {strikes >= 2 ? "High" : "Moderate"}
          </div>
        </Card>
      </div>

      <h2 style={{ fontFamily: fontDisplay, fontSize: 15, color: t.textMuted, margin: "28px 0 12px" }}>Case Modules</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Card
              key={f.id}
              onClick={() => setPage(f.id)}
              style={{ padding: 18, cursor: "pointer", transition: "transform 0.15s ease, border-color 0.15s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.glassBorder; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: 9, background: t.primaryDim,
                  border: `1px solid ${t.glassBorder}`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: t.primary, marginBottom: 12,
                }}
              >
                <Icon size={17} />
              </div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: t.text }}>{f.title}</div>
              <p style={{ color: t.textMuted, fontSize: 12.5, marginTop: 5, lineHeight: 1.4 }}>{f.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: t.primary, fontSize: 11.5, fontWeight: 600, marginTop: 12 }}>
                Open <ChevronRight size={13} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
