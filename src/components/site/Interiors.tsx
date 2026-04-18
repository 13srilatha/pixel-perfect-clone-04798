import { interiors } from "@/data/interiors";
import { Reveal } from "./Nav";

export function Interiors() {
  return (
    <section id="interiors" className="relative bg-beige py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="label mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-caramel" />
            Interior Work
          </p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-espresso">
            Rooms, made <em className="italic text-caramel">tactile</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brown text-pretty">
            Joinery, partitions, lighting and built-ins — drawn for each home and crafted by hand on site. A few recently completed and in-progress pieces.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {interiors.map((item, i) => {
            const isLarge = i % 5 === 0 || i % 5 === 3;
            const span = isLarge ? "md:col-span-7" : "md:col-span-5";
            return (
              <Reveal key={item.id} className={span} delay={(i % 3) * 60}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="label mb-1 text-caramel">{item.room}</p>
                      <h3 className="font-display text-xl font-light text-espresso md:text-2xl">{item.title}</h3>
                      <p className="label mt-1 normal-case tracking-normal text-brown">{item.location}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
