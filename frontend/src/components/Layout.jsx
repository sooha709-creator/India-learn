import React from "react";
import { NavLink } from "react-router-dom";
import { Compass, Globe2, Gamepad2, BookMarked } from "lucide-react";

const items = [
  { to: "/", label: "Explore India", icon: Compass, testid: "nav-india" },
  { to: "/world", label: "World Explorer", icon: Globe2, testid: "nav-world" },
  { to: "/play", label: "Learn & Play", icon: Gamepad2, testid: "nav-play" },
  { to: "/passport", label: "Passport", icon: BookMarked, testid: "nav-passport" },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Top nav (desktop) */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[var(--paper)]/85 border-b border-[#F0E6CE]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2" data-testid="brand-link">
            <span className="text-2xl" aria-hidden>🧭</span>
            <span className="font-display font-bold text-lg sm:text-xl">
              MiniAtlas <span className="text-[var(--coral)]">Quest</span>
            </span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {items.map(({ to, label, icon: Icon, testid }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                data-testid={testid}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition ${
                    isActive
                      ? "bg-[var(--sky)] text-white shadow-sm"
                      : "text-[var(--navy)] hover:bg-[var(--sky-soft)]"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-28 md:pb-10 pt-4">{children}</main>

      {/* Bottom nav (mobile) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F0E6CE] shadow-[0_-6px_20px_rgba(31,59,87,0.06)]"
        aria-label="Primary mobile"
      >
        <ul className="grid grid-cols-4">
          {items.map(({ to, label, icon: Icon, testid }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                data-testid={`${testid}-mobile`}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-2.5 gap-0.5 text-[11px] font-semibold ${
                    isActive ? "text-[var(--coral)]" : "text-[var(--navy)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                        isActive ? "bg-[var(--sun)]" : "bg-[var(--sky-soft)]"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="leading-tight">{label.split(" ")[0]}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
