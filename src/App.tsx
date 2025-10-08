import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from './components/Nav';

// ---- CONFIG ----
// Lege deine Dateien in /public/assets/ ab:
//  - btcbd-logo.png      (z.B. dein "Logo klein.png" umbenennen)
//  - btcbd-banner.gif    (dein Banner/GIF)
// Passe die Konstanten bei Bedarf an.

export default function BitcoinBirthday() {
  const thisYear = new Date().getUTCFullYear();
  const target = useMemo(() => new Date(Date.UTC(thisYear, 9, 31, 0, 0, 0)), [thisYear]); // Oct=9
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Links & Assets
  const contract = "ComingSoon"; // <- ersetzen
  const pumpUrl = "https://pump.fun/coin/YOUR_TOKEN"; // <- ersetzen
  const twitterUrl = "https://x.com/BTCBirthday_"; // gesetzt
  const telegramUrl = "https://t.me/BTCoinBirthday"; // gesetzt
  const logoUrl = "/btcbd-logo.png"; // /public/assets/btcbd-logo.png
  const heroBannerUrl = "/btcbd-banner.gif"; // /public/assets/btcbd-banner.gif

  // Intro overlay (confetti + Happy Birthday)
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-amber-500/30">
      <AnimatedBackground />
      <AnimatePresence>
        {showIntro && <IntroOverlay logoUrl={logoUrl} onDone={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Nav logo={<Logo imgSrc={logoUrl} />} twitterUrl={twitterUrl} telegramUrl={telegramUrl} />
      <TopBanner imgSrc={heroBannerUrl} />

      <main className="relative z-10 text-white">
        <Hero pumpUrl={pumpUrl} contract={contract} logoUrl={logoUrl} />
        <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} />
        <OverviewStrip pumpUrl={pumpUrl} contract={contract} twitterUrl={twitterUrl} telegramUrl={telegramUrl} />
        <Divider />

        <Section id="about" title="Celebrating the Birth of Decentralization">
          <p className="text-lg leading-relaxed text-white/90">
            <strong>Bitcoin Birthday (BTCBD)</strong> — ticker <strong>BIRTH</strong> — is a community-driven memecoin
            honoring the release of the Bitcoin Whitepaper in 2008 — the spark that ignited the entire crypto movement.
            We celebrate the origin of decentralized, borderless, censorship-resistant money with transparent, on-chain fun.
          </p>
        </Section>

        <Section id="features" title="Key Features">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { h: "Fair Launch on Solana", p: "Community-first and open to all (pump.fun / DEX-ready)." },
              { h: "Historic Tribute", p: "Honoring the 2008 Bitcoin Whitepaper — the genesis of crypto." },
              { h: "Ticker: BIRTH", p: "Name: Bitcoin Birthday (BTCBD). BIRTH plays on the birth of decentralized money." },
              { h: "Visible Burns", p: "Deflationary policy with on-chain proofs and public TX hashes." },
              { h: "Oct 31 Snapshot", p: "0.1 BTC split among 250 random eligible holders (rules yet to announe)." },
              { h: "Holder Rewards", p: "Random micro-rewards from a public pool; transparent and documented." },
            ].map((f) => (
              <li key={f.h} className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-5 shadow-sm transition hover:bg-zinc-800">
                <h3 className="mb-2 text-lg font-semibold">{f.h}</h3>
                <p className="text-white/90">{f.p}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Divider />

        <Section id="tokenomics" title="Tokenomics">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-6 shadow-sm">
              <h4 className="text-base font-semibold">Supply</h4>
              <p className="mt-1 text-white/90">Total: <strong>1,000,000,000 BTCBD</strong> </p>
              <h4 className="mt-6 text-base font-semibold">Distribution</h4>
              <ul className="mt-2 space-y-1 text-white/90">
                <li>• 90% Public / Liquidity</li>
                <li>• 2,5% Community Rewards & Giveaways</li>
                <li>• 5% Treasury & Marketing (multisig)</li>
                <li>• 2,5% Dev / Ops (6–12 month vesting)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-6 shadow-sm">
              <h4 className="text-base font-semibold">Burn Policy</h4>
              <p className="mt-1 text-white/90">
                Deflationary approach with either periodic treasury burns (simple & transparent) or a fee-pool + scheduled burns.
                All burn TX hashes are posted publicly.
              </p>
              <h4 className="mt-6 text-base font-semibold">Disclaimer</h4>
              <p className="mt-1 text-white/80">
                BIRTH is a memecoin for celebration and community fun, not financial advice. Participate at your own risk.
              </p>
            </div>
          </div>
        </Section>

        <Section id="giveaway" title="Oct 31 Snapshot & BTC Giveaway">
          <ul className="space-y-3 text-white/90">
            <li>• Snapshot: <span className="font-medium">Oct 31 (00:00 UTC)</span> — exact rules announced before 10/31.</li>
            <li>• Prize: <span className="font-medium">0.1 BTC</span> split among <span className="font-medium">250 random eligible holders</span>.</li>
            <li>• Eligibility: minimum holding threshold is: 2000 to avoid spam wallets.</li>
            <li>• Transparency: selection method and all payout TX hashes published.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={twitterUrl} className="rounded-xl border border-gray-700 px-4 py-2 text-sm hover:bg-white/10" target="_blank" rel="noreferrer">Follow Updates</a>
            <a href={telegramUrl} className="rounded-xl border border-gray-700 px-4 py-2 text-sm hover:bg-white/10" target="_blank" rel="noreferrer">Join Telegram</a>
          </div>
        </Section>

        <Divider />

        <Section id="roadmap" title="Light Roadmap (community-first)">
          <ol className="space-y-4">
            <li className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-4">
              <h4 className="font-semibold">Phase 1 — Launch & Party</h4>
              <p className="text-white/90">Fair launch on Solana, socials live, initial marketing push, publish burn policy.</p>
            </li>
            <li className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-4">
              <h4 className="font-semibold">Phase 2 — Snapshot & Giveaways</h4>
              <p className="text-white/90">Oct 31 event, random holder rewards, post all TX proofs.</p>
            </li>
            <li className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-4">
              <h4 className="font-semibold">Phase 3 — Community Growth</h4>
              <p className="text-white/90">Open proposals for burn/reward cadence, explore LP staking or periodic burns, refine docs.</p>
            </li>
          </ol>
        </Section>

        <Divider />

        <Section id="faq" title="FAQ">
          <FAQItem q="What is BTCBD / BIRTH?" a="Bitcoin Birthday (BTCBD) with ticker BIRTH is a community memecoin celebrating the birth of decentralized money — the 2008 Bitcoin Whitepaper." />
          <FAQItem q="Is this financial advice?" a="No. BTCBD is for celebration and community fun only — participate at your own risk." />
          <FAQItem q="How do burns work?" a="We publish a clear burn policy; burns are executed on-chain and TX hashes are shared publicly." />
          <FAQItem q="How does the Oct 31 Giveaway work?" a="We announce snapshot rules in advance, take a snapshot at 00:00 UTC on Oct 31, randomly select eligible holders, and post payout TXs." />
        </Section>
      </main>

      <Footer contract={contract} pumpUrl={pumpUrl} twitterUrl={twitterUrl} telegramUrl={telegramUrl} discordUrl={discordUrl} />
    </div>
  );
}

function TopBanner({ imgSrc }: { imgSrc?: string }) {
  if (!imgSrc) return null;
  return (
    <div className="relative mx-auto max-w-6xl px-4 pt-4">
      <img src={imgSrc} alt="BTCBD banner" className="w-full rounded-2xl border border-gray-700 object-cover" />
    </div>
  );
}

function Hero({ pumpUrl, contract, logoUrl }: { pumpUrl: string; contract: string; logoUrl?: string }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-14">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Celebrating the Birth of <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Decentralization</span>
          </h1>
          <p className="mt-4 text-lg text-white/90">
            A tribute to the 2008 Bitcoin Whitepaper — the origin of crypto. Clean design, transparent tokenomics, and on-chain giveaways.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={pumpUrl} className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-black shadow hover:opacity-90" target="_blank" rel="noreferrer">Buy on pump.fun</motion.a>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigator.clipboard.writeText(contract)} className="rounded-2xl border border-gray-700 px-5 py-3 text-white hover:bg-white/10">
              Copy Contract
            </motion.button>
          </div>
          <p className="mt-3 text-xs text-white/60">Contract: {contract}</p>
        </motion.div>
        <motion.div className="mx-auto w-full max-w-sm" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {logoUrl ? (
            <img src={logoUrl} alt="BTCBD logo" className="w-full rounded-2xl border border-gray-700 bg-zinc-900/70 p-4" />
          ) : (
            <CoinLogoSVG />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Countdown({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="rounded-2xl border border-gray-700 p-6 text-center shadow-sm">
        <p className="text-sm font-medium text-white/80">Countdown to Oct 31 (00:00 UTC)</p>
        <div className="mt-3 grid grid-cols-4 gap-3 sm:gap-6">
          {[{ label: "Days", v: days }, { label: "Hours", v: hours }, { label: "Minutes", v: minutes }, { label: "Seconds", v: seconds }].map((t) => (
            <div key={t.label} className="rounded-xl border border-gray-700 bg-zinc-900/70 p-4">
              <div className="text-3xl font-bold tabular-nums">{String(t.v).padStart(2, "0")}</div>
              <div className="text-xs uppercase tracking-wide text-white/60">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewStrip({ pumpUrl, contract, twitterUrl, telegramUrl }: { pumpUrl: string; contract: string; twitterUrl: string; telegramUrl: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">Contract</div>
          <div className="mt-1 truncate font-mono text-sm">{contract || "TBA"}</div>
          <button onClick={() => navigator.clipboard.writeText(contract)} className="mt-3 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm hover:bg-white/10">Copy</button>
        </div>
        <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">Trade</div>
          <a href={pumpUrl} target="_blank" rel="noreferrer" className="mt-2 block rounded-xl bg-amber-500 px-4 py-2 text-center font-semibold text-black hover:opacity-90">Buy on pump.fun</a>
          <p className="mt-2 text-xs text-white/60">Fair launch on Solana</p>
        </div>
        <div className="rounded-2xl border border-gray-700 bg-zinc-900/70 p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">Community</div>
          <div className="mt-2 flex gap-2">
            <a href={twitterUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-gray-700 px-3 py-2 text-center hover:bg-white/10">X / Twitter</a>
            <a href={telegramUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-gray-700 px-3 py-2 text-center hover:bg-white/10">Telegram</a>
          </div>
          <p className="mt-2 text-xs text-white/60">Follow for snapshot rules</p>
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Divider() {
  return <div className="mx-auto max-w-6xl px-4"><div className="h-px w-full bg-gray-700" /></div>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-gray-700">
      <button className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={() => setOpen(!open)}>
        <span className="font-medium">{q}</span>
        <span className={`transition ${open ? "rotate-180" : "rotate-0"}`}>⌄</span>
      </button>
      {open && <div className="border-t border-gray-700 bg-white/5 px-4 py-3 text-white/90">{a}</div>}
    </div>
  );
}

function Footer({ contract, pumpUrl, twitterUrl, telegramUrl, }: { contract: string; pumpUrl: string; twitterUrl: string; telegramUrl: string; }) {
  return (
    <footer className="mt-8 border-t border-gray-700 bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-2 h-8 w-8"><Logo /></div>
          <p className="text-sm text-white/80">A tribute to the origin of crypto. Built for celebration, not financial advice.</p>
        </div>
        <div>
          <h5 className="mb-2 text-sm font-semibold">Links</h5>
          <ul className="space-y-1 text-sm text-white/90">
            <li><a className="hover:underline" href="#about">About</a></li>
            <li><a className="hover:underline" href="#features">Features</a></li>
            <li><a className="hover:underline" href="#tokenomics">Tokenomics</a></li>
            <li><a className="hover:underline" href="#giveaway">Giveaway</a></li>
            <li><a className="hover:underline" href="#roadmap">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2 text-sm font-semibold">Trade</h5>
          <ul className="space-y-1 text-sm text-white/90">
            <li><a className="hover:underline" href={pumpUrl} target="_blank" rel="noreferrer">Buy on pump.fun</a></li>
            <li className="break-all">Contract: <span className="font-mono">{contract}</span></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2 text-sm font-semibold">Community</h5>
          <ul className="space-y-1 text-sm text-white/90">
            <li><a className="hover:underline" href={twitterUrl} target="_blank" rel="noreferrer">X / Twitter</a></li>
            <li><a className="hover:underline" href={telegramUrl} target="_blank" rel="noreferrer">Telegram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Bitcoin Birthday (BTCBD • BIRTH). All rights reserved.
      </div>
    </footer>
  );
}

function Logo({ imgSrc }: { imgSrc?: string }) {
  if (imgSrc) {
    return <img src={imgSrc} alt="BTCBD Logo" className="h-full w-full object-contain" />;
  }
  // Fallback SVG
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="64" r="44" fill="url(#g1)" stroke="#FDE68A" strokeWidth="3" />
      <text x="60" y="72" textAnchor="middle" fontSize="44" fontWeight="700" fill="#FDE68A" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif">₿</text>
      <polygon points="28,40 60,8 84,44" fill="#3B82F6" stroke="#FDE68A" strokeWidth="3" />
      <line x1="34" y1="36" x2="78" y2="40" stroke="#93C5FD" strokeWidth="3" />
      <circle cx="60" cy="8" r="5" fill="#F97316" stroke="#FDE68A" strokeWidth="3" />
    </svg>
  );
}

function CoinLogoSVG() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-sm">
        <defs>
          <radialGradient id="coinGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="150" fill="url(#coinGrad)" stroke="#FDE68A" strokeWidth="10" />
        <text x="200" y="230" textAnchor="middle" fontSize="140" fontWeight="800" fill="#FDE68A" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif">₿</text>
        <polygon points="120,120 200,40 270,140" fill="#3B82F6" stroke="#FDE68A" strokeWidth="8" />
        <line x1="135" y1="120" x2="255" y2="130" stroke="#93C5FD" strokeWidth="8" />
        <circle cx="200" cy="40" r="14" fill="#F97316" stroke="#FDE68A" strokeWidth="8" />
        <ellipse cx="200" cy="330" rx="110" ry="16" fill="#000" opacity="0.25" />
      </svg>
    </div>
  );
}

function AnimatedBackground() {
  // Gold-on-black animated atmosphere + floating mini coins
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {/* golden gradient fog */}
      <div className="absolute left-1/2 top-[-10%] h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/25 blur-3xl" />
      <div className="absolute left-[10%] top-[60%] h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="absolute right-[5%] top-[30%] h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl" />
      {/* animated golden grid */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,200,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,200,0,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
        initial={{ opacity: 0.25, backgroundPositionX: 0 }}
        animate={{ opacity: 0.35, backgroundPositionX: 28 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 10 }}
      />
      {/* floating coins */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <FloatingCoin key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function FloatingCoin({ index }: { index: number }) {
  const delay = (index % 5) * 0.8;
  const x = ["10%", "25%", "40%", "60%", "75%", "20%", "50%", "80%"][index % 8];
  const size = [36, 28, 32, 24, 30, 26, 34, 22][index % 8];
  return (
    <motion.div
      className="absolute"
      style={{ left: x }}
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: "-10%", opacity: 0.9 }}
      transition={{ duration: 18 + (index % 4) * 3, delay, repeat: Infinity }}
    >
      <div className="opacity-70">
        <MiniCoin size={size} />
      </div>
    </motion.div>
  );
}

function MiniCoin({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="miniCoin" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFD27A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#miniCoin)" stroke="#FDE68A" strokeWidth="4" />
      <text x="32" y="40" textAnchor="middle" fontSize="28" fontWeight="800" fill="#FDE68A" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif">₿</text>
    </svg>
  );
}

// INTRO OVERLAY with close button (×)
function IntroOverlay({ logoUrl, onDone }: { logoUrl?: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 3600); // auto-close ~3.6s
    return () => clearTimeout(t);
  }, [onDone]);

  const pieces = Array.from({ length: 80 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Close button (clean + mobile friendly) */}
      <button
        onClick={onDone}
        className="absolute left-4 top-4 text-3xl font-light text-white/80 hover:text-white focus:outline-none transition"
        aria-label="Close intro"
      >
        ×
      </button>

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((i) => {
          const left = 5 + (i * 12.3) % 90;
          const delay = (i % 10) * 0.12;
          const duration = 2.5 + (i % 5) * 0.25;
          const size = 6 + (i % 6);
          return (
            <motion.span
              key={i}
              className="absolute block rounded"
              style={{ left: `${left}%`, top: "-10%", width: size, height: size, backgroundColor: i % 3 ? "#FDE68A" : "#F59E0B" }}
              initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
              animate={{ y: "110vh", rotate: 360, opacity: 1 }}
              transition={{ duration, delay, ease: "easeOut" }}
            />
          );
        })}
      </div>

      {/* Center content */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt="BTCBD logo"
            className="mx-auto mb-4 h-28 w-28 rounded-xl border border-gray-700 bg-zinc-900/70 p-2"
          />
        )}
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Happy Birthday</h2>
        <p className="mt-1 text-white/70">Bitcoin Birthday • Ticker: BIRTH</p>
      </motion.div>
    </motion.div>
  );
}
