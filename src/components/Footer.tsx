"use client";

/**
 * Footer — подвал страницы с «релятивистским» декоративным элементом.
 * Спираль Minkowski напоминает о пространстве-времени.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, BookOpen, ExternalLink } from "lucide-react";

const links = [
  {
    icon: BookOpen,
    label: "Нобелевский архив",
    href: "https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/",
  },
  {
    icon: ExternalLink,
    label: "Princeton IAS",
    href: "https://www.ias.edu/",
  },
  {
    icon: Github,
    label: "Исходный код",
    href: "#",
  },
];

// SVG — упрощённая диаграмма Минковского / конус светового конуса
function MinkowskiDiagram() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-40 h-40 opacity-20"
      aria-hidden="true"
    >
      {/* Оси */}
      <line x1="100" y1="10" x2="100" y2="190" stroke="#8B7355" strokeWidth="0.8" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="#8B7355" strokeWidth="0.8" />

      {/* Световые конусы */}
      <line x1="100" y1="100" x2="190" y2="10" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="100" y1="100" x2="10" y2="10" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="100" y1="100" x2="190" y2="190" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="100" y1="100" x2="10" y2="190" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" />

      {/* Гиперболы */}
      <ellipse cx="100" cy="100" rx="40" ry="16" stroke="#8B7355" strokeWidth="0.6" fill="none" />
      <ellipse cx="100" cy="100" rx="16" ry="40" stroke="#8B7355" strokeWidth="0.6" fill="none" />

      {/* Центральная точка */}
      <circle cx="100" cy="100" r="2.5" fill="#C9A84C" />

      {/* Подписи */}
      <text x="104" y="16" fontSize="10" fill="#8B7355" fontFamily="monospace">ct</text>
      <text x="180" y="96" fontSize="10" fill="#8B7355" fontFamily="monospace">x</text>
    </svg>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="relative z-10 border-t border-sepia/20 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Верхняя часть */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Логотип / имя */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl text-ink mb-3">
              Альберт
              <br />
              Эйнштейн
            </h3>
            <p className="font-mono text-xs text-muted tracking-wider">
              1879 — 1955
            </p>
          </motion.div>

          {/* Ссылки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-6">
              Ресурсы
            </p>
            <div className="flex flex-col gap-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted hover:text-gold
                               transition-colors duration-200 group"
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.5}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="font-sans text-sm">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Диаграмма Минковского */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-start md:items-end"
          >
            <MinkowskiDiagram />
            <p className="font-mono text-xs text-muted/60 mt-2 tracking-wider">
              Диаграмма Минковского
            </p>
          </motion.div>
        </div>

        {/* Нижняя полоса */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-8 border-t border-sepia/15
                     flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-mono text-xs text-muted/60 tracking-wider">
            © 2025 · Все права принадлежат Эйнштейну — вне зависимости от
            системы отсчёта
          </p>
          <p className="font-mono text-xs text-muted/40 tracking-widest uppercase">
            E = mc² · hν · 8πTμν
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
