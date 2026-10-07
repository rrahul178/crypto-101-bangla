export const modules = [
  { id: "basics", title: "Crypto Basics", desc: "Blockchain, Bitcoin ও Ethereum কী — সহজ ভাষায়।" },
  { id: "wallet", title: "Wallet ও Security", desc: "Seed phrase, hardware wallet ও phishing থেকে সুরক্ষা।" },
  { id: "markets", title: "Markets", desc: "Exchange, order type, liquidity ও volatility বোঝা।" },
  { id: "research", title: "Research পদ্ধতি", desc: "Project যাচাইয়ের ধাপ: team, product, data।" },
  { id: "tokenomics", title: "Tokenomics", desc: "Supply, unlock schedule ও token বণ্টন পড়া।" },
  { id: "scams", title: "Scam চেনা", desc: "Rug pull, fake airdrop ও Ponzi-র লক্ষণ।" },
  { id: "risk", title: "Risk Management", desc: "Position size, loss limit ও নিজের সীমা ঠিক করা।" },
  { id: "primary-market", title: "Primary Market", desc: "Launchpad, IDO/ICO ও early-stage ঝুঁকি।" },
];

export const quiz = [
  { q: "Seed phrase কার সাথে শেয়ার করা নিরাপদ?", o: ["Exchange support", "বিশ্বস্ত বন্ধু", "কারো সাথেই না", "Wallet app-এর admin"], a: 2, why: "Seed phrase হলো আপনার সব asset-এর চাবি। কোনো প্রকৃত support কখনো চায় না।" },
  { q: "Market cap কীভাবে হিসাব হয়?", o: ["Price × Circulating supply", "Price ÷ Total supply", "24h volume × Price", "Total supply − Burned"], a: 0, why: "Market cap = বর্তমান price × circulating supply।" },
  { q: "'Guaranteed 10x, মাত্র আজকের জন্য' — এটি কী সংকেত?", o: ["ভালো সুযোগ", "Scam-এর সম্ভাব্য লক্ষণ", "Exchange অফার", "Regulation-সম্মত বিজ্ঞাপন"], a: 1, why: "নিশ্চিত লাভের প্রতিশ্রুতি ও তাড়াহুড়ো — দুটোই scam-এর পরিচিত লক্ষণ।" },
  { q: "বড় team/investor unlock আসন্ন হলে সাধারণত কী হতে পারে?", o: ["Price নিশ্চিত বাড়ে", "Sell pressure বাড়তে পারে", "কোনো প্রভাব নেই", "Supply কমে"], a: 1, why: "নতুন token বাজারে এলে বিক্রির চাপ বাড়তে পারে। Unlock schedule তাই দেখা জরুরি।" },
  { q: "একটি trade-এ কতটা হারাতে পারবেন তা কখন ঠিক করবেন?", o: ["Loss হওয়ার পর", "Trade-এর আগে", "কখনোই না", "Price নামলে"], a: 1, why: "Risk management মানে ঢোকার আগেই সর্বোচ্চ loss ঠিক করা।" },
];
