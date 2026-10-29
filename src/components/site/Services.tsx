import { formatPrice, services, type Service } from "@/data/site";
import { useBooking } from "./booking-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ServiceItem({ service }: { service: Service }) {
  const { openBooking } = useBooking();

  return (
    <article className="flex h-full flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-card">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          width={1000}
          height={750}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="shrink-0 text-sm text-muted-foreground">{service.duration}</p>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <p className="font-semibold tabular-nums">от {formatPrice(service.priceFrom)}</p>
        <button
          type="button"
          onClick={() => openBooking(service.id)}
          aria-label={`Записаться: ${service.title}`}
          className="text-sm font-semibold text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          Записаться
        </button>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="section-y scroll-mt-16 lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          title="Услуги"
          description="Четыре основные работы. Точную стоимость назовём после осмотра автомобиля."
        />
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60} className="h-full">
              <ServiceItem service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
