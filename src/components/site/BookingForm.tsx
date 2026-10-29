import { useState, type FormEvent } from "react";
import { AlertTriangle, ChevronDown, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { bookingOptions, type ServiceId } from "@/data/site";
import { bookingSchema, type BookingData } from "@/lib/booking-schema";
import { cn } from "@/lib/utils";
import { useBooking } from "./booking-context";

type FieldErrors = Partial<Record<keyof BookingData, string>>;

const fieldClass =
  "h-14 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function BookingForm() {
  const { selectedService, setSelectedService } = useBooking();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<BookingData | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({ name, phone, service: selectedService });
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof BookingData;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(result.data);
  };

  const reset = () => {
    setSubmitted(null);
    setName("");
    setPhone("");
    setSelectedService("");
    setErrors({});
  };

  const clearError = (key: keyof BookingData) => {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  if (submitted) {
    const serviceLabel = bookingOptions.find((o) => o.id === submitted.service)?.label;
    return (
      <div role="status" aria-live="polite" className="flex h-full flex-col">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Заявка заполнена, но не отправлена</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Это демонстрационная версия сайта: приём заявок пока не подключён, поэтому владелец студии
          эту заявку не получит. Чтобы записаться, пожалуйста, позвоните по телефону.
        </p>
        <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-background text-sm">
          <div className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-muted-foreground">Имя</dt>
            <dd className="text-right font-medium">{submitted.name}</dd>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-muted-foreground">Телефон</dt>
            <dd className="text-right font-medium">{submitted.phone}</dd>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-muted-foreground">Услуга</dt>
            <dd className="text-right font-medium">{serviceLabel}</dd>
          </div>
        </dl>
        <Button variant="line" size="pill" className="mt-6 self-start" onClick={reset}>
          <RotateCcw />
          Заполнить заново
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h3 className="text-2xl font-bold">Запись на услугу</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Заполните три поля — это займёт меньше минуты.
        </p>
      </div>

      <div>
        <label htmlFor="booking-name" className="mb-2 block text-sm font-medium">
          Имя
        </label>
        <input
          id="booking-name"
          name="name"
          autoComplete="given-name"
          placeholder="Как к вам обращаться"
          value={name}
          maxLength={60}
          onChange={(e) => {
            setName(e.target.value);
            clearError("name");
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
          className={cn(fieldClass, errors.name && "border-destructive")}
        />
        {errors.name ? (
          <p id="booking-name-error" className="mt-2 text-sm text-destructive">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="booking-phone" className="mb-2 block text-sm font-medium">
          Телефон
        </label>
        <input
          id="booking-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 123-45-67"
          value={phone}
          maxLength={25}
          onChange={(e) => {
            setPhone(e.target.value);
            clearError("phone");
          }}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "booking-phone-error" : undefined}
          className={cn(fieldClass, errors.phone && "border-destructive")}
        />
        {errors.phone ? (
          <p id="booking-phone-error" className="mt-2 text-sm text-destructive">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="booking-service" className="mb-2 block text-sm font-medium">
          Услуга
        </label>
        <div className="relative">
          <select
            id="booking-service"
            name="service"
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value as ServiceId | "");
              clearError("service");
            }}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "booking-service-error" : undefined}
            className={cn(
              fieldClass,
              "cursor-pointer appearance-none pr-12",
              !selectedService && "text-muted-foreground/70",
              errors.service && "border-destructive",
            )}
          >
            <option value="" disabled>
              Выберите услугу
            </option>
            {bookingOptions.map((o) => (
              <option key={o.id} value={o.id} className="text-foreground">
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        {errors.service ? (
          <p id="booking-service-error" className="mt-2 text-sm text-destructive">
            {errors.service}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="lime" size="xl" className="mt-2">
        Отправить заявку
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Демо-режим: заявка не будет передана владельцу — приём заявок ещё не подключён.
      </p>
    </form>
  );
}
