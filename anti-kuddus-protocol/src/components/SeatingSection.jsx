import React, { useState } from "react";
import { Armchair, Plus, ArrowUpDown } from "lucide-react";
import { fontMono, useT } from "../theme.js";
import { usePersistentState } from "../hooks/usePersistentState.js";
import { Card, Button, Field, PageHeader, useInputStyle } from "./Primitives.jsx";

export function SeatingSection() {
  const t = useT();
  const inputStyle = useInputStyle();
  const [students, setStudents, hydrated] = usePersistentState("seating-students", [
    { id: 1, name: "Rafi", roll: "03", height: 142 },
    { id: 2, name: "Mim", roll: "11", height: 138 },
    { id: 3, name: "Sadia", roll: "05", height: 151 },
    { id: 4, name: "Tanvir", roll: "09", height: 149 },
    { id: 5, name: "Nabila", roll: "14", height: 133 },
  ]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [height, setHeight] = useState("");
  const [justSorted, setJustSorted] = useState(false);

  const COLS = 3;
  const ROWS = 4;
  const SEATS = COLS * ROWS;

  const add = () => {
    if (!name.trim() || !height) return;
    if (students.length >= SEATS) return;
    setStudents([...students, { id: Date.now(), name, roll, height: Number(height) }]);
    setName(""); setRoll(""); setHeight("");
  };

  const autoSort = () => {
    setStudents((prev) => [...prev].sort((a, b) => a.height - b.height));
    setJustSorted(true);
    setTimeout(() => setJustSorted(false), 1600);
  };

  const seats = Array.from({ length: SEATS }, (_, i) => students[i] || null);

  return (
    <div>
      <PageHeader
        eyebrow="Junior Segment"
        title="Seating"
        subtitle="A 3×4 desk grid. Add classmates, then press Auto Sort to arrange them shortest-to-tallest, front row first."
        icon={Armchair}
      />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 18 }} className="grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Card style={{ padding: 20, alignSelf: "start" }}>
          <Field label="Name"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Arif" /></Field>
          <Field label="Roll Number"><input style={inputStyle} value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="e.g. 21" /></Field>
          <Field label="Height (cm)"><input style={inputStyle} type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 145" /></Field>
          <Button icon={Plus} onClick={add} style={{ width: "100%" }} disabled={students.length >= SEATS}>
            {students.length >= SEATS ? "Grid Full (12/12)" : "Add Student"}
          </Button>

          <Button
            icon={ArrowUpDown}
            variant="ghost"
            onClick={autoSort}
            style={{ width: "100%", marginTop: 10 }}
          >
            Auto Sort
          </Button>
          {justSorted && (
            <p style={{ color: t.success, fontFamily: fontMono, fontSize: 11, marginTop: 8, textAlign: "center" }}>
              Sorted — shortest to tallest.
            </p>
          )}
        </Card>

        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1, color: t.textMuted, textTransform: "uppercase" }}>
              Front of Class ↓
            </span>
            <span style={{ fontFamily: fontMono, fontSize: 10.5, color: t.primary }}>{students.length}/{SEATS} seated</span>
          </div>

          {!hydrated ? (
            <p style={{ color: t.textFaint, fontFamily: fontMono, fontSize: 12 }}>Loading seating chart…</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, gap: 10 }}>
              {seats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: s ? (t.mode === "light" ? "#FFFFFF" : "#0A0C0A") : "transparent",
                    border: `1px dashed ${s ? t.glassBorder : t.textFaint}`,
                    borderStyle: s ? "solid" : "dashed",
                    borderRadius: 9, padding: "14px 8px", textAlign: "center", minHeight: 76,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {s ? (
                    <>
                      <div
                        style={{
                          width: 28, height: 28, margin: "0 auto 6px", borderRadius: "50%",
                          background: t.primaryDim, color: t.primary, display: "flex",
                          alignItems: "center", justifyContent: "center", fontFamily: fontMono, fontWeight: 700, fontSize: 10.5,
                        }}
                      >
                        {s.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: t.text }}>{s.name}</div>
                      <div style={{ fontFamily: fontMono, fontSize: 9.5, color: t.textFaint }}>{s.height}cm</div>
                    </>
                  ) : (
                    <span style={{ fontFamily: fontMono, fontSize: 10, color: t.textFaint }}>empty desk</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 14, fontFamily: fontMono, fontSize: 10, color: t.textFaint, textTransform: "uppercase", letterSpacing: 1 }}>
            ↑ Back of Class (tallest)
          </div>
        </Card>
      </div>
    </div>
  );
}
