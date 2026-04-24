import { useState } from "react";
import { processPairs } from "@/data/interiors";
import { Reveal } from "./Nav";

export function Process() {
  return (
    <section id="process" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Before to After
          </p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-espresso">
            Drawings become <em className="italic text-caramel">rooms</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brown text-pretty">
            Drag the slider to reveal the same space at the start of construction and on the day it was handed over.
          </p>
        </Reveal>

        <div className="grid gap-12 md:gap-20">
          {processPairs.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <BeforeAfter pair={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ pair }: { pair: (typeof processPairs)[number] }) {
  const [pos, setPos] = useState(50);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand select-none">
        <img src={pair.after} alt={`${pair.title} — after`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={pair.before}
            alt={`${pair.title} — before`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          />
        </div>

        <span className="label absolute left-4 top-4 bg-espresso/80 px-2 py-1 text-cream">Before</span>
        <span className="label absolute right-4 top-4 bg-cream/90 px-2 py-1 text-espresso">After</span>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-espresso shadow-lg ring-1 ring-espresso/20">
            ⇄
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal before / after"
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>

      <div className="mt-5">
        <h3 className="font-display text-2xl font-light text-espresso md:text-3xl">{pair.title}</h3>
      </div>
    </div>
  );
}
