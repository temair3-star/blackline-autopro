import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="BLACKLINE — на главную"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-bold tracking-[0.08em] text-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-5 w-1.5 -skew-x-12 rounded-sm bg-primary transition-transform duration-300 group-hover:scale-y-125"
      />
      <span>
        BLACK<span className="text-primary">LINE</span>
      </span>
    </a>
  );
}
