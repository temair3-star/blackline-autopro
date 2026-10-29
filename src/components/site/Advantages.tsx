import { FlaskConical, Gauge, HandHeart, type LucideIcon } from "lucide-react";

import washPhoto from "@/assets/gallery-wash.jpg.asset.json";
import { Reveal } from "./Reveal";

interface Advantage {
  icon: LucideIcon;
  title: string;
  text: string;
}

const advantages: Advantage[] = [
  {
    icon: FlaskConical,
    title: "Качественные материалы",
    text: "Используем профессиональную автохимию, мягкие микрофибры и составы, безопасные для лака, кожи и пластика.",
  },
  {
    icon: HandHeart,
    title: "Внимательный подход",
    text: "Осматриваем автомобиль вместе с вами, обсуждаем задачу и показываем результат до выдачи ключей.",
  },
  {
    icon: Gauge,
    title: "Профессиональное оборудование",
    text: "Аппараты высокого давления, парогенераторы, экстракторы и полировальные машины для каждой задачи.",
  },
];

export function Advantages() {
  return (
    <section id="about" className="section-y scroll-mt-16 bg-graphite lg:scroll-mt-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <img
              src={washPhoto.url}
              alt="Мастер моет автомобиль в пене на мойке"
              loading="lazy"
              width={1000}
              height={1250}
              className="h-full w-full object-cover grayscale"
            />
            <div aria-hidden className="absolute inset-0 bg-card-image" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-xl font-semibold leading-snug sm:text-2xl">
              Каждый автомобиль — <span className="text-primary">как свой.</span>
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">О нас</span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              Почему выбирают BLACKLINE
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Мы относимся к мойке как к ремеслу: не спешим, не экономим на материалах и доводим
              результат до идеала.
            </p>
          </Reveal>

          <ul className="mt-10 flex flex-col">
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <li className="group flex gap-5 border-t border-border py-7 last:border-b">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
