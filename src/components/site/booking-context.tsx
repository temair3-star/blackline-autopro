import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import type { ServiceId } from "@/data/site";

interface BookingContextValue {
  selectedService: ServiceId | "";
  setSelectedService: (id: ServiceId | "") => void;
  /** Прокручивает к форме записи и, если передана услуга, выбирает её. */
  openBooking: (id?: ServiceId) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<ServiceId | "">("");

  const openBooking = useCallback((id?: ServiceId) => {
    if (id) setSelectedService(id);
    const form = document.getElementById("booking");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("booking-name")?.focus({ preventScroll: true });
    }, 600);
  }, []);

  const value = useMemo(
    () => ({ selectedService, setSelectedService, openBooking }),
    [selectedService, openBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
