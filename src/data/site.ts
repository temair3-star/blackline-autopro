import serviceWash from "@/assets/service-wash.jpg.asset.json";
import serviceDetailing from "@/assets/service-detailing.jpg.asset.json";
import serviceInterior from "@/assets/service-interior.jpg.asset.json";
import servicePolish from "@/assets/service-polish.jpg.asset.json";

/**
 * Все тексты, цены и контакты сайта в одном месте.
 * Контакты и адрес — демонстрационные, их нужно заменить на реальные.
 */

export const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const contacts = {
  address: "г. Город, ул. Примерная, д. 1",
  addressNote: "Демо-адрес — замените на настоящий",
  phoneDisplay: "+7 (000) 000-00-00",
  phoneHref: "tel:+70000000000",
  phoneNote: "Демо-номер — замените на настоящий",
  hours: [
    { days: "Пн — Пт", time: "09:00 — 21:00" },
    { days: "Сб — Вс", time: "10:00 — 20:00" },
  ],
  hoursNote: "Пример графика",
} as const;

export type ServiceId =
  | "wash"
  | "detailing"
  | "interior"
  | "polish"
  | "express"
  | "ceramic"
  | "consult";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  priceFrom: number;
  image: string;
  imageAlt: string;
  duration: string;
}

export const services: Service[] = [
  {
    id: "wash",
    title: "Комплексная мойка",
    description: "Бесконтактная мойка кузова, уборка салона, чистка стёкол и дисков.",
    priceFrom: 1500,
    image: serviceWash.url,
    imageAlt: "Автомобиль в активной пене во время мойки",
    duration: "≈ 1 час",
  },
  {
    id: "detailing",
    title: "Детейлинг",
    description: "Глубокая очистка каждой детали: диски, арки, пороги, молдинги и стыки.",
    priceFrom: 12000,
    image: serviceDetailing.url,
    imageAlt: "Мастер очищает колёсный диск кисточкой",
    duration: "от 1 дня",
  },
  {
    id: "interior",
    title: "Химчистка салона",
    description: "Сиденья, потолок, ковры и пластик — с паром и безопасной химией.",
    priceFrom: 8000,
    image: serviceInterior.url,
    imageAlt: "Мастер чистит салон автомобиля паром",
    duration: "5–8 часов",
  },
  {
    id: "polish",
    title: "Полировка кузова",
    description: "Убираем мелкие царапины и голограммы, возвращаем глубину цвета.",
    priceFrom: 15000,
    image: servicePolish.url,
    imageAlt: "Микрофибра на глянцевом кузове после полировки",
    duration: "1–2 дня",
  },
];

export type CarClass = "sedan" | "crossover" | "suv";

export const carClasses: { id: CarClass; label: string }[] = [
  { id: "sedan", label: "Седан" },
  { id: "crossover", label: "Кроссовер" },
  { id: "suv", label: "Внедорожник" },
];

export interface PriceItem {
  id: ServiceId;
  title: string;
  note: string;
  prices: Record<CarClass, number>;
}

export const priceList: PriceItem[] = [
  {
    id: "express",
    title: "Экспресс-мойка кузова",
    note: "Пена, ополаскивание, сушка",
    prices: { sedan: 900, crossover: 1100, suv: 1300 },
  },
  {
    id: "wash",
    title: "Комплексная мойка",
    note: "Кузов, салон, стёкла, диски",
    prices: { sedan: 1500, crossover: 1900, suv: 2300 },
  },
  {
    id: "interior",
    title: "Химчистка салона",
    note: "Сиденья, потолок, ковры, пластик",
    prices: { sedan: 8000, crossover: 10000, suv: 12000 },
  },
  {
    id: "detailing",
    title: "Детейлинг «под ключ»",
    note: "Глубокая очистка кузова и салона",
    prices: { sedan: 12000, crossover: 15000, suv: 18000 },
  },
  {
    id: "polish",
    title: "Полировка кузова",
    note: "Восстановительная, в 2 этапа",
    prices: { sedan: 15000, crossover: 18000, suv: 22000 },
  },
  {
    id: "ceramic",
    title: "Керамическое покрытие",
    note: "Защита лакокрасочного покрытия",
    prices: { sedan: 25000, crossover: 30000, suv: 35000 },
  },
];

/** Варианты для формы записи. */
export const bookingOptions: { id: ServiceId; label: string }[] = [
  ...priceList.map((item) => ({ id: item.id, label: item.title })),
  { id: "consult", label: "Не знаю — нужна консультация" },
];

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(value).replace(/\u00a0|\u202f/g, " ")} ₽`;
}
