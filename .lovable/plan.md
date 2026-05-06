# Rebuild Plan — Hero, Work, Testimonials

I hear you on the hero. I'll fix all four issues in one pass and make the homepage feel intentional, not generic. Here's exactly what I'll build.

---

## 1. Testimonials — true "one image → 5 cards → flip" (no gaps, no drift)

Current problem: cards translate apart with visible gaps, then flip. You want it to LOOK like one image that splits cleanly and each panel flips in place.

Fix:
- Replace the current 3-card layout with a **5-panel CSS grid** of one single image (each panel is a `background-image` of the same source, with `background-position` shifted so the 5 panels reconstruct one seamless picture — like a sliced poster).
- On scroll Phase 1: panels are flush, gap = 0, looks like one photo.
- On scroll Phase 2: each panel does an in-place 3D `rotateY(180deg)` flip on its own — staggered (panel 1 first, then 2, etc.). NO horizontal translation. NO gap. They flip where they sit.
- Back of each panel = one client testimonial (name, project, quote).
- Mobile: stack 5 panels vertically, same flip animation.

Tech: GSAP ScrollTrigger pinned section + `transform-style: preserve-3d` on each panel inner.

---

## 2. Hero — Accordion Slider storytelling (replaces current chapter scroll)

Inspired by your Accordion Slider Pro / real-estate reference. Architecture-themed.

Layout: **5 vertical accordion panels** filling the viewport side by side. One panel is "open" (wide, full color, shows headline + meta), the others are collapsed (narrow, desaturated, show only category label vertically).

Interaction:
- **Hover (desktop)** or **tap (mobile)**: panel expands, others collapse — smooth width transition.
- **Auto-rotate** every 5s if user is idle, so it feels alive on first load.
- Each panel is a real Terra Space service category:
  1. `01 Residential` — "Homes built around how your family actually lives."
  2. `02 Interior` — "Joinery, light and material — room by room."
  3. `03 Commercial` — "Cafés and workplaces with the warmth of home."
  4. `04 Renovation` — "Old buildings, listened to. Restored with care."
  5. `05 Vastu & Planning` — "Site, orientation, flow — designed before a wall is drawn."
- Inside the open panel: numeral, category, headline, 1-line description, meta chips ("Concept · Drawings · Site"), and a small "Explore →" link that scrolls to that section in Work.

This replaces the current pinned-chapter scroll hero entirely.

---

## 3. Work — sticky service text that scrolls horizontally WITH the gallery

Current Work has a horizontal scroll for Residential / Interior / Commercial. You want the heading + description for each category to ride alongside the images as they scroll horizontally.

Fix:
- Convert each category section to a **pinned horizontal-scroll panel** (GSAP ScrollTrigger horizontal).
- Left third (sticky inside the pin): category number, title, description, service chips.
- Right two-thirds: the project images scroll horizontally past as the user scrolls vertically.
- When that category's images finish, the pin releases and the next category begins — text and images change together, in sync.

This makes each category feel like a chapter, not a slider.

---

## 4. Polish

- Keep Lenis smooth scroll.
- Remove the now-redundant `ChapterIntro` panels for Hero (keep them for Walkthrough / Process / Testimonials so the editorial rhythm stays).
- Generate one new cinematic interior hero image to anchor the Testimonials split.

---

## Files I'll touch

- `src/components/site/Nav.tsx` — replace Hero with new `AccordionHero`.
- `src/components/site/Testimonials.tsx` — rewrite with 5-panel split-flip (no translate).
- `src/components/site/Work.tsx` — convert each category to pinned horizontal scroll with sticky text.
- `src/routes/index.tsx` — remove Hero chapter intro, keep others.
- `src/assets/testimonials-hero.jpg` — regenerate as a wide cinematic interior that slices cleanly into 5.

## What I will NOT change

- Walkthrough, Process, Architect, Contact, ChatBot, StudioLaunch — untouched.
- Color tokens, fonts, logo — untouched.
- Backend / forms — untouched.

If this matches what you want, approve and I'll build it end-to-end in one go.