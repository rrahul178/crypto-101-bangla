"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// উদাহরণ — কাল্পনিক project; বাস্তব data নয়
const sample = [
  { name: "Community / Ecosystem", value: 40, color: "#3FB8AF" },
  { name: "Team", value: 20, color: "#F2B84B" },
  { name: "Investors", value: 20, color: "#F0697A" },
  { name: "Treasury", value: 15, color: "#8B95D9" },
  { name: "Liquidity", value: 5, color: "#EEF0FA" },
];

export default function Tokenomics() {
  const [team, setTeam] = useState(20);
  const data = sample.map((d) => (d.name === "Team" ? { ...d, value: team } : d.name === "Community / Ecosystem" ? { ...d, value: 60 - team } : d));
  const insiders = team + 20;
  return (
    <section id="tokenomics" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="font-display text-3xl font-bold">Tokenomics পড়তে শিখুন</h2>
      <p className="mt-2 max-w-2xl text-mist">নিচের chart একটি কাল্পনিক উদাহরণ। Team-এর অংশ বদলে দেখুন insider-দের মোট ভাগ কীভাবে বদলায়।</p>
      <div className="card mt-6 grid items-center gap-6 md:grid-cols-2">
        <div className="h-64" aria-label="Token distribution pie chart">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} stroke="none">
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "#151B36", border: "1px solid #262E55", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <label className="block">Team allocation: <b>{team}%</b>
            <input type="range" min={5} max={40} value={team} onChange={(e) => setTeam(+e.target.value)} className="mt-2 w-full accent-[#F2B84B]" />
          </label>
          <p className="mt-4">Team + Investors মোট: <b className={insiders > 50 ? "text-alert" : "text-lagoon"}>{insiders}%</b></p>
          <p className="mt-1 text-mist">{insiders > 50 ? "Insider-দের হাতে অর্ধেকের বেশি — unlock schedule ও vesting খুব ভালো করে দেখুন।" : "Insider ভাগ তুলনামূলক কম। তবু vesting ও unlock তারিখ যাচাই করুন।"}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {data.map((d) => <li key={d.name} className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: d.color }} />{d.name} — {d.value}%</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
