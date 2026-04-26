/**
 * Главная страница — Albert Einstein Landing Page
 * Собирает все секции в единую структуру.
 * Язык: Русский | Стиль: Ультра-минималистичный, редакционный
 */

import SpaceTimeFabric from "@/components/SpaceTimeFabric";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LegacySection from "@/components/LegacySection";
import TimelineSection from "@/components/TimelineSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Зернистый оверлей для текстуры */}
      <div className="grain" aria-hidden="true" />

      {/* Интерактивный фон — пространство-время */}
      <SpaceTimeFabric />

      {/* Шапка */}
      <Header />

      {/* Основной контент */}
      <main>
        {/* 1. Hero — имя, портрет, Нобелевская премия */}
        <HeroSection />

        {/* 2. Научное наследие — сетка достижений */}
        <LegacySection />

        {/* 3. Хронология жизни */}
        <TimelineSection />

        {/* 4. Интерактивная цитата с параллаксом */}
        <QuoteSection />
      </main>

      {/* Подвал */}
      <Footer />
    </>
  );
}
