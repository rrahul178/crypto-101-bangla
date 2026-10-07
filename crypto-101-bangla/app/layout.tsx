import type { Metadata } from "next";
import { Anek_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const display = Anek_Bangla({ subsets: ["bengali", "latin"], variable: "--font-display", weight: ["500", "700", "800"] });
const body = Hind_Siliguri({ subsets: ["bengali", "latin"], variable: "--font-body", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Crypto 101 বাংলা — ফ্রি ইন্টারঅ্যাক্টিভ কোর্স",
  description: "বাংলায় Crypto শিখুন: wallet security, tokenomics, scam চেনা, research ও primary market — সম্পূর্ণ ফ্রি।",
  openGraph: { title: "Crypto 101 বাংলা", description: "Crypto বুঝুন। ভুল থেকে বাঁচুন। তারপর সিদ্ধান্ত নিন।", locale: "bn_BD", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
