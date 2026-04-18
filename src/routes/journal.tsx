import { createFileRoute } from "@tanstack/react-router";
import { journalPosts, images } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Terra Space Studio" },
      {
        name: "description",
        content: "Notes from the studio — essays on light, material, and the long work of designing homes.",
      },
      { property: "og:title", content: "Journal — Terra Space Studio" },
      { property: "og:description", content: "Notes from the studio." },
      { property: "og:image", content: images.interior4 },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="bg-background">
      <header className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow reveal">— Journal</div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] max-w-3xl reveal">
            Notes from
            <br />
            <em className="text-terra">a slow practice.</em>
          </h1>
        </div>
      </header>

      <section className="pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-px bg-border md:grid-cols-2">
            {journalPosts.map((p, i) => (
              <article key={p.title} className="reveal group bg-background p-8 md:p-12">
                <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                  Essay 0{i + 1} · {p.date} · {p.readTime}
                </div>
                <h2 className="mt-5 font-serif text-3xl md:text-4xl leading-tight">{p.title}</h2>
                <p className="mt-4 max-w-md text-foreground/70 leading-relaxed">{p.excerpt}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-foreground/60 group-hover:text-foreground transition">
                  Read essay <ArrowUpRight size={14} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
