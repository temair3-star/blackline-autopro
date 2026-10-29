import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  title: ReactNode;
  description?: string;
  className?: string;
  aside?: ReactNode;
}

export function SectionHeading({ title, description, className, aside }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 grid gap-5 border-t border-border pt-6 lg:mb-14 lg:grid-cols-[1fr_1fr] lg:gap-16",
        className,
      )}
    >
      <h2 className="text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">{title}</h2>
      {description || aside ? (
        <div className="flex flex-col gap-6 lg:pt-2">
          {description ? (
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
          {aside}
        </div>
      ) : null}
    </Reveal>
  );
}
