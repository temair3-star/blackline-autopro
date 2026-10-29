import { cn } from "@/lib/utils";
import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const beforeUrl =
  "https://images.pexels.com/photos/14515713/pexels-photo-14515713.jpeg?auto=compress&cs=tinysrgb&w=1200";
const afterUrl =
  "https://images.pexels.com/photos/6872163/pexels-photo-6872163.jpeg?auto=compress&cs=tinysrgb&w=1200";
const seatUrl =
  "https://images.pexels.com/photos/5233285/pexels-photo-5233285.jpeg?auto=compress&cs=tinysrgb&w=600";
const foamUrl =
  "https://images.pexels.com/photos/6873174/pexels-photo-6873174.jpeg?auto=compress&cs=tinysrgb&w=600";
const polishUrl =
  "https://images.pexels.com/photos/14231684/pexels-photo-14231684.jpeg?auto=compress&cs=tinysrgb&w=600";
const wheelUrl =
  "https://images.pexels.com/photos/14231678/pexels-photo-14231678.jpeg?auto=compress&cs=tinysrgb&w=600";
const pressureWashUrl =
  "https://images.pexels.com/photos/6873079/pexels-photo-6873079.jpeg?auto=compress&cs=tinysrgb&w=600";
const interiorUrl =
  "https://images.pexels.com/photos/6873185/pexels-photo-6873185.jpeg?auto=compress&cs=tinysrgb&w=600";

function Photo({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
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
                before={beforeUrl}
                after={afterUrl}
                beforeAlt="Грязный внедорожник после поездки по бездорожью"
                afterAlt="Чистый автомобиль после профессиональной мойки в студии"
                className="aspect-[3/2]"
              />
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Комплексная мойка после бездорожья
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            <Photo
              src={seatUrl}
              alt="Глубокая чистка сиденья автомобиля пылесосом"
              caption="Химчистка сиденья"
              className="aspect-[3/2] lg:aspect-auto"
            />
            <Photo
              src={foamUrl}
              alt="Автомобиль покрыт активной пеной во время мойки"
              caption="Бесконтактная мойка"
              className="aspect-[3/2] lg:aspect-auto"
            />
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <Photo
              src={polishUrl}
              alt="Полировка чёрного кузова полировальной машиной"
              caption="Полировка кузова"
              className="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={60}>
            <Photo
              src={wheelUrl}
              alt="Колёсный диск в пене во время мойки"
              caption="Детальная мойка дисков"
              className="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={120}>
            <Photo
              src={pressureWashUrl}
              alt="Мастер моет чёрный автомобиль аппаратом высокого давления"
              caption="Мойка под давлением"
              className="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={180}>
            <Photo
              src={interiorUrl}
              alt="Мастер протирает интерьер автомобиля внутри"
              caption="Уход за салоном"
              className="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
