import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { FeaturedWork } from "@/components/sections/featured-work";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/site/json-ld";
import {
  faqSchema,
  personSchema,
  professionalServiceSchema,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={faqSchema()} />
      <Hero />
      <Services />
      <FeaturedWork />
      <HowWeWork />
      <Faq />
      <ClosingCta />
    </>
  );
}
