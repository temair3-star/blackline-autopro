import { Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contacts } from "@/data/site";
import { BookingForm } from "./BookingForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function DemoNote({ children }: { children: string }) {
  return (
    <span className="mt-1 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export function Contacts() {
  return (
    <section id="contacts" className="section-y scroll-mt-16 lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Контакты"
          title="Приезжайте — сделаем красиво"
          description="Позвоните или оставьте заявку, и мы подберём удобное время."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-10">
            <ul className="flex flex-col gap-8">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="mt-1 text-lg font-semibold">{contacts.address}</p>
                  <DemoNote>{contacts.addressNote}</DemoNote>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Часы работы</p>
                  <dl className="mt-1 space-y-1">
                    {contacts.hours.map((h) => (
                      <div key={h.days} className="flex max-w-xs justify-between gap-6 text-lg">
                        <dt className="font-semibold">{h.days}</dt>
                        <dd className="tabular-nums text-foreground">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <DemoNote>{contacts.hoursNote}</DemoNote>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <a
                    href={contacts.phoneHref}
                    className="mt-1 block font-display text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
                  >
                    {contacts.phoneDisplay}
                  </a>
                  <DemoNote>{contacts.phoneNote}</DemoNote>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-border pt-8 lg:mt-auto">
              <Button variant="line" size="xl" className="w-full sm:w-auto" asChild>
                <a href={contacts.phoneHref}>
                  <Phone />
                  Позвонить нам
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              id="booking"
              className="h-full scroll-mt-24 rounded-3xl border border-primary/30 bg-card p-6 sm:p-10"
            >
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
