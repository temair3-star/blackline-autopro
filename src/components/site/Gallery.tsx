import type { ReactNode } from "react";

import seat from "@/assets/gallery-seat.jpg.asset.json";
import before from "@/assets/gallery-before.jpg.asset.json";
import after from "@/assets/gallery-after.jpg.asset.json";
import foam from "@/assets/gallery-foam.jpg.asset.json";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function Tag({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur",
        accent ? "bg-primary text-primary-foreground" : "bg-background/70 text-foreground",
      )}
    >
      {children}
    </span>
  );
}

interface TileProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  caption?: string;
}

function Tile({ src, alt, className, children, caption }: TileProps) {
  return (
    <figure className={cn("group relative overflow-hidden rounded-2xl bg-card", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-card-image opacity-70" />
      {children}
      {caption ? (
        <figcaption className="absolute bottom-4 left-4 right-4 text-sm font-medium text-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="section-y scroll-mt-16 lg:scroll-mt-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Галерея"
          title="До и после"
          description="Разница, которую замечаешь сразу. Фотографии на этой странице — демонстрационные."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <Reveal className="sm:col-span-2">
            <Tile
              src={seat.url}
              alt="Сиденье автомобиля до и после химчистки"
              className="aspect-[3/2]"
              caption="Химчистка салона"
            >
              <div className="absolute left-4 top-4">
                <Tag>До</Tag>
              </div>
              <div className="absolute right-4 top-4">
                <Tag accent>После</Tag>
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={100} className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Tile
              src={foam.url}
              alt="Автомобиль покрыт активной пеной"
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full"
              caption="Мягкая бесконтактная мойка"
            />
          </Reveal>

          <Reveal delay={150}>
            <Tile
              src={before.url}
              alt="Грязный кроссовер после поездки по бездорожью"
              className="aspect-[4/3]"
              caption="Приехал после бездорожья"
            >
              <div className="absolute left-4 top-4">
                <Tag>До</Tag>
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={200}>
            <Tile
              src={after.url}
              alt="Чистый чёрный автомобиль с глянцевым кузовом"
              className="aspect-[4/3]"
              caption="Уезжает в идеальном состоянии"
            >
              <div className="absolute left-4 top-4">
                <Tag accent>После</Tag>
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
