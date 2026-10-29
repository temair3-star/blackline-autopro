import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="BLACKLINE — на главную"
      className={cn(
        "inline-flex items-center gap-2.5 text-lg font-extrabold tracking-[0.04em] text-foreground",
        className,
      )}
    >
      <span aria-hidden className="h-[3px] w-5 bg-primary" />
      BLACKLINE
    </a>
  );
}
