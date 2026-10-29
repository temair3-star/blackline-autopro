import hero from "@/assets/hero.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { contacts } from "@/data/site";
import { useBooking } from "./booking-context";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <img
        src={hero.url}
        alt="Чёрный седан с глянцевым кузовом в тёмном зале"
        width={2000}
        height={1333}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-bottom" />

      <div className="container-site flex flex-1 items-end pb-12 pt-32 sm:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Автомойка и детейлинг</p>
          <h1 className="mt-4 text-[2.75rem] font-bold leading-[0.98] sm:text-6xl lg:text-[5.25rem]">
            Чистота,
            <br />
            которую видно
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Моем, чистим и полируем без спешки. Профессиональная химия и мастера, которые показывают
            результат до выдачи ключей.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="lime" size="xl" onClick={() => openBooking()}>
              Записаться
            </Button>
            <Button variant="line" size="xl" asChild>
              <a href="#pricing">Посмотреть цены</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background/70 backdrop-blur">
        <dl className="container-site grid gap-4 py-5 text-sm sm:grid-cols-3 sm:gap-8">
          <div>
            <dt className="text-muted-foreground">Адрес · демо</dt>
            <dd className="mt-1 font-medium">{contacts.address}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Часы работы · пример</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {contacts.hours.map((h) => `${h.days} ${h.time}`).join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Телефон · демо</dt>
            <dd className="mt-1">
              <a href={contacts.phoneHref} className="font-medium tabular-nums hover:text-primary">
                {contacts.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
