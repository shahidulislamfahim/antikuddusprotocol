import React, { useState } from "react";
import { Wallet, Plus } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { fontDisplay, fontMono, useT } from "../theme.js";
import { usePersistentState } from "../hooks/usePersistentState.js";
import { Card, Button, PageHeader, useInputStyle } from "./Primitives.jsx";

function Tracker({ storageKey, title, unitLabel, quickAmount, placeholder }) {
  const t = useT();
  const inputStyle = useInputStyle();
  const [entries, setEntries] = usePersistentState(storageKey, []);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const add = () => {
    if (!item.trim() || !amount) return;
    setEntries([{ id: Date.now(), item, amount: Number(amount) }, ...entries]);
    setItem(""); setAmount("");
  };
  const quickLog = () => {
    setEntries([{ id: Date.now(), item: `${title} (quick log)`, amount: quickAmount }, ...entries]);
  };
  const total = entries.reduce((s, e) => s + e.amount, 0);
  const chartData = entries.slice(0, 8).reverse().map((e) => ({ name: e.item.length > 8 ? e.item.slice(0, 8) + "…" : e.item, amount: e.amount }));

  return (
    <Card style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 17, color: t.text }}>{title}</span>
        <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: t.primary }}>{total} {unitLabel}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input style={{ ...inputStyle, flex: 2 }} placeholder={placeholder} value={item} onChange={(e) => setItem(e.target.value)} />
        <input style={{ ...inputStyle, flex: 1 }} type="number" placeholder="tk" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Button icon={Plus} onClick={add} style={{ flexShrink: 0 }}>Log</Button>
      </div>
      <Button variant="ghost" onClick={quickLog} style={{ width: "100%", marginBottom: 14 }}>
        Quick log standard {quickAmount}tk
      </Button>

      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid stroke={t.glassBorder} vertical={false} />
            <XAxis dataKey="name" stroke={t.textFaint} fontSize={10} />
            <YAxis stroke={t.textFaint} fontSize={10} />
            <Tooltip contentStyle={{ background: t.mode === "light" ? "#fff" : "#111", border: `1px solid ${t.glassBorder}`, borderRadius: 8, color: t.text, fontSize: 12 }} />
            <Bar dataKey="amount" fill={t.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
        {entries.length === 0 && <p style={{ color: t.textFaint, fontSize: 12 }}>No entries logged yet.</p>}
        {entries.slice(0, 8).map((e) => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: t.mode === "light" ? "#FAF8FE" : "#0A0C0A", border: `1px solid ${t.glassBorder}`, borderRadius: 7, fontSize: 12.5 }}>
            <span style={{ color: t.text }}>{e.item}</span>
            <span style={{ fontFamily: fontMono, color: t.primary, fontWeight: 700 }}>{e.amount} tk</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function LedgerSection() {
  return (
    <div>
      <PageHeader eyebrow="Financial Crimes Unit" title="Digital Ledger" subtitle="Two trackers, one record: every taka Kuddus has ever extracted from a lunchbox or a bathroom break." icon={Wallet} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="grid-cols-1 lg:grid-cols-2">
        <Tracker storageKey="ledger-tiffin" title="Tiffin Theft Tracker" unitLabel="tk" quickAmount={20} placeholder="e.g. Confiscated samosa" />
        <Tracker storageKey="ledger-washroom" title="Washroom Toll Tracker" unitLabel="tk" quickAmount={2} placeholder="e.g. Washroom toll" />
      </div>
    </div>
  );
}
