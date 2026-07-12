import React, { useState } from "react";
import { Siren, MapPin, Clock, CheckCircle2, XCircle } from "lucide-react";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { usePersistentState } from "../hooks/usePersistentState.js";
import { Card, PageHeader, Field, useDrawerGlassStyle } from "./Primitives.jsx";

export function SosSection() {
  const t = useT();
  const drawerGlassStyle = useDrawerGlassStyle();
  const [location, setLocation] = useState("Classroom");
  const [feed, setFeed] = usePersistentState("sos-feed", [
    { id: 1, location: "Corridor", time: "10:41 AM", resolved: false },
    { id: 2, location: "Canteen", time: "9:58 AM", resolved: true },
  ]);

  const ping = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setFeed([{ id: Date.now(), location, time, resolved: false }, ...feed]);
  };
  const toggleResolved = (id) => {
    setFeed(feed.map((f) => (f.id === id ? { ...f, resolved: !f.resolved } : f)));
  };

  return (
    <div>
      <PageHeader eyebrow="Emergency Broadcast" title="SOS Alert" subtitle="Kuddus sighted and closing in? Ping the network. No names, just coordinates." icon={Siren} />

      <Card style={{ padding: "36px 24px", textAlign: "center", marginBottom: 20 }}>
        <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {t.mode === "light" ? (
            <>
              {/* Light mode: high-visibility neon-radar sweep + crimson/amber ripple pulses */}
              <div
                aria-hidden
                style={{
                  position: "absolute", width: 180, height: 180, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, rgba(255,59,48,0) 0deg, rgba(255,176,32,0.55) 35deg, rgba(255,59,48,0) 70deg, rgba(255,59,48,0) 360deg)",
                  animation: "radarSweepLight 2.2s linear infinite", pointerEvents: "none",
                }}
              />
              <div aria-hidden style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", pointerEvents: "none", animation: "radarRippleLight 1.8s ease-out infinite" }} />
              <div aria-hidden style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", pointerEvents: "none", animation: "radarRippleLight 1.8s ease-out infinite", animationDelay: "0.6s" }} />
              <div aria-hidden style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", pointerEvents: "none", animation: "radarRippleLight 1.8s ease-out infinite", animationDelay: "1.2s" }} />
            </>
          ) : (
            <>
              {/* Dark mode: holographic plasma ring + digital glitch scanline emergency beacon */}
              <div
                aria-hidden
                style={{
                  position: "absolute", width: 178, height: 178, borderRadius: "50%",
                  background: `conic-gradient(from 0deg, transparent 0deg, ${t.danger}aa 60deg, transparent 140deg, ${t.primary}88 220deg, transparent 300deg, transparent 360deg)`,
                  filter: "blur(2px)", animation: "plasmaRotateDark 3.4s linear infinite", pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute", width: 150, height: 150, borderRadius: "50%",
                  border: `1px solid ${t.danger}`, boxShadow: `0 0 18px 2px ${t.danger}aa, inset 0 0 18px 2px ${t.danger}55`,
                  animation: "plasmaPulseDark 1.7s ease-in-out infinite", pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute", width: 144, height: 144, borderRadius: "50%", overflow: "hidden", pointerEvents: "none",
                  background: `repeating-linear-gradient(0deg, ${t.danger}33 0px, ${t.danger}33 1px, transparent 1px, transparent 4px)`,
                  animation: "scanlineGlitchDark 2.4s linear infinite", mixBlendMode: "screen",
                }}
              />
            </>
          )}
          <button
            onClick={ping}
            style={{
              position: "relative", zIndex: 1, width: 140, height: 140, borderRadius: "50%", border: "none",
              background: `radial-gradient(circle, ${t.danger}, ${t.danger}dd)`,
              boxShadow: t.mode === "light" ? `0 0 0 0 ${t.danger}66` : `0 0 26px 4px ${t.danger}77`,
              color: "#fff", fontFamily: fontDisplay, fontWeight: 700, fontSize: 20,
              letterSpacing: 1.5, cursor: "pointer",
              animation: t.mode === "light" ? "radarCorePulseLight 1.8s ease-out infinite" : "beaconGlowDark 1.7s ease-in-out infinite",
            }}
          >
            SOS
          </button>
        </div>
        <p style={{ color: t.textMuted, fontSize: 12.5, marginTop: 18 }}>Tap to broadcast your location to the resistance</p>
        <div style={{ maxWidth: 260, margin: "16px auto 0" }}>
          <Field label="Location">
            <select style={drawerGlassStyle} value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Library</option><option>Playground</option><option>Corridor</option><option>Classroom</option><option>Canteen</option>
            </select>
          </Field>
        </div>
      </Card>

      <h3 style={{ fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1, color: t.textMuted, margin: "0 0 10px", textTransform: "uppercase" }}>
        Captain Alert Feed
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {feed.map((f) => (
          <Card key={f.id} style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 180 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: t.text }}>
                <MapPin size={13} color={t.textMuted} /> {f.location}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: fontMono, fontSize: 11, color: t.textFaint }}>
                <Clock size={12} /> {f.time}
              </span>
            </div>
            <button
              onClick={() => toggleResolved(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer",
                padding: "6px 12px", borderRadius: 20, fontFamily: fontMono, fontSize: 11, fontWeight: 700,
                background: f.resolved ? t.successDim : t.dangerDim,
                color: f.resolved ? t.success : t.danger,
              }}
            >
              {f.resolved ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
              {f.resolved ? "Resolved" : "Unresolved"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
