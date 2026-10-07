"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { modules } from "@/data/modules";

const KEY = "c101-done";

export default function Course() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
  }, []);
  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
    setDone(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  const pct = Math.round((done.length / modules.length) * 100);
  return (
    <section id="course" className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="font-display text-3xl font-bold">কোর্স মডিউল</h2>
      <p className="mt-2 text-mist">পড়া শেষ হলে মডিউলটি চিহ্নিত করুন। অগ্রগতি আপনার ব্রাউজারে সংরক্ষিত থাকে।</p>
      <div className="mt-6 flex items-center gap-4" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full bg-lagoon transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="w-24 text-sm text-mist">{done.length}/{modules.length} সম্পন্ন</span>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((m, i) => {
          const on = done.includes(m.id);
          return (
            <button key={m.id} onClick={() => toggle(m.id)} aria-pressed={on}
              className={`card text-left transition-colors hover:border-saffron ${on ? "border-lagoon" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-mist">মডিউল {i + 1}</p>
                  <h3 className="font-display text-xl font-bold">{m.title}</h3>
                  <p className="mt-1 text-mist">{m.desc}</p>
                </div>
                <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${on ? "border-lagoon bg-lagoon text-ink" : "border-line"}`}>
                  {on && <Check size={16} />}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
