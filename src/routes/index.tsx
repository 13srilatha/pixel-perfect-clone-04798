// import { createFileRoute } from "@tanstack/react-router";
// import { Hero, Nav } from "@/components/site/Nav";
// import { Walkthrough } from "@/components/site/Walkthrough";
// import { Work } from "@/components/site/Work";
// import { Process } from "@/components/site/Process";
// import { Testimonials } from "@/components/site/Testimonials";
// import { StudioLaunch } from "@/components/site/StudioLaunch";
// import { Architect } from "@/components/site/Architect";
// import { Contact } from "@/components/site/Contact";
// import { BackToTop } from "@/components/site/BackToTop";
// import { IntroLogo } from "@/components/site/IntroLogo";
// import { ChatBot } from "@/components/site/ChatBot";
// import { SmoothScroll } from "@/components/site/SmoothScroll";
// import { ChapterIntro } from "@/components/site/ChapterIntro";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
//       {
//         name: "description",
//         content:
//           "Residential architecture and interior design rooted in earth, light and craft. Walk through our spaces — from façade to foyer.",
//       },
//     ],
//   }),
//   component: Index,
// });

// function Index() {
//   return (
//     <main className="bg-cream text-espresso">
//       <SmoothScroll />
//       <IntroLogo />
//       <Nav />
//       <Hero />
//       <ChapterIntro
//         number="01"
//         kicker="The Walkthrough"
//         title="Step inside a"
//         italic="finished home."
//         subtitle="From the approach to the terrace, in one continuous scroll. No carousels — just rooms, light, and the way they sit together."
//       />
//       <Walkthrough />

//       <ChapterIntro
//         number="02"
//         kicker="The Practice"
//         title="What we"
//         italic="design."
//         subtitle="Architecture, interiors, commercial and renovation — under one studio. Each gallery below is real, completed work."
//       />
//       <Work />

//       <ChapterIntro
//         number="03"
//         kicker="Before · After"
//         title="Drawings become"
//         italic="rooms."
//         subtitle="Drag the slider on each project to see what we inherited, and what we delivered."
//         tone="ink"
//       />
//       <Process />

//       <ChapterIntro
//         number="04"
//         kicker="Client Words"
//         title="What our clients"
//         italic="remember."
//         subtitle="One image, five voices. Scroll — each panel turns to reveal the people we've built for."
//       />
//       <Testimonials />

//       <StudioLaunch />

//       <ChapterIntro
//         number="05"
//         kicker="The Architect"
//         title="The hand behind"
//         italic="the studio."
//       />
//       <Architect />

//       <Contact />
//       <BackToTop />
//       <ChatBot />
//     </main>
//   );
// }
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CinematicHero } from "@/components/site/CinematicHero";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { StudioLaunch } from "@/components/site/StudioLaunch";
import { Architect } from "@/components/site/Architect";
import { Contact } from "@/components/site/Contact";
import { BackToTop } from "@/components/site/BackToTop";
import { IntroLogo } from "@/components/site/IntroLogo";
import { ChatBot } from "@/components/site/ChatBot";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { TrustStory } from "@/components/site/TrustStory";


export const Route = createFileRoute("/")((({
  head: () => ({
    meta: [
      { title: "Terra Space Studio — Architecture & Interior Design, Hyderabad" },
      {
        name: "description",
        content:
          "Multidisciplinary architecture and design practice. Grounded by Earth. Designed for Experience. Hyderabad | Vijayawada.",
      },
    ],
  }),
  component: Index,
})));

function Index() {
  return (
    <main className="bg-cream text-espresso">
      <SmoothScroll />
      <IntroLogo />
      <Nav />
      <CinematicHero />
      <TrustStory />
      <Work />
      <Process />
      <Testimonials />
      <StudioLaunch />
      <Architect />
      <Contact />
      <BackToTop />
      <ChatBot />
    </main>
  );
}
