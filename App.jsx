import React, { useEffect, useState } from "react";
import { THEMES, ThemeContext } from "./theme.js";
import { usePersistentState, loadKey, saveKey, clearKey } from "./hooks/usePersistentState.js";
import { BootScreen } from "./components/BootScreen.jsx";
import { LoginScreen } from "./components/LoginScreen.jsx";
import { Shell } from "./components/Shell.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { StrikePortal } from "./components/StrikePortal.jsx";
import { SeatingSection } from "./components/SeatingSection.jsx";
import { SyllabusDigest } from "./components/SyllabusDigest.jsx";
import { LedgerSection } from "./components/LedgerSection.jsx";
import { SosSection } from "./components/SosSection.jsx";
import { FactChecker } from "./components/FactChecker.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roll, setRoll] = useState("");
  const [restoring, setRestoring] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [theme, setThemeState] = useState("light");

  const [strikeState, setStrikeState, strikesHydrated] = usePersistentState("strike-state", {
    strikes: 2,
    log: [
      { id: 1, category: "Tiffin Theft", desc: "Confiscated my samosa citing \"tax season.\"", agent: "Agent #4471" },
      { id: 2, category: "Bribes", desc: "Offered extra marks for washing his water bottle.", agent: "Agent #2290" },
    ],
  });

  useEffect(() => {
    (async () => {
      const session = await loadKey("session");
      const savedTheme = await loadKey("theme-mode");
      if (session && session.roll) { setRoll(session.roll); setLoggedIn(true); }
      if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
      setRestoring(false);
    })();
  }, []);

  const setTheme = (mode) => { setThemeState(mode); saveKey("theme-mode", mode); };

  const t = THEMES[theme];

  if (restoring) return <BootScreen label="RESTORING CASE FILE…" theme={theme} />;

  if (!loggedIn) {
    return (
      <ThemeContext.Provider value={t}>
        <LoginScreen
          theme={theme}
          setTheme={setTheme}
          onEnter={(r) => { setRoll(r); setLoggedIn(true); saveKey("session", { roll: r }); }}
        />
      </ThemeContext.Provider>
    );
  }

  const strikes = strikeState.strikes;
  const log = strikeState.log;
  const setStrikes = (next) => setStrikeState((s) => ({ ...s, strikes: typeof next === "function" ? next(s.strikes) : next }));
  const setLog = (next) => setStrikeState((s) => ({ ...s, log: typeof next === "function" ? next(s.log) : next }));

  const pages = {
    dashboard: <Dashboard setPage={setPage} strikes={strikes} reports={log.length} />,
    strike: <StrikePortal strikes={strikes} setStrikes={setStrikes} log={log} setLog={setLog} />,
    seating: <SeatingSection />,
    syllabus: <SyllabusDigest />,
    ledger: <LedgerSection />,
    sos: <SosSection />,
    fact: <FactChecker />,
  };

  return (
    <ThemeContext.Provider value={t}>
      <Shell
        page={page}
        setPage={setPage}
        roll={roll}
        theme={theme}
        setTheme={setTheme}
        onLogout={() => { setLoggedIn(false); clearKey("session"); }}
      >
        {!strikesHydrated ? (
          <div style={{ color: t.textFaint, fontFamily: "var(--font-primary)", fontSize: 12 }}>Loading case file…</div>
        ) : (
          pages[page]
        )}
      </Shell>
    </ThemeContext.Provider>
  );
}
