import { createFileRoute } from "@tanstack/react-router";
import { Hero, Nav } from "@/components/site/Nav";
import { Walkthrough } from "@/components/site/Walkthrough";
import { RotatingHouse } from "@/components/site/RotatingHouse";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";

import { Architect } from "@/components/site/Architect";
import { Contact } from "@/components/site/Contact";
import { BackToTop } from "@/components/site/BackToTop";
import { SmoothScroll } from "@/components/site/SmoothScroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
      {
        name: "description",
        content:
          "Residential architecture and interior design rooted in earth, light and craft. Walk through our spaces — from façade to foyer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-espresso">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Walkthrough />
      <Work />
      <Process />
      <RotatingHouse />
      <Architect />
      <Contact />
      <BackToTop />
    </main>
  );
}
