"use client";
import { useState } from "react";

const walletChecks = [
  "Seed phrase কাগজে/ধাতুতে লিখে অফলাইনে রেখেছি",
  "Seed phrase কখনো ছবি তুলিনি বা অনলাইনে রাখিনি",
  "Exchange ও email-এ 2FA (authenticator app) চালু আছে",
  "বড় অঙ্কের asset hardware wallet-এ রাখি",
  "Link-এ ক্লিক না করে নিজে URL লিখে/bookmark থেকে site খুলি",
  "Contract/wallet approval দেওয়ার আগে পড়ে দেখি",
];
const scamChecks = [
  "লাভের নিশ্চয়তা বা 'risk-free' দাবি করা হচ্ছে",
  "দ্রুত সিদ্ধান্তের চাপ ('আজই শেষ সুযোগ')",
  "Seed phrase বা private key চাওয়া হচ্ছে",
  "অচেনা কেউ DM-এ 'support' বা 'investment' অফার দিয়েছে",
  "নতুন সদস্য আনলে বোনাস দেওয়া হয়",
  "Team বেনামী, whitepaper অস্পষ্ট বা কপি করা",
  "Token বিক্রি করা যাচ্ছে না / withdraw আটকে আছে",
];

function Checklist({ items, checked, setChecked }: { items: string[]; checked: boolean[]; setChecked: (c: boolean[]) => void }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((t, i) => (
        <li key={i}>
          <label className="flex cursor-pointer gap-3">
            <input type="checkbox" className="mt-2 h-4 w-4 accent-[#F2B84B]" checked={checked[i]}
              onChange={() => setChecked(checked.map((c, j) => (j === i ? !c : c)))} />
            <span>{t}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function WalletScore() {
  const [c, setC] = useState(walletChecks.map(() => false));
  const score = Math.round((c.filter(Boolean).length / c.length) * 100);
  const label = score >= 83 ? "শক্তিশালী" : score >= 50 ? "মাঝারি — উন্নতি দরকার" : "দুর্বল — এখনই ঠিক করুন";
  return (
    <div className="card">
      <h3 className="font-display text-xl font-bold">Wallet Security Score</h3>
      <Checklist items={walletChecks} checked={c} setChecked={setC} />
      <p className="mt-4 text-2xl font-bold text-saffron">{score}/100 <span className="text-base font-medium text-mist">{label}</span></p>
    </div>
  );
}

function ScamCheck() {
  const [c, setC] = useState(scamChecks.map(() => false));
  const n = c.filter(Boolean).length;
  const verdict = n === 0 ? "কোনো লাল পতাকা নির্বাচন করা হয়নি।" : n <= 2 ? "সতর্ক থাকুন: আরও যাচাই না করে টাকা দেবেন না।" : "উচ্চ ঝুঁকি: এটি scam হওয়ার সম্ভাবনা অনেক। দূরে থাকুন।";
  return (
    <div className="card">
      <h3 className="font-display text-xl font-bold">Scam Detection</h3>
      <p className="text-mist">যা যা মিলছে, টিক দিন।</p>
      <Checklist items={scamChecks} checked={c} setChecked={setC} />
      <p className={`mt-4 font-semibold ${n >= 3 ? "text-alert" : n > 0 ? "text-saffron" : "text-mist"}`}>{n} লাল পতাকা — {verdict}</p>
    </div>
  );
}

function MarketCap() {
  const [price, setPrice] = useState("2");
  const [supply, setSupply] = useState("500000000");
  const [total, setTotal] = useState("1000000000");
  const p = parseFloat(price) || 0, s = parseFloat(supply) || 0, t = parseFloat(total) || 0;
  const fmt = (x: number) => x.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const field = "mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2";
  return (
    <div className="card">
      <h3 className="font-display text-xl font-bold">Market Cap Calculator</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label>Price (USD)<input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
        <label>Circulating supply<input className={field} inputMode="decimal" value={supply} onChange={(e) => setSupply(e.target.value)} /></label>
        <label>Total supply<input className={field} inputMode="decimal" value={total} onChange={(e) => setTotal(e.target.value)} /></label>
      </div>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div><dt className="text-mist">Market cap</dt><dd className="text-2xl font-bold text-saffron">${fmt(p * s)}</dd></div>
        <div><dt className="text-mist">Fully diluted valuation</dt><dd className="text-2xl font-bold text-lagoon">${fmt(p * t)}</dd></div>
      </dl>
      <p className="mt-3 text-sm text-mist">FDV Market cap-এর চেয়ে অনেক বড় হলে ভবিষ্যতে বড় token unlock আসতে পারে — বিষয়টি যাচাই করুন।</p>
    </div>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="font-display text-3xl font-bold">হাতে-কলমে টুল</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <WalletScore />
        <ScamCheck />
        <div className="lg:col-span-2"><MarketCap /></div>
      </div>
    </section>
  );
}
