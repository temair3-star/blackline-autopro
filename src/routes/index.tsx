import { createFileRoute } from "@tanstack/react-router";

import { Advantages } from "@/components/site/Advantages";
import { BookingProvider } from "@/components/site/booking-context";
import { Contacts } from "@/components/site/Contacts";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
import { Services } from "@/components/site/Services";

const title = "BLACKLINE — автомойка и детейлинг";
const description =
  "Комплексная мойка, детейлинг, химчистка салона и полировка кузова. Чистота, которую видно.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Gallery />
        <Pricing />
        <Contacts />
      </main>
      <Footer />
    </BookingProvider>
  );
}
