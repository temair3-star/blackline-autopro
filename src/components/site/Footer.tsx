import { ArrowUp } from "lucide-react";

import { contacts, navLinks } from "@/data/site";
import { useBooking } from "./booking-context";
import { Logo } from "./Logo";

export function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="border-t border-border bg-graphite">
      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Автомойка и детейлинг. Чистота, которую видно.
          </p>
          <button
            type="button"
            onClick={() => openBooking()}
            className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Записаться онлайн →
          </button>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Навигация
          </p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Контакты
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={contacts.phoneHref}
                className="text-foreground transition-colors hover:text-primary"
              >
                {contacts.phoneDisplay}
              </a>
            </li>
            <li className="text-foreground">{contacts.address}</li>
            {contacts.hours.map((h) => (
              <li key={h.days} className="text-muted-foreground">
                {h.days}: {h.time}
              </li>
            ))}
            <li className="text-xs text-muted-foreground">Контакты демонстрационные</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} BLACKLINE. Демонстрационный сайт.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            Наверх
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
