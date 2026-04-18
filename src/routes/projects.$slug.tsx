import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, images } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: [
        { title: `${p?.title ?? "Project"} — Terra Space Studio` },
        { name: "description", content: p?.shortDescription ?? "Project by Terra Space Studio" },
        { property: "og:title", content: `${p?.title} — Terra Space Studio` },
        { property: "og:description", content: p?.shortDescription ?? "" },
        { property: "og:image", content: p?.featuredImage ?? images.exterior1 },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background pt-32">
      <div className="text-center">
        <h1 className="font-serif text-5xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 underline">
          <ArrowLeft size={14} /> All projects
        </Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: (typeof projects)[number] };
  const ref = useReveal<HTMLDivElement>();
  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div ref={ref} className="bg-background">
      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-ink">
        <img src={project.featuredImage} alt={project.title} className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/80" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 md:px-10 pb-12 md:pb-16 text-ivory">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-ivory/75 hover:text-ivory">
            <ArrowLeft size={14} /> Projects
          </Link>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] max-w-4xl">
            {project.title}
          </h1>
          <div className="mt-5 text-[11px] tracking-[0.28em] uppercase text-ivory/70">
            {project.category} · {project.location} · {project.year}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5 reveal">
            <div className="eyebrow">— Brief</div>
            <p className="mt-6 font-serif text-3xl md:text-4xl leading-tight">
              {project.shortDescription}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal grid grid-cols-2 gap-y-6 border-t border-border pt-6">
            <Meta label="Location" value={project.location} />
            <Meta label="Year" value={String(project.year)} />
            <Meta label="Status" value={project.status} />
            <Meta label="Category" value={project.category} />
            <div className="col-span-2">
              <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Services</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-foreground/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 space-y-6">
          {project.galleryImages.map((g, i) => (
            <figure
              key={i}
              className={`reveal overflow-hidden ${
                i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3] md:max-w-[80%]"
              } ${i % 2 === 1 ? "md:ml-auto" : ""}`}
            >
              <img src={g} alt={`${project.title} — frame ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-stone-warm/30 py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between gap-6">
          <div>
            <div className="eyebrow">— Next project</div>
            <Link to="/projects/$slug" params={{ slug: next.slug }} className="mt-3 block font-serif text-3xl md:text-5xl hover:text-terra transition">
              {next.title} →
            </Link>
          </div>
          <Link to="/contact" className="hidden md:inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition">
            Start a project <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-lg">{value}</div>
    </div>
  );
}
