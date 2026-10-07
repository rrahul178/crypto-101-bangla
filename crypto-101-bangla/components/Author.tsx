import Image from "next/image";

export default function Author() {
  return (
    <section id="author" className="mx-auto max-w-4xl px-5 py-16">
      <div className="card grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-display text-3xl font-extrabold">Rahul Acharjee</h2>
          <p className="mt-1 text-lg font-semibold text-saffron">Crypto &amp; Forex Analyst since 2016</p>
          <p className="mt-1 text-mist">Market Researcher • AI Educator • Digital Asset Researcher</p>
          <p className="mt-4 max-w-xl">
            Exploring markets, price action, risk management and the future of AI-powered learning.
          </p>
          <a href="https://t.me/rrahul178" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Telegram-এ যান</a>
        </div>
        <div className="mx-auto text-center">
          <div className="overflow-hidden rounded-2xl bg-white p-2">
            <Image src="/telegram-qr.png" alt="Rahul Acharjee-র Telegram QR code" width={200} height={198} />
          </div>
          <p className="mt-3 text-sm text-mist">Telegram-এ যোগাযোগ করতে<br />QR code scan করুন</p>
        </div>
      </div>
    </section>
  );
}
