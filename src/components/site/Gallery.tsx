import seat from "@/assets/gallery-seat.jpg.asset.json";
import before from "@/assets/creta-before.jpg.asset.json";
import after from "@/assets/creta-after.jpg.asset.json";
import foam from "@/assets/gallery-foam.jpg.asset.json";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function Photo({ src, alt, caption, className }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={cn("relative overflow-hidden rounded-sm bg-card", className)}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      <figcaption className="absolute bottom-3 left-3 bg-background/80 px-2 py-1 text-xs font-medium">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="section-y scroll-mt-16 lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          title="До и после"
          description="Потяните шторку на фото, чтобы сравнить. Снимки на сайте демонстрационные — заменим на ваши работы."
        />

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <figure>
              <BeforeAfter
                before={before.url}
                after={after.url}
                beforeAlt="Грязный кроссовер после поездки по бездорожью"
                afterAlt="Тот же кроссовер после мойки — чистый кузов, стёкла и диски"
                className="aspect-[3/2]"
              />
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Комплексная мойка после бездорожья
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:pb-8">
            <Photo
              src={seat.url}
              alt="Сиденье автомобиля до и после химчистки"
              caption="Химчистка сиденья: до / после"
              className="aspect-[3/2] lg:aspect-auto"
            />
            <Photo
              src={foam.url}
              alt="Автомобиль покрыт активной пеной"
              caption="Бесконтактная мойка"
              className="aspect-[3/2] lg:aspect-auto"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
