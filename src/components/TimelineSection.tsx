"use client";

/**
 * TimelineSection — минималистичная вертикальная хронология жизни.
 * Элементы появляются по мере прокрутки.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ────────────────────────────────────────────
// Данные хронологии
// ────────────────────────────────────────────
const events = [
  {
    year: "1879",
    title: "Рождение в Ульме",
    desc: "14 марта в Вюртемберге, Германия, в еврейской семье родился Альберт Эйнштейн.",
    highlight: false,
  },
  {
    year: "1896",
    title: "Поступление в ETH Цюрих",
    desc: "Зачислен в Швейцарскую высшую техническую школу — начало пути в большую науку.",
    highlight: false,
  },
  {
    year: "1905",
    title: "Annus Mirabilis — год чудес",
    desc: "Опубликовал четыре революционные работы: о фотоэффекте, броуновском движении, специальной теории относительности и E=mc².",
    highlight: true,
  },
  {
    year: "1909",
    title: "Профессор Цюрихского университета",
    desc: "Получил первую профессорскую должность — признание выдающегося научного вклада.",
    highlight: false,
  },
  {
    year: "1915",
    title: "Общая теория относительности",
    desc: "Завершение десятилетней работы над гравитацией — новая геометрия Вселенной.",
    highlight: true,
  },
  {
    year: "1919",
    title: "Солнечное затмение подтверждает теорию",
    desc: "Наблюдения Артура Эддингтона подтвердили отклонение света вблизи Солнца — мировая слава.",
    highlight: false,
  },
  {
    year: "1921",
    title: "Нобелевская премия по физике",
    desc: "Присуждена за открытие закона фотоэлектрического эффекта и вклад в теоретическую физику.",
    highlight: true,
  },
  {
    year: "1933",
    title: "Эмиграция в США",
    desc: "Бежал от нацистского режима. Принят в Принстонский институт перспективных исследований.",
    highlight: false,
  },
  {
    year: "1939",
    title: "Письмо Рузвельту",
    desc: "Предупредил президента о возможности создания ядерного оружия Германией — начало Манхэттенского проекта.",
    highlight: false,
  },
  {
    year: "1955",
    title: "Уход из жизни",
    desc: "18 апреля в Принстоне на 77-м году жизни скончался величайший физик XX века.",
    highlight: false,
  },
];

function TimelineItem({
  event,
  index,
  isLeft,
}: {
  event: (typeof events)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 md:gap-0 mb-12
        ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Контент */}
      <div
        className={`flex-1 pb-2
          ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}
        `}
      >
        <span
          className={`font-mono text-xs tracking-widest
            ${event.highlight ? "text-gold" : "text-muted"}`}
        >
          {event.year}
        </span>
        <h3
          className={`font-serif text-xl mt-1 mb-2
            ${event.highlight ? "text-ink" : "text-ink/80"}`}
        >
          {event.title}
        </h3>
        <p className="font-sans text-sm text-muted leading-relaxed max-w-xs
          inline-block">
          {event.desc}
        </p>
      </div>

      {/* Точка на оси */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2
                      flex-col items-center z-10 top-1">
        <div
          className={`w-3 h-3 rounded-full border-2 transition-colors duration-300
            ${event.highlight
              ? "bg-gold border-gold shadow-[0_0_12px_rgba(201,168,76,0.5)]"
              : "bg-cream border-sepia/40"
            }`}
        />
      </div>

      {/* Мобильная точка */}
      <div className="md:hidden flex-none mt-1.5">
        <div
          className={`w-2.5 h-2.5 rounded-full border-2
            ${event.highlight ? "bg-gold border-gold" : "bg-cream border-sepia/40"}`}
        />
      </div>

      {/* Пустой правый/левый блок для центровки */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function TimelineSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="timeline" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Заголовок */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">
            Хронология жизни
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink mb-6">
            Вехи великого пути
          </h2>
          <div className="w-12 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Таймлайн */}
        <div className="relative">
          {/* Центральная вертикальная линия */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0
                          w-px bg-gradient-to-b from-transparent
                          via-sepia/30 to-transparent" />

          {/* Мобильная боковая линия */}
          <div className="md:hidden absolute left-[5px] top-0 bottom-0
                          w-px bg-gradient-to-b from-transparent
                          via-sepia/30 to-transparent" />

          {events.map((event, i) => (
            <TimelineItem
              key={event.year + event.title}
              event={event}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
