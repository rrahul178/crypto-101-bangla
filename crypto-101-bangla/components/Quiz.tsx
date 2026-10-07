"use client";
import { useState } from "react";
import { quiz } from "@/data/modules";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = i >= quiz.length;
  const q = quiz[i];

  const choose = (n: number) => {
    if (pick !== null) return;
    setPick(n);
    if (n === q.a) setScore((s) => s + 1);
  };
  const next = () => { setPick(null); setI((x) => x + 1); };
  const reset = () => { setI(0); setPick(null); setScore(0); };

  return (
    <section id="quiz" className="mx-auto max-w-3xl px-5 py-16">
      <h2 className="font-display text-3xl font-bold">নিজেকে যাচাই করুন</h2>
      <div className="card mt-6" aria-live="polite">
        {finished ? (
          <div>
            <p className="font-display text-2xl font-bold">আপনার স্কোর: {score}/{quiz.length}</p>
            <p className="mt-2 text-mist">{score >= 4 ? "দারুণ! মূল ধারণাগুলো আপনার ভালোভাবে আয়ত্তে।" : "যেসব প্রশ্নে ভুল হয়েছে, সেই মডিউল আবার পড়ে দেখুন।"}</p>
            <button onClick={reset} className="btn-primary mt-5">আবার চেষ্টা করুন</button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-mist">প্রশ্ন {i + 1}/{quiz.length}</p>
            <h3 className="mt-1 text-xl font-semibold">{q.q}</h3>
            <div className="mt-4 grid gap-3">
              {q.o.map((o, n) => {
                const state = pick === null ? "border-line hover:border-saffron" : n === q.a ? "border-lagoon bg-lagoon/10" : n === pick ? "border-alert bg-alert/10" : "border-line opacity-60";
                return <button key={n} onClick={() => choose(n)} className={`rounded-lg border px-4 py-3 text-left transition-colors ${state}`}>{o}</button>;
              })}
            </div>
            {pick !== null && (
              <div className="mt-4">
                <p className="text-mist">{q.why}</p>
                <button onClick={next} className="btn-primary mt-4">{i + 1 === quiz.length ? "ফলাফল দেখুন" : "পরের প্রশ্ন"}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
