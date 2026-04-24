import { createFileRoute } from "@tanstack/react-router";
import { Hero, Nav } from "@/components/site/Nav";
import { Walkthrough } from "@/components/site/Walkthrough";
import { Testimonials } from "@/components/site/Testimonials";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { Architect } from "@/components/site/Architect";
import { Contact } from "@/components/site/Contact";
import { BackToTop } from "@/components/site/BackToTop";

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
      <Nav />
      <Hero />
      <Walkthrough />
      <Work />
      <Process />
      <Testimonials />
      <Architect />
      <Contact />
      <BackToTop />
    </main>
  );
}
