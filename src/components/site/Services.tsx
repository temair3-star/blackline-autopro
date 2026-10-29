import { ArrowUpRight, Clock } from "lucide-react";

import { formatPrice, services, type Service } from "@/data/site";
import { useBooking } from "./booking-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ServiceCard({ service }: { service: Service }) {
  const { openBooking } = useBooking();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          width={1000}
          height={750}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-card-image" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          <Clock className="h-3.5 w-3.5 text-primary" />
          {service.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">Примерная цена</p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              от {formatPrice(service.priceFrom)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking(service.id)}
            aria-label={`Записаться: ${service.title}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-300 hover:rotate-45 hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="section-y scroll-mt-16 lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Услуги"
          title="Уход за автомобилем без компромиссов"
          description="Выберите услугу — точную стоимость назовём после осмотра автомобиля."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
