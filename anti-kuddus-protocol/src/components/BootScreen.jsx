import React from "react";
import { Scale } from "lucide-react";
import { THEMES, ThemeContext, fontMono } from "../theme.js";
import { Ambient } from "./Primitives.jsx";

export function BootScreen({ label, theme }) {
  const t = THEMES[theme];
  return (
    <ThemeContext.Provider value={t}>
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          color: t.textMuted,
          fontFamily: fontMono,
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        <Ambient />
        <Scale size={28} color={t.primary} style={{ animation: "pulse 1.4s infinite" }} />
        <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      </div>
    </ThemeContext.Provider>
  );
}
