import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HeroWalk } from "@/components/site/HeroWalk";
import { TrustBar } from "@/components/site/TrustBar";
import { EmotionalBridge } from "@/components/site/EmotionalBridge";
import { StudioLaunch } from "@/components/site/StudioLaunch";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { StackedTestimonials } from "@/components/site/StackedTestimonials";
import { Contact } from "@/components/site/Contact";
import { BackToTop } from "@/components/site/BackToTop";
import { IntroLogo } from "@/components/site/IntroLogo";
import { ChatBot } from "@/components/site/ChatBot";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
      {
        name: "description",
        content:
          "Residential architecture, interiors and planning rooted in earth, light and craft. Hyderabad | Vijayawada.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-espresso">
      <SmoothScroll />
      <IntroLogo />
      <Nav />
      <HeroWalk />
      <TrustBar />
      <EmotionalBridge />
      <StudioLaunch />
      <SelectedWork />
      <Process />
      <Services />
      <StackedTestimonials />
      <Contact />
      <BackToTop />
      <WhatsAppFab />
      <ChatBot />
    </main>
  );
}
