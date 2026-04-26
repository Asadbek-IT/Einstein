"use client";

/**
 * Header — шапка страницы с логотипом и навигацией.
 * Логотип оставлен как placeholder-компонент для замены.
 */

import { motion } from "framer-motion";
import { Atom } from "lucide-react";

// ────────────────────────────────────────────
// LogoPlaceholder — замените этот компонент
// на ваш кастомный логотип
// ────────────────────────────────────────────
function LogoPlaceholder() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative w-8 h-8">
        <Atom
          size={32}
          className="text-sepia group-hover:text-gold transition-colors duration-300"
          strokeWidth={1.2}
        />
      </div>
      <span
        className="font-mono text-xs tracking-widest uppercase text-muted
                   group-hover:text-ink transition-colors duration-300"
      >
        {/* Ваш логотип */}
        А·Э
      </span>
    </div>
  );
}

const navLinks = [
  { label: "Наследие", href: "#legacy" },
  { label: "Хронология", href: "#timeline" },
  { label: "Цитата", href: "#quote" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6
                 flex items-center justify-between
                 border-b border-sepia/10 backdrop-blur-sm bg-cream/80"
    >
      <LogoPlaceholder />

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-xs tracking-widest uppercase text-muted
                       hover:text-ink transition-colors duration-200 line-through-text"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Год Нобелевской премии */}
      <div className="font-mono text-xs text-muted tracking-wider">
        Nobel &nbsp;<span className="text-gold">1921</span>
      </div>
    </motion.header>
  );
}
