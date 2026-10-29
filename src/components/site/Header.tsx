import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contacts, navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { useBooking } from "./booking-context";
import { Logo } from "./Logo";

export function Header() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between lg:h-20">
          <Logo onClick={close} />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="lime"
              size="pill"
              className="hidden sm:inline-flex"
              onClick={() => openBooking()}
            >
              Записаться
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню: вне header, т.к. backdrop-blur ломает fixed-позиционирование */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-background px-5 pb-8 pt-6 transition-all duration-500 sm:px-8 lg:hidden",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav aria-label="Мобильная навигация" className="flex-1">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "border-b border-border transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={close}
                  className="flex items-center justify-between py-5 font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  <span className="text-sm font-normal text-muted-foreground">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <Button
            variant="lime"
            size="xl"
            onClick={() => {
              close();
              openBooking();
            }}
          >
            Записаться
          </Button>
          <Button variant="line" size="xl" asChild>
            <a href={contacts.phoneHref} onClick={close}>
              <Phone />
              {contacts.phoneDisplay}
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">{contacts.phoneNote}</p>
        </div>
      </div>
    </>
  );
}
