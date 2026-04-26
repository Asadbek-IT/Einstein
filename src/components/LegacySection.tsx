"use client";

/**
 * LegacySection — сетка научных достижений Эйнштейна.
 * Каждая карточка анимируется при скролле.
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Waves, Zap, Microscope, Star, Globe, FlaskConical } from "lucide-react";

// ────────────────────────────────────────────
// Данные достижений
// ────────────────────────────────────────────
const achievements = [
  {
    icon: Globe,
    year: "1915",
    title: "Общая теория относительности",
    description:
      "Революционная теория гравитации, переосмыслившая пространство и время как единое четырёхмерное пространство-время, искажаемое массой.",
    formula: "Gμν + Λgμν = 8πTμν",
  },
  {
    icon: Zap,
    year: "1905",
    title: "Фотоэлектрический эффект",
    description:
      "Объяснение того, как свет выбивает электроны из металла квантами. Именно это открытие принесло Нобелевскую премию 1921 года.",
    formula: "E = hν",
  },
  {
    icon: Waves,
    year: "1905",
    title: "Специальная теория относительности",
    description:
      "Постулаты о постоянстве скорости света и относительности движения, перевернувшие классическую механику Ньютона.",
    formula: "t' = γ(t − vx/c²)",
  },
  {
    icon: Microscope,
    year: "1905",
    title: "Броуновское движение",
    description:
      "Математическое описание хаотичного движения частиц в жидкости, доказавшее существование атомов и молекул.",
    formula: "⟨x²⟩ = 2Dt",
  },
  {
    icon: Star,
    year: "1917",
    title: "Космологическая постоянная",
    description:
      "Введение в уравнения поля лямбда-члена, описывающего «тёмную энергию» и ускоренное расширение Вселенной.",
    formula: "Λ ≈ 10⁻⁵² м⁻²",
  },
  {
    icon: FlaskConical,
    year: "1924",
    title: "Конденсат Бозе-Эйнштейна",
    description:
      "Предсказание нового состояния вещества при сверхнизких температурах — квантового конденсата, подтверждённого в 1995 году.",
    formula: "n₀/N = 1 − (T/Tc)³ᐟ²",
  },
];

// Анимация карточки
function AchievementCard({
  item,
  index,
}: {
  item: (typeof achievements)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-sepia/20 p-8 bg-cream/60
                 hover:border-gold/40 hover:bg-cream/90
                 transition-all duration-500 cursor-default"
    >
      {/* Угловой акцент */}
      <div
        className="absolute top-0 left-0 w-6 h-6 border-t border-l
                   border-gold/0 group-hover:border-gold/60 transition-all duration-500"
      />
      <div
        className="absolute bottom-0 right-0 w-6 h-6 border-b border-r
                   border-gold/0 group-hover:border-gold/60 transition-all duration-500"
      />

      {/* Иконка и год */}
      <div className="flex items-start justify-between mb-6">
        <Icon
          size={28}
          strokeWidth={1.2}
          className="text-sepia group-hover:text-gold transition-colors duration-300"
        />
        <span className="font-mono text-xs text-muted tracking-widest">{item.year}</span>
      </div>

      {/* Заголовок */}
      <h3 className="font-serif text-xl text-ink mb-3 leading-tight">
        {item.title}
      </h3>

      {/* Описание */}
      <p className="font-sans text-sm text-muted leading-relaxed mb-6">
        {item.description}
      </p>

      {/* Формула */}
      <div
        className="font-mono text-xs text-sepia/70 group-hover:text-gold/80
                   transition-colors duration-300 pt-4 border-t border-sepia/15"
      >
        {item.formula}
      </div>
    </motion.div>
  );
}

export default function LegacySection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="legacy" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Заголовок секции */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">
            Научное наследие
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink mb-6">
            Открытия, изменившие мир
          </h2>
          <div className="w-12 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Сетка достижений */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px
                        border border-sepia/20 bg-sepia/20">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
