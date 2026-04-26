"use client";

/**
 * HeroSection — главная секция с именем, подзаголовком
 * и иллюстрацией Эйнштейна.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import Photo from "../app/6c8dd94b9736eef1f0e60303828ce00f.jpg";

// Анимации для элементов hero
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-6 pt-24 pb-16 z-10 overflow-hidden"
    >
      {/* Верхняя подпись */}
      <motion.div {...fadeUp(0.2)} className="mb-8 text-center">
        <span
          className="font-mono text-xs tracking-widest uppercase text-muted
                     border border-sepia/30 px-4 py-1.5 rounded-full"
        >
          Нобелевский лауреат · Физик · Гений
        </span>
      </motion.div>

      {/* Основной заголовок */}
      <motion.h1
        {...fadeUp(0.35)}
        className="font-serif text-center leading-none mb-2
                   text-5xl sm:text-7xl md:text-8xl lg:text-[9rem]
                   tracking-tight text-ink"
      >
        Альберт
      </motion.h1>

      {/* Изображение между словами имени */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-2 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72
                   rounded-full overflow-hidden border-4 border-sepia/20
                   shadow-2xl shadow-ink/10"
      >
        {/* Einstein illustration */}
        <Image
          src={Photo}
          alt="Альберт Эйнштейн"
          fill
          className="object-cover grayscale contrast-110"
          priority
        />
        {/* Золотой оверлей */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent mix-blend-multiply" />
      </motion.div>

      <motion.h1
        {...fadeUp(0.5)}
        className="font-serif text-center leading-none mb-8
                   text-5xl sm:text-7xl md:text-8xl lg:text-[9rem]
                   tracking-tight text-ink"
      >
        Эйнштейн
      </motion.h1>

      {/* Годы жизни */}
      <motion.div {...fadeUp(0.65)} className="flex items-center gap-4 mb-8">
        <div className="h-px w-16 bg-sepia/40" />
        <span className="font-mono text-sm text-muted tracking-widest">
          1879 — 1955
        </span>
        <div className="h-px w-16 bg-sepia/40" />
      </motion.div>

      {/* Подзаголовок о Нобелевской премии */}
      <motion.p
        {...fadeUp(0.75)}
        className="font-sans text-center text-muted max-w-xl
                   text-base sm:text-lg leading-relaxed mb-12"
      >
        Лауреат{" "}
        <span className="text-gold font-medium">
          Нобелевской премии по физике 1921 года
        </span>{" "}
        за открытие закона фотоэлектрического эффекта — фундаментального
        явления, давшего рождение квантовой механике.
      </motion.p>

      {/* Формула E=mc² */}
      <motion.div
        {...fadeUp(0.9)}
        className="font-serif text-3xl sm:text-4xl text-sepia
                   border-b border-sepia/30 pb-2 tracking-wide italic"
      >
        E = mc²
      </motion.div>

      {/* Стрелка вниз */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-sepia/60 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
