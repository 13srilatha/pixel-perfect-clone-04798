import { createFileRoute } from "@tanstack/react-router";
import { Hero, Nav } from "@/components/site/Nav";
import { Walkthrough } from "@/components/site/Walkthrough";
import { RotatingHouse } from "@/components/site/RotatingHouse";
import { Work } from "@/components/site/Work";
import { Interiors } from "@/components/site/Interiors";
import { Process } from "@/components/site/Process";
import { Architect } from "@/components/site/Architect";
import { Contact } from "@/components/site/Contact";
import { BackToTop } from "@/components/site/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design" },
      {
        name: "description",
        content:
          "Cinematic residential architecture and interior design from Chandigarh, India. Walk through our homes — exterior to interior — and meet the architect.",
      },
      { property: "og:title", content: "Terra Space Studio — Architecture & Interior Design" },
      {
        property: "og:description",
        content: "Spaces that remember you. Stone, wood, light — slowed to the speed of life.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-espresso">
      <Nav />
      <Hero />
      <Walkthrough />
      <Work />
      <Interiors />
      <Process />
      <RotatingHouse />
      <Architect />
      <Contact />
      <BackToTop />
    </main>
  );
}
