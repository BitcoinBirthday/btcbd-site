import { Link } from "react-router-dom";
import { useState } from "react";

export default function Nav({
  logo,
  twitterUrl,
  telegramUrl,
}: {
  logo: React.ReactNode;
  twitterUrl: string;
  telegramUrl: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-700 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9">{logo}</div>
          <span className="text-lg font-semibold">Bitcoin Birthday (BIRTH)</span>
        </div>

        <nav className="flex items-center gap-2">
          {/* Übersicht (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-xl border border-gray-700 px-3 py-1.5 text-sm hover:bg-white/10"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)} // mobile: tap to toggle
            >
              Overview
              <svg width="14" height="14" viewBox="0 0 24 24" className={`transition ${open ? "rotate-180" : ""}`}>
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {/* Das Menü sitzt direkt unter dem Button: top-full + pt-2 verhindert Lücke */}
            {open && (
              <div
                role="menu"
                className="absolute left-0 top-full w-44 pt-2"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div className="overflow-hidden rounded-xl border border-gray-700 bg-black/95 shadow-xl">
                  <Link to="/" role="menuitem" className="block px-3 py-2 text-sm hover:bg-white/10">
                    Homepage
                  </Link>
                  <Link to="/history" role="menuitem" className="block px-3 py-2 text-sm hover:bg-white/10">
                    Bitcoin History
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Socials bleiben rechts */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-gray-700 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            X / Twitter
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-gray-700 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Telegram
          </a>
        </nav>
      </div>
    </header>
  );
}
