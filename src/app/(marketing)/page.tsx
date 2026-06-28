import type { Metadata } from "next";
import { Button, Typography } from "@/components/atoms";
import { HeroSection, LatestEvents, AboutSection, DiscoverSection, MustVisitSection } from "@/components/organisms";
import { Counter } from "@/features/counter";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Praya City - The Soul of Central Lombok",
  description:
    "Curated travel information — from cultural events, natural destinations, local cuisine, all updated in real-time.",
};

/**
 * Pages are thin: they import from feature/component public APIs and compose.
 * No business logic, no data access, no validation lives here.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestEvents />
      <AboutSection />
      <DiscoverSection />
      <MustVisitSection />
    </>
  );
}
