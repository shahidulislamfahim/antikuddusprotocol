import React, { useState } from "react";
import { Scale, LogOut, Menu, X } from "lucide-react";
import { fontDisplay, fontBody, useT } from "../theme.js";
import { NAV_ITEMS } from "../data/constants.js";
import { Ambient, ThemeToggle } from "./Primitives.jsx";

export function Shell({ page, setPage, roll, onLogout, theme, setTheme, children }) {
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: fontBody, position: "relative" }}>
      <Ambient />
      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
        <aside
          className="hidden md:flex"
          style={{
            width: 226, flexShrink: 0, borderRight: `1px solid ${t.glassBorder}`,
            background: t.glassStrong, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            minHeight: "100vh", flexDirection: "column", position: "sticky", top: 0, padding: "20px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px 20px" }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: 8, background: t.primaryDim,
                border: `1px solid ${t.primary}`, display: "flex", alignItems: "center", justifyContent: "center",
                animation: "logoFloat 3.2s ease-in-out infinite",
              }}
            >
              <Scale size={16} color={t.primary} />
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, color: t.text }}>
              Anti-Kuddus
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const active = page === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: 8,
                    border: "none", background: active ? t.primaryDim : "transparent",
                    color: active ? t.primary : t.textMuted, fontFamily: fontBody,
                    fontWeight: active ? 600 : 500, fontSize: 13, cursor: "pointer", textAlign: "left",
                  }}
                >
                  <Icon size={15} /> {item.label}
                </button>
              );
            })}
          </nav>

          <div style={{ borderTop: `1px solid ${t.glassBorder}`, paddingTop: 12, marginTop: 10 }}>
            <div style={{ marginBottom: 10 }}>
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 10, color: t.textFaint, marginBottom: 8, padding: "0 2px" }}>
              AGENT: {roll} · ANON
            </div>
            <button
              onClick={onLogout}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8,
                border: `1px solid ${t.glassBorder}`, background: "transparent", color: t.textMuted,
                fontSize: 12.5, cursor: "pointer", width: "100%",
              }}
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </aside>

        <div
          className="flex md:hidden"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
            background: t.glassStrong, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${t.glassBorder}`, padding: "12px 16px",
            alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Scale size={17} color={t.primary} style={{ animation: "logoFloat 3.2s ease-in-out infinite" }} />
            <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, color: t.text }}>Anti-Kuddus</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", color: t.text }}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)}>
            <div
              style={{
                width: 240, height: "100%", background: t.glassStrong, backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)", padding: 20, borderRight: `1px solid ${t.glassBorder}`,
                boxShadow: t.mode === "light" ? "inset -1px 0 0 rgba(255,255,255,0.5)" : "inset -1px 0 0 rgba(255,255,255,0.05)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: t.text }}>Menu</span>
                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", color: t.text }}>
                  <X size={20} />
                </button>
              </div>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setPage(item.id); setMobileOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "11px 8px", background: "none",
                      border: "none", color: page === item.id ? t.primary : t.textMuted,
                      fontSize: 14, fontWeight: page === item.id ? 600 : 500, width: "100%", textAlign: "left",
                    }}
                  >
                    <Icon size={16} /> {item.label}
                  </button>
                );
              })}
              <button
                onClick={onLogout}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "11px 8px", background: "none",
                  border: "none", color: t.textMuted, fontSize: 14, marginTop: 8,
                  borderTop: `1px solid ${t.glassBorder}`, width: "100%",
                }}
              >
                <LogOut size={15} /> Log Out
              </button>
            </div>
          </div>
        )}

        <main style={{ flex: 1, minWidth: 0, padding: "24px 28px 90px" }} className="pt-[70px] md:pt-6">
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>{children}</div>
        </main>
      </div>

      <div
        className="flex md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
          background: t.glassStrong, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${t.glassBorder}`, padding: "8px 4px", justifyContent: "space-around",
        }}
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                background: "none", border: "none", color: active ? t.primary : t.textFaint,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 9, padding: "4px 6px",
              }}
            >
              <Icon size={16} /> {item.label.split(" ")[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
