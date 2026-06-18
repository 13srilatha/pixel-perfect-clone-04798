// import { createFileRoute } from "@tanstack/react-router";
// import { Nav } from "@/components/site/Nav";
// import { HeroWalk } from "@/components/site/HeroWalk";
// import { TrustBar } from "@/components/site/TrustBar";
// import { EmotionalBridge } from "@/components/site/EmotionalBridge";
// import { SelectedWork } from "@/components/site/SelectedWork";
// import { StackedTestimonials } from "@/components/site/StackedTestimonials";
// import { StudioLaunch } from "@/components/site/StudioLaunch";
// import { Architect } from "@/components/site/Architect";
// import { Contact } from "@/components/site/Contact";
// import { IntroLogo } from "@/components/site/IntroLogo";
// import { SmoothScroll } from "@/components/site/SmoothScroll";
// import { WhatsAppFab } from "@/components/site/WhatsAppFab";

// export const Route = createFileRoute("/")(({
//   head: () => ({
//     meta: [
//       { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
//       {
//         name: "description",
//         content:
//           "Residential architecture, interiors and planning rooted in earth, light and craft. Hyderabad | Vijayawada.",
//       },
//     ],
//   }),
//   component: Index,
// }));

// function Index() {
//   return (
//     <main className="bg-cream text-espresso">
//       <SmoothScroll />
//       <IntroLogo />
//       <Nav />
//       <HeroWalk />
//       <TrustBar />
//       <EmotionalBridge />
//       <SelectedWork />
//       <StackedTestimonials />
//       <StudioLaunch />
//       <Architect />
//       <Contact />
//       <WhatsAppFab />
//     </main>
//   );
// }

/**
 * Homepage — ChatBot REMOVED. WhatsApp handles all chat.
 * Section order: Hero → TrustBar → EmotionalBridge → SelectedWork
 *             → StackedTestimonials → StudioLaunch → Architect → Contact
 */
import { createFileRoute } from "@tanstack/react-router";
import { Nav }                from "@/components/site/Nav";
import { HeroWalk }           from "@/components/site/HeroWalk";
import { TrustBar }           from "@/components/site/TrustBar";
import { EmotionalBridge }    from "@/components/site/EmotionalBridge";
import { SelectedWork }       from "@/components/site/SelectedWork";
import { StackedTestimonials } from "@/components/site/StackedTestimonials";
import { StudioLaunch }       from "@/components/site/StudioLaunch";
import { Architect }          from "@/components/site/Architect";
import { Contact }            from "@/components/site/Contact";
import { BackToTop }          from "@/components/site/BackToTop";
import { IntroLogo }          from "@/components/site/IntroLogo";
import { SmoothScroll }       from "@/components/site/SmoothScroll";
import { WhatsAppFab }        from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
      {
        name: "description",
        content:
          "Residential architecture, interior design, planning and execution. Grounded by Earth. Designed for Experience. Hyderabad | Vijayawada.",
      },
    ],
  }),
  component: Index,
}));

function Index() {
  return (
    <main className="bg-cream text-espresso">
      <SmoothScroll />
      <IntroLogo />
      <Nav />
      <HeroWalk />
      <TrustBar />
      <EmotionalBridge />
      <SelectedWork />
      <StackedTestimonials />
      <StudioLaunch />
      <Architect />
      <Contact />
      <BackToTop />
      <WhatsAppFab />
      {/* ChatBot removed — WhatsApp button handles all client contact */}
    </main>
  );
}
