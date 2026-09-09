import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Process } from "@/components/sections/process";
import { Quality } from "@/components/sections/quality";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <Process />
      <Quality />
      <ClosingCta />
    </>
  );
}
