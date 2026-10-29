import { describe, expect, it } from "vitest";

import { bookingSchema } from "@/lib/booking-schema";

const valid = { name: "Иван", phone: "+7 900 123-45-67", service: "wash" };

describe("Форма записи", () => {
  it("принимает имя, полный телефон и выбранную услугу", () => {
    expect(bookingSchema.safeParse(valid).success).toBe(true);
  });

  it("требует имя", () => {
    expect(bookingSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("отклоняет неполный телефон", () => {
    expect(bookingSchema.safeParse({ ...valid, phone: "+7 900 12" }).success).toBe(false);
  });

  it("требует выбрать услугу", () => {
    expect(bookingSchema.safeParse({ ...valid, service: "" }).success).toBe(false);
  });
});
