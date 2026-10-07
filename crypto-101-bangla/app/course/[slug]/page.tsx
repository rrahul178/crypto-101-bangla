import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { modules } from "@/data/modules";
import { lessons } from "@/data/lessons";
import CompleteButton from "@/components/CompleteButton";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = modules.find((x) => x.id === params.slug);
  return m ? { title: `${m.title} — Crypto 101 বাংলা`, description: m.desc } : {};
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const idx = modules.findIndex((m) => m.id === params.slug);
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (idx < 0 || !lesson) notFound();
  const m = modules[idx];
  const prev = modules[idx - 1], next = modules[idx + 1];

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <Link href="/#course" className="text-mist hover:text-white">← সব মডিউল</Link>
      <p className="mt-8 text-sm text-mist">মডিউল {idx + 1}/{modules.length}</p>
      <h1 className="font-display text-4xl font-extrabold">{m.title}</h1>
      <p className="mt-2 text-lg text-mist">{m.desc}</p>

      <div className="mt-10 space-y-8">
        {lesson.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl font-bold">{s.h}</h2>
            <p className="mt-2 text-lg">{s.p}</p>
          </section>
        ))}
      </div>

      <aside className="card mt-10 border-saffron">
        <h2 className="font-display text-xl font-bold">মনে রাখার বিষয়</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {lesson.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </aside>

      <p className="mt-6 text-sm text-mist">এটি শিক্ষামূলক কনটেন্ট, বিনিয়োগ বা আইনি পরামর্শ নয়। সিদ্ধান্তের আগে নিজে যাচাই করুন।</p>

      <div className="mt-8"><CompleteButton id={m.id} /></div>

      <nav className="mt-10 flex justify-between gap-4 border-t border-line pt-6">
        {prev ? <Link href={`/course/${prev.id}`} className="btn-ghost">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/course/${next.id}`} className="btn-primary">{next.title} →</Link> : <Link href="/#quiz" className="btn-primary">কুইজ দিন</Link>}
      </nav>
    </main>
  );
}
