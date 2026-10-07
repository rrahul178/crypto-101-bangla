"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
      <p className="mt-2 text-mist">মডিউলে ক্লিক করে পড়ুন, শেষ হলে গোল বাটনে চিহ্নিত করুন। অগ্রগতি আপনার ব্রাউজারে সংরক্ষিত থাকে।</p>
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
            <div key={m.id} className={`card flex items-start justify-between gap-3 ${on ? "border-lagoon" : ""}`}>
              <Link href={`/course/${m.id}`} className="group block flex-1">
                <p className="text-sm text-mist">মডিউল {i + 1}</p>
                <h3 className="font-display text-xl font-bold group-hover:text-saffron">{m.title}</h3>
                <p className="mt-1 text-mist">{m.desc}</p>
                <p className="mt-3 font-semibold text-saffron">পড়ুন →</p>
              </Link>
              <button onClick={() => toggle(m.id)} aria-pressed={on} aria-label={`${m.title} সম্পন্ন চিহ্নিত করুন`}
                className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${on ? "border-lagoon bg-lagoon text-ink" : "border-line hover:border-saffron"}`}>
                {on && <Check size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
