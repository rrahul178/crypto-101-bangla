"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const KEY = "c101-done";

export default function CompleteButton({ id }: { id: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try { setOn((JSON.parse(localStorage.getItem(KEY) || "[]") as string[]).includes(id)); } catch {}
  }, [id]);
  const toggle = () => {
    try {
      const cur = JSON.parse(localStorage.getItem(KEY) || "[]") as string[];
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setOn(!on);
  };
  return (
    <button onClick={toggle} aria-pressed={on} className={on ? "btn bg-lagoon text-ink" : "btn-primary"}>
      {on ? <><Check size={18} className="mr-2" />সম্পন্ন হয়েছে</> : "পড়া শেষ, সম্পন্ন চিহ্নিত করুন"}
    </button>
  );
}
