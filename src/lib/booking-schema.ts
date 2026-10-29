import { z } from "zod";

import { bookingOptions, type ServiceId } from "@/data/site";

const serviceIds = bookingOptions.map((o) => o.id) as [ServiceId, ...ServiceId[]];

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Введите имя — минимум 2 буквы" })
    .max(60, { message: "Имя слишком длинное" })
    .regex(/^[\p{L}\s'-]+$/u, { message: "Имя может содержать только буквы" }),
  phone: z
    .string()
    .trim()
    .max(25, { message: "Слишком длинный номер" })
    .regex(/^[+\d\s()-]+$/, { message: "Номер может содержать только цифры" })
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 11 || digits.length === 10;
      },
      { message: "Введите номер полностью, например +7 900 123-45-67" },
    ),
  service: z.enum(serviceIds, {
    errorMap: () => ({ message: "Выберите услугу" }),
  }),
});

export type BookingData = z.infer<typeof bookingSchema>;
