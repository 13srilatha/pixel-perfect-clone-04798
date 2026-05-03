import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/architect-portrait.jpeg";

const cards = [
  { quote: "They listened more than they spoke.", name: "Charry Reddy", title: "Jubilee Hills", w: 300, h: 400, x: "-42vw", y: "-25vh", r: -9 },
  { quote: "The site team treated our house like their own.", name: "Muthyam Rao", title: "Kompally", w: 350, h: 300, x: "38vw", y: "-18vh", r: 8 },
  { quote: "Patient, precise, and deeply personal.", name: "Aparna Iyer", title: "Kondapur", w: 320, h: 360, x: "-30vw", y: "24vh", r: -6 },
  { quote: "Slow craft, beautiful result.", name: "Rohan Kapoor", title: "Banjara Hills", w: 290, h: 330, x: "35vw", y: "22vh", r: 10 },
  { quote: "We felt heard in every decision.", name: "Sushmita Rao", title: "Gachibowli", w: 340, h: 290, x: "6vw", y: "-30vh", r: -4 },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spread = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

  return (
    <section id="testimonials" ref={ref} className="relative h-[270vh] bg-cream">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4 md:px-10">
        <div className="origin-center scale-[0.75] md:scale-100">
          <h2 className="display mb-8 text-center text-[clamp(2rem,5vw,4rem)] text-espresso">Client <em className="italic text-caramel">Words</em></h2>
          <div className="relative flex h-[68vh] w-[92vw] max-w-[1200px] items-center justify-center">
            {cards.map((c) => (
              <motion.article key={c.name} className="absolute left-1/2 top-1/2 rounded-lg border border-sand bg-cream p-5 shadow-xl" style={{ width: c.w, height: c.h, x: useTransform(spread, [0, 1], ["-50%", `calc(-50% + ${c.x})`]), y: useTransform(spread, [0, 1], ["-50%", `calc(-50% + ${c.y})`]), rotate: useTransform(spread, [0, 1], [0, c.r]) }}>
                <p className="font-display text-lg italic text-espresso">"{c.quote}"</p><p className="mt-4 text-sm font-semibold uppercase tracking-widest text-espresso">{c.name}</p><p className="label text-brown">{c.title}</p>
              </motion.article>
            ))}
            <div className="relative z-20 h-[72vh] w-[clamp(210px,26vw,360px)] overflow-hidden border border-sand bg-sand shadow-2xl"><img src={portrait} alt="Architect portrait" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
