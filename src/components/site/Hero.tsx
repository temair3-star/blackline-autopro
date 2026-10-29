import { ArrowDown, ArrowRight } from "lucide-react";

import hero from "@/assets/hero.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { useBooking } from "./booking-context";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <img
        src={hero.url}
        alt="Чёрный седан с глянцевым кузовом в тёмном зале"
        width={2000}
        height={1333}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full animate-slow-zoom object-cover object-[70%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-bottom" />

      <div className="container-site pb-16 pt-32 sm:pb-24 lg:pb-32">
        <div className="max-w-3xl">
          <span className="eyebrow animate-fade-up">Автомойка и детейлинг</span>
          <h1
            className="mt-6 animate-fade-up text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-[5.5rem]"
            style={{ animationDelay: "120ms" }}
          >
            Чистота, <br className="hidden sm:block" />
            которую <span className="text-primary">видно</span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Бережно моем, чистим и полируем автомобили. Профессиональная химия, внимательные
            мастера и результат, который заметен с первого взгляда.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Button variant="lime" size="xl" asChild>
              <a href="#services">
                Выбрать услугу
                <ArrowRight />
              </a>
            </Button>
            <Button variant="line" size="xl" onClick={() => openBooking()}>
              Записаться
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Прокрутить к услугам"
        className="absolute bottom-8 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary lg:flex"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
