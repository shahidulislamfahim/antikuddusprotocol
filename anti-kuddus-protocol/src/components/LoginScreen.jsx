import React, { useState } from "react";
import { Scale } from "lucide-react";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { Card, Button, Field, useInputStyle, Ambient, ThemeToggle } from "./Primitives.jsx";

export function LoginScreen({ onEnter, theme, setTheme }) {
  const t = useT();
  const inputStyle = useInputStyle();
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = () => {
    if (roll.length !== 4) {
      setError("Roll number must be exactly 4 digits.");
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }

    setChecking(true);
    setError("");
    setTimeout(() => {
      setChecking(false);
      onEnter(roll);
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.mode === "light"
          ? `radial-gradient(circle at 50% 0%, ${t.bgAlt} 0%, ${t.bg} 60%)`
          : `radial-gradient(circle at 50% 0%, ${t.bgAlt} 0%, ${t.bg} 60%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, position: "relative", overflow: "hidden",
      }}
    >
      <Ambient />
      <div style={{ position: "absolute", top: 22, right: 22, zIndex: 1 }}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <Card
        style={{
          width: 400, maxWidth: "100%", padding: "38px 32px", position: "relative", zIndex: 1,
          animation: shake ? "shake 0.45s ease" : "riseIn 0.5s ease both",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 60, height: 60, margin: "0 auto 16px", borderRadius: "50%",
              background: t.primaryDim, border: `1px solid ${t.primary}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "logoFloat 3.2s ease-in-out infinite",
            }}
          >
            <Scale size={26} color={t.primary} />
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 23, color: t.text }}>
            Anti-Kuddus Protocol
          </h1>
          <p style={{ fontFamily: fontMono, fontSize: 11, color: t.primary, letterSpacing: 1.2, marginTop: 8 }}>
            SECTION B · CASE FILE ACCESS
          </p>
        </div>

        <Field label="Roll Number">
          <input
            style={inputStyle}
            placeholder="e.g. 0000007"
            value={roll}
            maxLength={7}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => { setRoll(e.target.value.replace(/\D/g, "").slice(0, 7)); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </Field>

        {error && (
          <p style={{ color: t.danger, fontSize: 12, fontFamily: fontMono, marginTop: -6, marginBottom: 12 }}>
            {error}
          </p>
        )}

        <Button
          icon={Scale}
          style={{ width: "100%", padding: "12px 0", marginTop: 4, opacity: checking ? 0.75 : 1 }}
          onClick={submit}
          disabled={checking}
        >
          {checking ? "Verifying roster…" : "Enter the case file"}
        </Button>

        <p style={{ color: t.textMuted, fontSize: 12, textAlign: "center", marginTop: 16 }}>
          Your identity stays sealed. Kuddus will never see it.
        </p>
      </Card>

      <style>{`
        input:focus { border-color: ${t.primary} !important; }
        select:focus, textarea:focus { border-color: ${t.primary} !important; }
      `}</style>
    </div>
  );
}
