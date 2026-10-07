"use client";
import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COINS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];
const FRAMES = [
  { id: "1m", label: "১ মিনিট" },
  { id: "15m", label: "১৫ মিনিট" },
  { id: "1h", label: "১ ঘণ্টা" },
  { id: "1d", label: "১ দিন" },
];
// শুধু পাবলিক market data; কোনো API key লাগে না
const REST = ["https://data-api.binance.vision", "https://api.binance.com"];

type Pt = { t: number; c: number };

async function rest(path: string) {
  let err: unknown;
  for (const base of REST) {
    try {
      const r = await fetch(base + path);
      if (r.ok) return r.json();
      err = new Error(String(r.status));
    } catch (e) { err = e; }
  }
  throw err;
}

const fmtPrice = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: n < 1 ? 5 : 2 });

export default function LiveChart() {
  const [sym, setSym] = useState("BTCUSDT");
  const [frame, setFrame] = useState("15m");
  const [data, setData] = useState<Pt[]>([]);
  const [change, setChange] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "error">("loading");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    let dead = false;
    setStatus("loading");
    (async () => {
      try {
        const [k, t] = await Promise.all([
          rest(`/api/v3/klines?symbol=${sym}&interval=${frame}&limit=100`),
          rest(`/api/v3/ticker/24hr?symbol=${sym}`),
        ]);
        if (dead) return;
        setData(k.map((x: (string | number)[]) => ({ t: Number(x[0]), c: parseFloat(String(x[4])) })));
        setChange(parseFloat(t.priceChangePercent));
        setStatus("live");
      } catch { if (!dead) setStatus("error"); }
    })();

    const s = new WebSocket(`wss://stream.binance.com:9443/ws/${sym.toLowerCase()}@kline_${frame}`);
    ws.current = s;
    s.onmessage = (e) => {
      const k = JSON.parse(e.data).k;
      if (!k) return;
      const pt = { t: k.t as number, c: parseFloat(k.c) };
      setData((d) => {
        if (!d.length) return d;
        const last = d[d.length - 1];
        return last.t === pt.t ? [...d.slice(0, -1), pt] : [...d.slice(-99), pt];
      });
    };
    return () => { dead = true; s.close(); };
  }, [sym, frame]);

  const price = data.length ? data[data.length - 1].c : null;
  const up = (change ?? 0) >= 0;
  const timeFmt = (t: number) => new Date(t).toLocaleString("bn-BD", frame === "1d" ? { day: "numeric", month: "short" } : { hour: "2-digit", minute: "2-digit" });

  return (
    <section id="live" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="font-display text-3xl font-bold">Binance লাইভ চার্ট</h2>
      <p className="mt-2 max-w-2xl text-mist">Binance-এর পাবলিক market data থেকে সরাসরি দাম। এটি শেখার জন্য, কেনাবেচার সংকেত নয়।</p>
      <div className="card mt-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Coin বাছাই">
          {COINS.map((c) => (
            <button key={c} onClick={() => setSym(c)} aria-pressed={sym === c}
              className={`rounded-lg border px-3 py-1.5 text-sm ${sym === c ? "border-saffron bg-saffron text-ink" : "border-line text-mist hover:border-saffron"}`}>
              {c.replace("USDT", "")}/USDT
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-4xl font-extrabold">{price !== null ? `$${fmtPrice(price)}` : "—"}</p>
            {change !== null && <p className={up ? "text-lagoon" : "text-alert"}>২৪ ঘণ্টায় {up ? "+" : ""}{change.toFixed(2)}%</p>}
          </div>
          <div className="flex gap-2" role="group" aria-label="সময়কাল">
            {FRAMES.map((f) => (
              <button key={f.id} onClick={() => setFrame(f.id)} aria-pressed={frame === f.id}
                className={`rounded-lg border px-3 py-1.5 text-sm ${frame === f.id ? "border-lagoon text-lagoon" : "border-line text-mist hover:border-lagoon"}`}>{f.label}</button>
            ))}
          </div>
        </div>
        <div className="mt-4 h-72">
          {status === "error" ? (
            <p className="grid h-full place-items-center text-center text-mist">Binance থেকে data আনা যায়নি। ইন্টারনেট দেখুন, অথবা কিছুক্ষণ পরে আবার চেষ্টা করুন। কিছু দেশ/নেটওয়ার্কে Binance API বন্ধ থাকতে পারে।</p>
          ) : (
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={up ? "#3FB8AF" : "#F0697A"} stopOpacity={0.35} /><stop offset="100%" stopColor={up ? "#3FB8AF" : "#F0697A"} stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="#262E55" vertical={false} />
                <XAxis dataKey="t" tickFormatter={timeFmt} stroke="#A9B1D6" tick={{ fontSize: 12 }} minTickGap={40} />
                <YAxis domain={["auto", "auto"]} orientation="right" stroke="#A9B1D6" tick={{ fontSize: 12 }} width={70} tickFormatter={(v: number) => fmtPrice(v)} />
                <Tooltip labelFormatter={(t: number) => new Date(t).toLocaleString("bn-BD")} formatter={(v: number) => [`$${fmtPrice(v)}`, "দাম"]} contentStyle={{ background: "#151B36", border: "1px solid #262E55", borderRadius: 8 }} />
                <Area type="monotone" dataKey="c" stroke={up ? "#3FB8AF" : "#F0697A"} strokeWidth={2} fill="url(#g)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-sm text-mist">উৎস: Binance পাবলিক API। {status === "live" ? "সংযুক্ত, দাম নিজে থেকে হালনাগাদ হচ্ছে।" : status === "loading" ? "লোড হচ্ছে…" : ""}</p>
      </div>
    </section>
  );
}
