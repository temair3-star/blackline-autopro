import washPhoto from "@/assets/gallery-wash.jpg.asset.json";
import { Reveal } from "./Reveal";

const advantages = [
  {
    title: "Материалы",
    text: "Профессиональная автохимия, мягкие микрофибры и составы, безопасные для лака, кожи и пластика.",
  },
  {
    title: "Подход",
    text: "Осматриваем автомобиль вместе с вами, обсуждаем задачу и показываем результат до выдачи ключей.",
  },
  {
    title: "Оборудование",
    text: "Аппараты высокого давления, парогенераторы, экстракторы и полировальные машины.",
  },
];

export function Advantages() {
  return (
    <section id="about" className="section-y scroll-mt-16 bg-graphite lg:scroll-mt-20">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[4/5]">
            <img
              src={washPhoto.url}
              alt="Мастер моет автомобиль в пене на мойке"
              loading="lazy"
              width={1000}
              height={1250}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col lg:order-2">
          <Reveal className="border-t border-border pt-6">
            <h2 className="text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">О нас</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/90">
              Мы относимся к мойке как к ремеслу: не спешим, не экономим на материалах и не
              отдаём машину, пока сами не довольны результатом.
            </p>
          </Reveal>

          <dl className="mt-10 lg:mt-auto">
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="grid gap-2 border-t border-border py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{item.title}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.text}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
