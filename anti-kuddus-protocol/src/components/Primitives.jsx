import React from "react";
import { Sun, Moon } from "lucide-react";
import { fontDisplay, fontBody, fontMono, useT } from "../theme.js";

export function Card({ children, style, ...rest }) {
  const t = useT();
  return (
    <div
      style={{
        background: t.glass,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid ${t.glassBorder}`,
        borderRadius: 14,
        boxShadow: t.shadow,
        transition: "background 0.25s ease, border-color 0.25s ease",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Button({ children, variant = "primary", icon: Icon, style, ...rest }) {
  const t = useT();
  const variants = {
    primary: { background: t.primary, color: t.primaryInk, border: "none" },
    danger: { background: t.danger, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: t.text, border: `1px solid ${t.glassBorder}` },
  };
  return (
    <button
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: fontBody,
        fontWeight: 600,
        fontSize: 13.5,
        letterSpacing: 0.2,
        padding: "11px 18px",
        borderRadius: 9,
        cursor: "pointer",
        transition: "filter 0.15s ease, transform 0.15s ease",
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.07)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

export function Field({ label, children }) {
  const t = useT();
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span
        style={{
          display: "block",
          fontFamily: fontMono,
          fontSize: 10.5,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: t.textMuted,
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export function useInputStyle() {
  const t = useT();
  return {
    width: "100%",
    background: t.mode === "light" ? "#FFFFFF" : "#0A0C0A",
    border: `1px solid ${t.glassBorder}`,
    borderRadius: 8,
    padding: "10px 12px",
    color: t.text,
    fontFamily: fontBody,
    fontSize: 13.5,
    outline: "none",
    boxSizing: "border-box",
  };
}

/* iOS-style "Clear Glass" treatment — used specifically for the SOS location
   dropdown and the Strike Portal category dropdown. Canonical spec also
   lives in src/index.css as the .clear-glass utility classes. */
export function useDrawerGlassStyle() {
  const t = useT();
  return {
    width: "100%",
    background: t.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(28,30,28,0.4)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: `1px solid rgba(255,255,255,${t.mode === "light" ? 0.2 : 0.12})`,
    boxShadow: t.mode === "light"
      ? "inset 0 1px 0 rgba(255,255,255,0.6)"
      : "inset 0 1px 0 rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "10px 14px",
    color: t.text,
    fontFamily: fontBody,
    fontSize: 13.5,
    outline: "none",
    boxSizing: "border-box",
  };
}

export function PageHeader({ eyebrow, title, subtitle, icon: Icon }) {
  const t = useT();
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: t.primary,
          marginBottom: 6,
        }}
      >
        {eyebrow}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {Icon && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: t.primaryDim,
              border: `1px solid ${t.glassBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.primary,
              flexShrink: 0,
            }}
          >
            <Icon size={19} />
          </div>
        )}
        <h1
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            fontSize: 27,
            color: t.text,
          }}
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <p style={{ color: t.textMuted, marginTop: 8, fontSize: 14, maxWidth: 620, lineHeight: 1.5 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Ambient backdrop — two quiet, slow blurred fields in the primary ink.
   Kept restrained: this is a formal register, not a hacker one. Keyframes
   (driftA / driftB) live globally in src/index.css. */
export function Ambient() {
  const t = useT();
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute", width: 480, height: 480, left: "-10%", top: "-10%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${t.primary}22 0%, transparent 70%)`,
          filter: "blur(20px)", animation: "driftA 30s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", width: 420, height: 420, right: "-8%", bottom: "-12%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${t.primary}18 0%, transparent 70%)`,
          filter: "blur(20px)", animation: "driftB 34s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function ThemeToggle({ theme, setTheme }) {
  const t = useT();
  const dark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      title="Switch case mode"
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: t.primaryDim, border: `1px solid ${t.glassBorder}`,
        borderRadius: 20, padding: "6px 12px", cursor: "pointer",
        color: t.primary, fontFamily: fontMono, fontSize: 11, letterSpacing: 0.6,
      }}
    >
      {dark ? <Moon size={13} /> : <Sun size={13} />}
      {dark ? "Dark" : "Light"}
    </button>
  );
}
