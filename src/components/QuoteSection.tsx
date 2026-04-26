"use client";

/**
 * QuoteSection — интерактивная цитата с параллакс-эффектом при наведении.
 * Две слои движутся с разной скоростью, создавая глубину.
 */

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Мышиные координаты
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Плавные пружинящие значения
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  // Параллакс-трансформы для разных слоёв
  const textX = useTransform(springX, [-1, 1], [-12, 12]);
  const textY = useTransform(springY, [-1, 1], [-8, 8]);
  const bgX = useTransform(springX, [-1, 1], [8, -8]);
  const bgY = useTransform(springY, [-1, 1], [5, -5]);

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    x.set(nx);
    y.set(ny);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  }

  return (
    <section
      id="quote"
      className="relative z-10 py-32 px-6 overflow-hidden"
    >
      {/* Фоновая горизонтальная линия */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="w-full h-px bg-sepia/15" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          className="relative cursor-none select-none py-20"
        >
          {/* Кастомный курсор */}
          {isHovering && (
            <motion.div
              className="fixed pointer-events-none z-50 w-10 h-10
                         border border-gold/50 rounded-full
                         flex items-center justify-center"
              style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            />
          )}

          {/* Декоративные цифры на фоне */}
          <motion.div
            style={{ x: bgX, y: bgY }}
            className="absolute -top-4 -left-4 font-serif
                       text-[12rem] leading-none font-bold
                       text-sepia/5 pointer-events-none select-none"
          >
            "
          </motion.div>
          <motion.div
            style={{ x: bgX, y: bgY }}
            className="absolute -bottom-4 -right-4 font-serif
                       text-[12rem] leading-none font-bold
                       text-sepia/5 pointer-events-none select-none rotate-180"
          >
            "
          </motion.div>

          {/* Основная цитата */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: textX, y: textY }}
          >
            {/* Пометка */}
            <p className="font-mono text-xs tracking-widest uppercase text-muted
                          text-center mb-10">
              Слова гения
            </p>

            {/* Текст цитаты */}
            <blockquote
              className="font-serif text-2xl sm:text-3xl md:text-4xl
                         text-ink text-center leading-relaxed mb-10
                         italic font-normal"
            >
              «Воображение важнее знания. Знания ограничены, тогда как
              воображение охватывает весь мир, стимулируя прогресс, порождая
              эволюцию.»
            </blockquote>

            {/* Атрибуция */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-sepia/30" />
              <p className="font-mono text-xs tracking-widest text-muted uppercase">
                Альберт Эйнштейн, 1929
              </p>
              <div className="h-px w-16 bg-sepia/30" />
            </div>
          </motion.div>

          {/* Золотая подчёркивающая линия */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
            className="mt-16 h-px bg-gradient-to-r from-transparent
                       via-gold to-transparent mx-auto max-w-sm"
          />
        </div>

        {/* Вторая цитата — без параллакса */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16 border border-sepia/20 p-8 md:p-12"
        >
          <p
            className="font-serif text-xl sm:text-2xl text-sepia
                       italic leading-relaxed mb-6"
          >
            «Если вы не можете объяснить это просто,
            значит, вы недостаточно хорошо это понимаете.»
          </p>
          <span className="font-mono text-xs text-muted tracking-widest">— А. Эйнштейн</span>
        </motion.div>
      </div>
    </section>
  );
}
