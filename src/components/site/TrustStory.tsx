// import { useEffect, useRef } from "react";

// /* ─────────────────────────────────────────────────────────────────────────
//    TrustStory — trust-building storytelling section
//    Inspired by The Design Loft's "From first idea to final handover" approach.
//    Sits between the Hero and the Walkthrough chapter.
//    ───────────────────────────────────────────────────────────────────────── */

// function useReveal(threshold = 0.15) {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.opacity = "0";
//     el.style.transform = "translateY(32px)";
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.style.transition = "opacity 1s cubic-bezier(0.25,0.1,0.25,1), transform 1s cubic-bezier(0.25,0.1,0.25,1)";
//           el.style.opacity = "1";
//           el.style.transform = "translateY(0)";
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return ref;
// }

// const STATS = [
//   { value: "8+", label: "Years of practice" },
//   { value: "120+", label: "Homes completed" },
//   { value: "45", label: "Day delivery promise" },
//   { value: "10yr", label: "Warranty coverage" },
// ];

// const PILLARS = [
//   {
//     icon: "✦",
//     title: "Precision-led execution",
//     body: "Every detail is carefully planned and executed so the final outcome matches the design with absolute accuracy.",
//   },
//   {
//     icon: "◷",
//     title: "45-day delivery promise",
//     body: "Structured workflows and disciplined planning ensure timely delivery without compromising craftsmanship.",
//   },
//   {
//     icon: "◈",
//     title: "Single point of responsibility",
//     body: "One studio. One contact. Complete ownership from planning and design to sourcing, execution and finishing.",
//   },
//   {
//     icon: "◉",
//     title: "10-year warranty",
//     body: "Long-term warranty coverage ensures peace of mind and confidence long after project completion.",
//   },
// ];

// export function TrustStory() {
//   return (
//     <>
//       <ManageItAll />
//       <Pillars />
//     </>
//   );
// }

// /* ── "We manage it all" narrative section ── */
// function ManageItAll() {
//   const headRef = useReveal(0.1);
//   const bodyRef = useReveal(0.1);
//   const statsRef = useReveal(0.1);

//   return (
//     <section className="bg-cream py-20 md:py-32">
//       <div className="mx-auto max-w-[1600px] px-6 md:px-10">
//         <div className="grid gap-12 md:grid-cols-12 md:gap-16">
//           {/* Left column — headline + body */}
//           <div className="md:col-span-6">
//             <div ref={headRef}>
//               <p className="label mb-5 inline-flex items-center gap-3 text-caramel">
//                 <span className="h-px w-10 bg-caramel" />
//                 The Studio Promise
//               </p>
//               <h2 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] text-espresso">
//                 From first conversation{" "}
//                 <em className="italic text-caramel">to completed home</em>,
//                 we manage every step.
//               </h2>
//             </div>

//             <div ref={bodyRef} className="mt-8 space-y-5 text-base leading-relaxed text-brown md:text-lg">
//               <p>
//                 Designing a home should feel exciting and reassuring, not
//                 overwhelming. We take complete ownership of your interior
//                 journey — from planning and design to sourcing, execution and
//                 finishing — so you can enjoy the process with confidence and
//                 clarity.
//               </p>
//               <p>
//                 From your very first conversation with us to the moment you
//                 step into your finished home, our team remains closely
//                 involved at every stage. You always know what's happening,
//                 what comes next, and that your home is in safe hands.
//               </p>

//               <ul className="mt-6 space-y-3 border-t border-sand pt-6">
//                 {["End-to-end execution", "Single point of responsibility", "Clear timelines & quality checks"].map((item) => (
//                   <li key={item} className="flex items-center gap-3 text-sm text-espresso">
//                     <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>

//               <a
//                 href="#work"
//                 className="mt-8 inline-flex items-center gap-3 border border-espresso px-6 py-3 text-espresso transition-colors hover:bg-espresso hover:text-cream"
//               >
//                 <span className="label normal-case tracking-wider">Explore our work</span>
//                 <span>→</span>
//               </a>
//             </div>
//           </div>

//           {/* Right column — stats + badge */}
//           <div className="md:col-span-6">
//             <div ref={statsRef} className="grid grid-cols-2 gap-px border border-sand bg-sand">
//               {STATS.map((s) => (
//                 <div key={s.label} className="flex flex-col items-start gap-2 bg-cream p-8 md:p-10">
//                   <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none text-espresso">
//                     {s.value}
//                   </span>
//                   <span className="label normal-case tracking-wide text-brown">{s.label}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 border border-sand bg-beige p-6 md:p-8">
//               <p className="font-display text-xl font-light italic text-caramel md:text-2xl">
//                 "Honest, warm, and exact. They drew exactly what we needed — nothing more, nothing less."
//               </p>
//               <p className="mt-4 label normal-case tracking-wide text-brown">
//                 Naveen K. · Gachibowli Home, Hyderabad
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ── 4-pillar trust cards ── */
// function Pillars() {
//   const headRef = useReveal(0.1);

//   return (
//     <section className="border-t border-sand bg-beige py-20 md:py-28">
//       <div className="mx-auto max-w-[1600px] px-6 md:px-10">
//         <div ref={headRef} className="mb-14 max-w-2xl">
//           <p className="label mb-4 inline-flex items-center gap-3 text-caramel">
//             <span className="h-px w-10 bg-caramel" />
//             Built on quality
//           </p>
//           <h2 className="display text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-espresso">
//             The commitments we bring{" "}
//             <em className="italic text-caramel">to every project</em>.
//           </h2>
//           <p className="mt-5 text-base leading-relaxed text-brown md:text-lg">
//             Thoughtfully designed, expertly executed — every space reflects
//             our commitment to refined living.
//           </p>
//         </div>

//         <div className="grid gap-px border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
//           {PILLARS.map((p, i) => (
//             <PillarCard key={p.title} pillar={p} delay={i * 100} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function PillarCard({
//   pillar,
//   delay,
// }: {
//   pillar: { icon: string; title: string; body: string };
//   delay: number;
// }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.opacity = "0";
//     el.style.transform = "translateY(28px)";
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => {
//             el.style.transition =
//               "opacity 0.9s cubic-bezier(0.25,0.1,0.25,1), transform 0.9s cubic-bezier(0.25,0.1,0.25,1)";
//             el.style.opacity = "1";
//             el.style.transform = "translateY(0)";
//           }, delay);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [delay]);

//   return (
//     <div ref={ref} className="flex flex-col gap-5 bg-cream p-8 md:p-10">
//       <span className="flex h-12 w-12 items-center justify-center border border-sand bg-espresso font-display text-xl text-gold">
//         {pillar.icon}
//       </span>
//       <h3 className="font-display text-xl font-light text-espresso md:text-2xl">
//         {pillar.title}
//       </h3>
//       <p className="text-sm leading-relaxed text-brown">{pillar.body}</p>
//     </div>
//   );
// }
/**
 * TrustStory.tsx — Terra Space Studio
 * 
 * Replaces the generic trust section with cinematic storytelling
 * pulled directly from the Terra brochure:
 * "From Concept to Completion" — services + design approach + stats
 * 
 * Sections:
 * 1. Studio manifesto — "Grounded by Earth. Designed for Experience."
 * 2. Services grid — 7 services from the brochure
 * 3. Numbers — real stats
 * 4. Design approach pillars — Context, Simplicity, Materiality, Detail, End-to-End
 */

import { useEffect, useRef } from "react";

/* ─── Reveal on scroll ─── */
function useReveal(threshold = 0.12, delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition =
              "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, delay]);
  return ref;
}

/* ─── Data from Terra brochure ─── */
const SERVICES = [
  { num: "01", title: "Architecture", body: "Context-driven design that balances aesthetics, functionality, and spatial clarity." },
  { num: "02", title: "Planning", body: "Thoughtful spatial planning focused on movement, usability, and efficient design solutions." },
  { num: "03", title: "Interior Design", body: "Warm, refined, human-centered interiors that reflect your lifestyle and elevate everyday living." },
  { num: "04", title: "Landscape Design", body: "Natural outdoor environments that connect architecture with greenery and experience." },
  { num: "05", title: "Estimation & Costing", body: "Detailed estimation and budgeting for clarity, transparency, and complete cost control." },
  { num: "06", title: "Execution", body: "Coordinated on-site execution that ensures design intent is carried through with precision." },
  { num: "07", title: "Site Supervision", body: "Continuous monitoring and technical oversight throughout the construction process." },
];

const PILLARS = [
  {
    title: "Context",
    body: "Every project begins with a deep understanding of the site, surroundings, climate, and culture. We design spaces that belong to their context and respond meaningfully.",
  },
  {
    title: "Simplicity",
    body: "We believe in clarity and restraint. By simplifying forms, planning, and details, we create timeless and functional environments that enhance everyday life.",
  },
  {
    title: "Materiality",
    body: "Honest materials, natural textures, and considered palettes bring warmth and character to our spaces. Light and shadow are integral to the experience we craft.",
  },
  {
    title: "Detail",
    body: "From concept to construction, attention to proportion, craftsmanship, and detail guides every decision. The small things shape the overall experience.",
  },
  {
    title: "End-to-End",
    body: "We offer complete design and build solutions, staying involved from concept development to execution and site supervision — ensuring the design vision is fully realized.",
  },
];

const STATS = [
  { value: "7+", label: "Services offered" },
  { value: "2", label: "Cities — Hyderabad & Vijayawada" },
  { value: "100%", label: "End-to-end ownership" },
  { value: "1", label: "Vision. One team. Complete peace of mind." },
];

/* ─── Components ─── */

export function TrustStory() {
  return (
    <>
      <Manifesto />
      <Services />
      <Stats />
      <Approach />
    </>
  );
}

/* 1. Studio manifesto */
function Manifesto() {
  const leftRef  = useReveal(0.1, 0);
  const rightRef = useReveal(0.1, 120);

  return (
    <section
      style={{
        background: "#f5f0e8",
        paddingTop: "clamp(4rem, 10vh, 8rem)",
        paddingBottom: "clamp(4rem, 10vh, 8rem)",
        borderTop: "1px solid #e0d8cc",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>

        <div style={{ display: "grid", gap: "clamp(2.5rem, 6vw, 6rem)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}>

          {/* Left — headline */}
          <div ref={leftRef}>
            <p style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "0.55rem", letterSpacing: "0.38em",
              textTransform: "uppercase", color: "#B5934A",
              display: "flex", alignItems: "center", gap: "0.6rem",
              marginBottom: "clamp(1.2rem, 2.5vh, 2rem)",
            }}>
              <span style={{ display: "block", width: 24, height: 1, background: "#B5934A" }} />
              About Terra
            </p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              color: "#2c1a0e",
              marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
            }}>
              Grounded by Earth.{" "}
              <em style={{ color: "#B5934A", fontStyle: "italic" }}>Designed for Experience.</em>
            </h2>

            <p style={{
              fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              fontWeight: 300, lineHeight: 1.7,
              color: "#5c4033",
              marginBottom: "clamp(1rem, 2vh, 1.6rem)",
            }}>
              Terra Space Studio is a multidisciplinary architecture and design practice focused on
              creating spaces that balance simplicity, functionality, and timeless aesthetics.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              fontWeight: 300, lineHeight: 1.7,
              color: "#5c4033",
              marginBottom: "clamp(1rem, 2vh, 1.6rem)",
            }}>
              Our work explores the relationship between architecture, materials, light, and human
              experience — crafting environments that feel grounded, refined, and enduring.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              fontWeight: 300, lineHeight: 1.7,
              color: "#5c4033",
            }}>
              From residential homes to interior environments, every project is approached with
              sensitivity to context, proportion, and detail.
            </p>
          </div>

          {/* Right — quote + tagline */}
          <div ref={rightRef} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{
              borderLeft: "1px solid #B5934A",
              paddingLeft: "clamp(1.5rem, 2.5vw, 2.5rem)",
              marginBottom: "clamp(2rem, 4vh, 3.5rem)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
                fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                fontWeight: 300, fontStyle: "italic",
                lineHeight: 1.4, color: "#2c1a0e",
                marginBottom: "clamp(1rem, 2vh, 1.5rem)",
              }}>
                "Every project begins with understanding how people live, feel, and experience a space."
              </p>
              <p style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "0.55rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#B5934A",
              }}>
                K. Vaasanthi — Founder, Terra Space Studio
              </p>
            </div>

            <div style={{
              display: "flex", gap: "0.5rem", flexWrap: "wrap",
            }}>
              {["Architecture", "Interiors", "Planning"].map(s => (
                <span key={s} style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "0.5rem", letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: "1px solid #c8bca8",
                  color: "#5c4033",
                  padding: "6px 14px",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Services — full-width editorial grid */
function Services() {
  return (
    <section
      id="services"
      style={{
        background: "#2c1a0e",
        padding: "clamp(4rem, 10vh, 8rem) 0",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        <ServiceHeader />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          borderTop: "1px solid rgba(181,147,74,0.15)",
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 60} />
          ))}
        </div>

        <div style={{
          marginTop: "clamp(2.5rem, 5vh, 4rem)",
          paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
          borderTop: "1px solid rgba(181,147,74,0.15)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
            color: "rgba(245,240,232,0.5)",
          }}>
            We provide complete end-to-end project solutions — from concept development to on-site execution.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceHeader() {
  const ref = useReveal(0.1);
  return (
    <div ref={ref} style={{ marginBottom: "clamp(2rem, 5vh, 4rem)" }}>
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.55rem", letterSpacing: "0.38em",
        textTransform: "uppercase", color: "#B5934A",
        display: "flex", alignItems: "center", gap: "0.6rem",
        marginBottom: "clamp(1rem, 2vh, 1.5rem)",
      }}>
        <span style={{ display: "block", width: 24, height: 1, background: "#B5934A" }} />
        Our Services
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
        fontWeight: 300, lineHeight: 1.0,
        color: "#f5f0e8",
      }}>
        From Concept{" "}
        <em style={{ color: "#B5934A", fontStyle: "italic" }}>to Completion.</em>
      </h2>
    </div>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: { num: string; title: string; body: string };
  delay: number;
}) {
  const ref = useReveal(0.1, delay);
  return (
    <div
      ref={ref}
      style={{
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        borderBottom: "1px solid rgba(181,147,74,0.12)",
        borderRight: "1px solid rgba(181,147,74,0.12)",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(181,147,74,0.06)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.5rem", letterSpacing: "0.22em",
        color: "rgba(181,147,74,0.5)",
        marginBottom: "clamp(0.8rem, 1.5vh, 1.2rem)",
      }}>
        {service.num}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
        fontWeight: 300, color: "#f5f0e8",
        marginBottom: "clamp(0.6rem, 1.2vh, 1rem)",
        lineHeight: 1.1,
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
        fontWeight: 300, lineHeight: 1.6,
        color: "rgba(245,240,232,0.52)",
      }}>
        {service.body}
      </p>
    </div>
  );
}

/* 3. Stats */
function Stats() {
  return (
    <section style={{
      background: "#f5f0e8",
      borderTop: "1px solid #e0d8cc",
      padding: "clamp(3rem, 8vh, 6rem) 0",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        gap: "1px",
        background: "#e0d8cc",
        border: "1px solid #e0d8cc",
      }}>
        {STATS.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, delay }: { stat: { value: string; label: string }; delay: number }) {
  const ref = useReveal(0.1, delay);
  return (
    <div ref={ref} style={{ background: "#f5f0e8", padding: "clamp(2rem, 4vw, 3.5rem)" }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(2.8rem, 6vw, 5rem)",
        fontWeight: 300, lineHeight: 1,
        color: "#2c1a0e",
        marginBottom: "0.5rem",
      }}>
        {stat.value}
      </p>
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.52rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: "#8a7355",
        lineHeight: 1.5,
      }}>
        {stat.label}
      </p>
    </div>
  );
}

/* 4. Design approach */
function Approach() {
  const headRef = useReveal(0.1);

  return (
    <section style={{
      background: "#f9f6f1",
      borderTop: "1px solid #e0d8cc",
      padding: "clamp(4rem, 10vh, 8rem) 0",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>

        <div ref={headRef} style={{ marginBottom: "clamp(2.5rem, 6vh, 5rem)", maxWidth: 680 }}>
          <p style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.38em",
            textTransform: "uppercase", color: "#B5934A",
            display: "flex", alignItems: "center", gap: "0.6rem",
            marginBottom: "clamp(1rem, 2vh, 1.5rem)",
          }}>
            <span style={{ display: "block", width: 24, height: 1, background: "#B5934A" }} />
            Our Design Approach
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontWeight: 300, lineHeight: 1.0,
            color: "#2c1a0e",
            marginBottom: "clamp(1rem, 2vh, 1.5rem)",
          }}>
            Thoughtful Design.{" "}
            <em style={{ color: "#B5934A", fontStyle: "italic" }}>Purposeful Spaces.</em>
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            fontWeight: 300, lineHeight: 1.7, color: "#5c4033",
          }}>
            At Terra Space Studio, design is more than aesthetics — it is a thoughtful process rooted in
            understanding, clarity, and purpose. Every project. Every detail. Designed with intention.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "1px",
          background: "#e0d8cc",
          border: "1px solid #e0d8cc",
        }}>
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} delay={i * 80} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  delay,
  index,
}: {
  pillar: { title: string; body: string };
  delay: number;
  index: number;
}) {
  const ref = useReveal(0.1, delay);
  const nums = ["01", "02", "03", "04", "05"];
  return (
    <div
      ref={ref}
      style={{
        background: "#f9f6f1",
        padding: "clamp(1.8rem, 3.5vw, 3rem)",
        transition: "background 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#f0ece4")}
      onMouseLeave={e => (e.currentTarget.style.background = "#f9f6f1")}
    >
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: "0.48rem", letterSpacing: "0.22em",
        color: "rgba(181,147,74,0.55)",
        marginBottom: "clamp(0.8rem, 1.5vh, 1.2rem)",
      }}>
        {nums[index]}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(1.2rem, 2vw, 1.7rem)",
        fontWeight: 300, color: "#2c1a0e",
        marginBottom: "clamp(0.6rem, 1.2vh, 1rem)",
        lineHeight: 1.1,
      }}>
        {pillar.title}
      </h3>
      <p style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
        fontWeight: 300, lineHeight: 1.65, color: "#5c4033",
      }}>
        {pillar.body}
      </p>
    </div>
  );
}
