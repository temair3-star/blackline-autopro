import { Button } from "@/components/ui/button";
import { carClasses, formatPrice, priceList } from "@/data/site";
import { useBooking } from "./booking-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pricing() {
  const { openBooking } = useBooking();

  const bookLink = (id: (typeof priceList)[number]["id"], title: string) => (
    <button
      type="button"
      onClick={() => openBooking(id)}
      aria-label={`Записаться: ${title}`}
      className="text-sm font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
    >
      Записаться
    </button>
  );

  return (
    <section id="pricing" className="section-y scroll-mt-16 bg-graphite lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          title="Цены"
          description="Цены примерные: зависят от размера и состояния автомобиля. Итоговую стоимость согласуем до начала работ."
        />

        <Reveal>
          {/* Таблица для планшетов и компьютеров */}
          <table className="hidden w-full border-collapse text-left md:table">
            <thead>
              <tr className="border-b border-foreground/30 text-sm text-muted-foreground">
                <th scope="col" className="py-3 pr-6 font-medium">
                  Услуга
                </th>
                {carClasses.map((c) => (
                  <th key={c.id} scope="col" className="py-3 pr-6 text-right font-medium">
                    {c.label}
                  </th>
                ))}
                <th scope="col" className="py-3">
                  <span className="sr-only">Запись</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <span className="block text-base font-semibold lg:text-lg">{item.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>
                  </th>
                  {carClasses.map((c) => (
                    <td
                      key={c.id}
                      className="whitespace-nowrap py-5 pr-6 text-right tabular-nums lg:text-lg"
                    >
                      {formatPrice(item.prices[c.id])}
                    </td>
                  ))}
                  <td className="py-5 text-right">{bookLink(item.id, item.title)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Список для телефонов */}
          <ul className="border-t border-foreground/30 md:hidden">
            {priceList.map((item) => (
              <li key={item.id} className="border-b border-border py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-normal">{item.title}</h3>
                  {bookLink(item.id, item.title)}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  {carClasses.map((c) => (
                    <div key={c.id}>
                      <dt className="text-xs text-muted-foreground">{c.label}</dt>
                      <dd className="mt-0.5 font-medium tabular-nums">
                        {formatPrice(item.prices[c.id])}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            Не знаете, что выбрать? Посмотрим машину и подскажем.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="line" size="pill" onClick={() => openBooking("consult")}>
              Нужна консультация
            </Button>
            <Button variant="lime" size="pill" onClick={() => openBooking()}>
              Записаться
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
