import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { carClasses, formatPrice, priceList, type CarClass } from "@/data/site";
import { cn } from "@/lib/utils";
import { useBooking } from "./booking-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pricing() {
  const { openBooking } = useBooking();
  const [carClass, setCarClass] = useState<CarClass>("sedan");

  return (
    <section id="pricing" className="section-y scroll-mt-16 bg-graphite lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Цены"
          title="Прозрачный прайс"
          description="Цены примерные и зависят от размера и состояния автомобиля. Итоговую стоимость согласуем до начала работ."
          aside={
            <div
              role="radiogroup"
              aria-label="Класс автомобиля"
              className="inline-flex w-full rounded-full border border-border bg-background p-1 sm:w-auto"
            >
              {carClasses.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={carClass === c.id}
                  onClick={() => setCarClass(c.id)}
                  className={cn(
                    "flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex-none sm:px-5",
                    carClass === c.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          }
        />

        <Reveal>
          <ul className="overflow-hidden rounded-3xl border border-border bg-background">
            {priceList.map((item) => (
              <li
                key={item.id}
                className="group flex flex-col gap-4 border-b border-border px-5 py-6 transition-colors last:border-b-0 hover:bg-card sm:flex-row sm:items-center sm:gap-6 sm:px-8"
              >
                <div className="flex-1">
                  <h3 className="font-sans text-base font-semibold tracking-normal sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </div>
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <p className="font-display text-xl font-bold tabular-nums sm:text-2xl">
                    <span className="mr-1 text-sm font-medium text-muted-foreground">от</span>
                    {formatPrice(item.prices[carClass])}
                  </p>
                  <button
                    type="button"
                    onClick={() => openBooking(item.id)}
                    aria-label={`Записаться: ${item.title}`}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Записаться
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-primary/30 bg-background p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-lg font-semibold sm:text-xl">Не уверены, что выбрать?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Оставьте заявку — подскажем подходящую услугу после осмотра.
            </p>
          </div>
          <Button variant="lime" size="pill" onClick={() => openBooking("consult")}>
            Получить консультацию
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
