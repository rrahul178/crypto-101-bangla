import Link from "next/link";
import Course from "@/components/Course";
import Quiz from "@/components/Quiz";
import Tools from "@/components/Tools";
import Tokenomics from "@/components/Tokenomics";

const primary = [
  ["Platform যাচাই", "Launchpad বা exchange-এর নিয়ম, সময়সূচি ও ফি official source থেকে পড়ুন।"],
  ["Project যাচাই", "Team, whitepaper, audit report ও vesting পড়ুন।"],
  ["Allocation বুঝুন", "আপনি কত পাবেন, কখন lock খুলবে — আগেই জানুন।"],
  ["অঙ্ক ঠিক করুন", "যতটা হারালেও চলবে, ততটুকুই দিন। Early-stage-এ পুরো টাকাই হারানোর ঝুঁকি থাকে।"],
];

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <span className="font-display text-lg font-bold">Crypto 101 <span className="text-saffron">বাংলা</span></span>
        <nav className="flex gap-5 text-mist">
          <a href="#course" className="hover:text-white">কোর্স</a>
          <a href="#tools" className="hover:text-white">টুল</a>
          <a href="#quiz" className="hover:text-white">কুইজ</a>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-12 pt-14 sm:pt-24">
        <h1 className="font-display text-5xl font-extrabold leading-tight sm:text-7xl">
          Crypto বুঝুন।<br />ভুল থেকে বাঁচুন।<br />তারপর সিদ্ধান্ত নিন।
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mist">
          বাংলায় লেখা ফ্রি কোর্স: wallet সুরক্ষা, tokenomics, scam চেনা ও ঝুঁকি সামলানো — হাতে-কলমে টুলসহ।
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#course" className="btn-primary">ফ্রি কোর্স শুরু করুন</Link>
          <Link href="#tools" className="btn-ghost">টুল ব্যবহার করুন</Link>
        </div>
        <p className="mt-6 max-w-xl text-sm text-mist">এটি শিক্ষামূলক কনটেন্ট, বিনিয়োগ পরামর্শ নয়। Crypto-তে সম্পূর্ণ মূলধন হারানোর ঝুঁকি আছে।</p>
      </section>

      <Course />
      <Tools />
      <Tokenomics />

      <section id="primary-market" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-3xl font-bold">Primary Market: অংশ নেওয়ার আগে</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {primary.map(([t, d], i) => (
            <li key={t} className="card"><p className="text-sm text-mist">ধাপ {i + 1}</p><h3 className="font-display text-xl font-bold">{t}</h3><p className="mt-1 text-mist">{d}</p></li>
          ))}
        </ol>
      </section>

      <Quiz />

      <footer className="border-t border-line px-5 py-10 text-center text-sm text-mist">
        © Crypto 101 বাংলা — শিক্ষামূলক উদ্দেশ্যে। বাজারের তথ্য ব্যবহার করলে উৎস ও সর্বশেষ হালনাগাদের তারিখ উল্লেখ করুন।
      </footer>
    </main>
  );
}
