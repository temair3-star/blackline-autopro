import { useState } from "react";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

/** Сравнение «до/после» со шторкой: перетаскивание мышью, пальцем или стрелками. */
export function BeforeAfter({ before, after, beforeAlt, afterAlt, className }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);

  return (
    <div className={`relative select-none overflow-hidden rounded-sm bg-card ${className ?? ""}`}>
      <img src={after} alt={afterAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={beforeAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-foreground" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm bg-foreground text-xs font-bold text-background">
          ⇆
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 bg-background/80 px-2 py-1 text-xs font-semibold">
        До
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-background/80 px-2 py-1 text-xs font-semibold">
        После
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Сдвиньте шторку, чтобы сравнить до и после"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
