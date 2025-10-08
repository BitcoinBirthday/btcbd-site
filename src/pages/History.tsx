import { motion } from "framer-motion";
import Nav from "../components/Nav";

export default function History() {
  const twitterUrl = "https://x.com/BTCBirthday_";
  const telegramUrl = "https://t.me/BTCoinBirthday";
  const logoUrl = "/assets/btcbd-logo.png";

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // ---- CLEAN TIMELINE (ASCII only) ----
  const timeline: {
    date: string;
    title: string;
    what: string;
    why: string;
    impact: string;
    image?: string;
  }[] = [
    {
      date: "2008-10-31",
      title: "Bitcoin Whitepaper",
      what: "A nine-page document by Satoshi Nakamoto describing a peer-to-peer electronic cash system.",
      why: "Direct response to the 2008 crisis: create money that does not rely on banks or governments.",
      impact: "Introduced digital scarcity, PoW-secured consensus, and a way to prevent double-spend without a central party."
    },
    {
      date: "2009-01-03",
      title: "Genesis Block",
      what: "Block #0 is mined; it embeds the headline 'Chancellor on brink of second bailout for banks'.",
      why: "A timestamped nod to the crisis context, anchoring Bitcoin's mission in history.",
      impact: "The chain begins, proving the system works in practice."
    },
    {
      date: "2010-05-22",
      title: "Bitcoin Pizza Day",
      what: "A real-world purchase: two pizzas for 10,000 BTC.",
      why: "Shows BTC can be used beyond experiments and forums.",
      impact: "Became a cultural milestone; later framed Bitcoin's path from payment to store of value."
    },
    {
      date: "2017-08",
      title: "SegWit Activation",
      what: "A protocol upgrade separating witness data to improve capacity and malleability.",
      why: "Addresses scaling constraints and enables further innovations.",
      impact: "Opened the door for the Lightning Network and broader scaling research."
    },
    {
      date: "2021",
      title: "Legal Tender (El Salvador)",
      what: "First nation-state to adopt Bitcoin as legal tender.",
      why: "Experiment in national-level adoption and remittances.",
      impact: "Sparked debate on regulatory, economic, and technical ramifications worldwide."
    },
    {
      date: "2024+",
      title: "Maturity & Integration",
      what: "Growing custody, compliance, and integrations across finance and tech.",
      why: "Demand for hard-capped, censorship-resistant value storage persists.",
      impact: "Bitcoin continues as a macro hedge and neutral settlement layer."
    }
  ];

  const facts = [
    { h: "Whitepaper", p: "31 Oct 2008 (Satoshi Nakamoto)" },
    { h: "Genesis Block", p: "3 Jan 2009 (Block #0)" },
    { h: "Supply Cap", p: "21,000,000 BTC (fixed)" },
    { h: "Halving", p: "Every ~210,000 blocks (~4 years)" },
    { h: "Consensus", p: "Proof-of-Work (SHA-256)" },
    { h: "Ticker", p: "BTC" },
  ];

  const glossary = [
    { term: "Decentralized (Dezentralisiert)", def: "No single authority controls issuance or transactions; rules are enforced by open consensus." },
    { term: "Whitepaper", def: "The original 2008 document by Satoshi Nakamoto outlining Bitcoin's design and purpose." },
    { term: "Genesis Block", def: "The first block in the Bitcoin blockchain, mined on Jan 3, 2009." },
    { term: "Proof-of-Work", def: "Security via computational work: making history costly to rewrite and blocks expensive to forge." },
    { term: "Halving", def: "Block rewards drop by 50% roughly every 4 years, limiting new supply (programmed scarcity)." },
    { term: "Peer-to-Peer (P2P)", def: "Users transact directly without intermediaries like banks." },
    { term: "Satoshi Nakamoto", def: "The pseudonymous creator(s) of Bitcoin." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav
        logo={<img src={logoUrl} alt="BTCBD Logo" className="h-full w-full object-contain" />}
        twitterUrl={twitterUrl}
        telegramUrl={telegramUrl}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">The Birth of Bitcoin</h1>
          <p className="mt-3 text-lg text-white/90">
            How the 2008 financial collapse sparked the idea of decentralized money. From a nine-page whitepaper to a global, permissionless network.
          </p>
        </motion.div>
      </section>

      {/* Why It Was Created */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold">Why It Was Created</h2>
            <p className="mt-2 text-white/90">
              In 2008, the world saw a major financial crisis. Banks failed, governments bailed them out, and public trust collapsed.
              On October 31st, a pseudonymous figure named Satoshi Nakamoto released a whitepaper titled
              <span className="font-medium"> "Bitcoin: A Peer-to-Peer Electronic Cash System".</span>
            </p>
            <p className="mt-2 text-white/90">
              It proposed a radical idea — money governed by code and consensus, not central banks. Scarce, borderless, and censorship-resistant.
            </p>
          </div>

          {/* Key Facts */}
          <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold">Key Facts</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f.h} className="rounded-xl border border-gray-700 bg-black/40 p-4">
                  <div className="text-sm uppercase tracking-wide text-white/60">{f.h}</div>
                  <div className="mt-1 font-medium text-white">{f.p}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

 {/* Timeline – Key Moments, abwechselnd links/rechts */}
<section className="mx-auto max-w-5xl px-4 pb-16">
  <h2 className="mb-8 text-2xl font-bold tracking-tight text-center">Key Moments in Bitcoin History</h2>

  <div className="flex flex-col gap-12">
    {timeline.map((e, i) => {
      const isEven = i % 2 === 0;
      const hasImage = Boolean(e.image);

      return (
        <motion.div
          key={e.date}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col md:flex-row items-center md:gap-8 ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Text */}
          <div className={`${hasImage ? "md:w-1/2" : "md:w-full"} space-y-3`}>
            <div className="text-sm uppercase tracking-wider text-white/60">{e.date}</div>
            <h3 className="text-xl font-semibold text-amber-400">{e.title}</h3>
            <p className="text-white/90"><strong>What:</strong> {e.what}</p>
            <p className="text-white/90"><strong>Why:</strong> {e.why}</p>
            <p className="text-white/90"><strong>Impact:</strong> {e.impact}</p>
          </div>

          {/* Bild nur wenn vorhanden */}
          {hasImage && (
            <div className="md:w-1/2 mt-4 md:mt-0">
              <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-md">
                <img
                  src={e.image!}
                  alt={e.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                />
              </div>
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
</section>

      {/* Glossary */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Glossary</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {glossary.map((g) => (
            <div key={g.term} className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-5">
              <div className="text-sm font-semibold">{g.term}</div>
              <div className="mt-1 text-white/90">{g.def}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="rounded-xl border border-gray-700 px-4 py-2 text-sm hover:bg-white/10">
            ← Back to Home
          </a>
          <a
            href="https://pump.fun/coin/YOUR_TOKEN"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Join the Celebration
          </a>
        </div>
      </section>
    </div>
  );
}