import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import appCss from "../styles.css?url";

function CloudflareAnalytics() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.defer = true;
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: "0c628750a5104898a364de9e42f42ea9" }));
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-light text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-espresso bg-transparent px-6 py-3 text-xs uppercase tracking-[0.3em] text-espresso transition-colors hover:bg-espresso hover:text-cream"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Terra Space Studio — Architecture & Interior Design" },
      { name: "description", content: "Terra Space Studio designs residential architecture and interiors rooted in earth, light, and craft." },
      { property: "og:title", content: "Terra Space Studio — Architecture & Interior Design" },
      { property: "og:description", content: "Residential architecture and interior design. Walk through our spaces — from façade to foyer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&family=Tenor+Sans&family=Didact+Gothic&display=swap" },
    ],
    scripts: [
      // Microsoft Clarity
      {
        children: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "whr984219g");`
      },
      // Google Analytics 4
      { src: "https://www.googletagmanager.com/gtag/js?id=G-LHE11QCH96", async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LHE11QCH96');`
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <CloudflareAnalytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
