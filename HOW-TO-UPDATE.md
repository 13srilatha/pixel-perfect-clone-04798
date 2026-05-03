# How to update Terra Space Studio

This is your one-page cheat-sheet. All paths are relative to the project root.
You can edit any of these files directly on GitHub — the site rebuilds on push.

---

## Folder map (where every image lives)

| What | Folder | Notes |
|---|---|---|
| Project images (Residential / Interior / Commercial / Renovation) | `src/assets/projects/` | One image per project. Use `.jpeg`. |
| In-Progress drawings (Plan, SketchUp, AutoCAD, Palette) | `src/assets/inprogress/` | 4 files: `plan.png`, `sketchup.png`, `autocad.png`, `palette.png` |
| Architect / founder portrait | `src/assets/architect-portrait.jpeg` | One file, overwrite to swap. |
| Walkthrough scenes (the cinematic story) | `src/assets/walkthrough/` | 6 ordered images: `01-approach.jpg` … `06-terrace.jpg` |
| Before / After slider pairs | `src/assets/process/` | Pair files referenced from `src/data/interiors.ts` |
| Logo (transparent) | `src/assets/terra-logo-transparent.png` | Keep transparent background. |
| Hero background image | `src/assets/projects/project-1.jpeg` | The big soft image behind the hero text. Change the file (or the import in `src/components/site/Nav.tsx` line 5) to swap. |
| Launch reel video | `public/reel.mp4` | Drop the `.mp4` here; auto-detected. |

> Tip: keep file names lowercase, use dashes, keep extensions consistent.

---

## 1. Add a new project (Residential / Interior / Commercial / Renovation)

1. Drop the image into `src/assets/projects/` (e.g. `lake-villa.jpeg`).
2. Open **`src/data/projects.ts`**, copy any entry inside the `projects = [...]` array, paste at the bottom, change the fields:

   ```ts
   {
     id: "lake-villa",
     title: "Lake Villa",
     location: "Hyderabad, India",
     year: "2026",
     category: "Residential", // "Residential" | "Interior" | "Commercial" | "Renovation"
     status: "in-progress",   // "completed" | "in-progress" | "concept"
     image: lakeVilla,
     description: "One short paragraph about the project.",
     materials: ["Walnut", "Travertine", "Brass"],
     intent: "The why — what made this house feel right.",
     approach: "How you worked through it.",
   },
   ```

3. At the **top of the same file**, add the import (lines 1–13 are the existing imports — add yours below them):
   ```ts
   import lakeVilla from "@/assets/projects/lake-villa.jpeg";
   ```

That's it. The new card will appear in the Work section under its category.

### To remove a project

Delete its `{ ... }` block in `src/data/projects.ts` and (optionally) the matching image file.

---

## 2. Replace the In-Progress drawings (Plan / SketchUp / AutoCAD / Palette)

These are the 4 floating images that drift out around the Munny Residence render. Just **overwrite the files** with the same names — no code change needed:

```
src/assets/inprogress/plan.png       ← hand sketch / plan
src/assets/inprogress/sketchup.png   ← 3D model
src/assets/inprogress/autocad.png    ← elevation / CAD
src/assets/inprogress/palette.png    ← material palette
```

Recommended: 4:3 aspect ratio, around 1200×900px, PNG.

To swap which **render** sits in the centre, change `image: munny3d` on the
`munny-residence` entry in `src/data/projects.ts` (line ~43).

---

## 3. Replace the founder portrait

Overwrite this exact file with the new photo (same filename):

```
src/assets/architect-portrait.jpeg
```

Recommended: portrait orientation, 4:5 ratio, 1024×1280 or larger.
Used in two places — the Architect section AND the centre of the Client Words testimonials.

---

## 4. Add the launch reel video

1. Drop your `.mp4` into the `public/` folder named exactly `reel.mp4`.
2. Currently the reel is not displayed on the homepage. To bring it back, ask Lovable to "re-add the reel section".
3. Tips: keep it under ~15 MB (use [Handbrake](https://handbrake.fr/), H.264, 720p).

---

## 5. Edit testimonials (Client Words)

Open **`src/components/site/Testimonials.tsx`**, find the `testimonials` array near the top (line ~10). Edit/add/remove entries:

```ts
{
  quote: "They listened more than they spoke...",
  name: "Charry Reddy",
  title: "Homeowner · Jubilee Hills",
},
```

Keep around **4 testimonials** — the fan-out animation is tuned for 4 cards.

---

## 6. Update studio details (phone, email, Instagram, address)

All in one place: bottom of `src/data/projects.ts` → `export const studio = {...}` (around line 225).

---

## 7. Add Before / After construction pairs

1. Drop the two images into `src/assets/process/`.
2. Open `src/data/interiors.ts`, scroll to `processPairs = [...]` and add a new entry (copy any existing one as template).

---

## 8. Update walkthrough scenes (the cinematic story)

The walkthrough is 6 ordered scenes.

1. Drop new images into `src/assets/walkthrough/` (keep the `01-`, `02-` … prefixes so the order stays correct).
2. Edit `src/data/walkthrough.ts` — only change the `title:` field if you want different headings (the long descriptions are intentionally blank now).

---

## 9. Edit the chatbot questions

Open **`src/components/site/ChatBot.tsx`**, find the `FAQ` array near the top (line ~15). Each entry is one preset question + answer:

```ts
{
  id: "services",
  question: "What services do you offer?",
  answer: "Residential architecture, interior design...",
},
```

---

## 10. Edit the Google Map location

Open `src/components/site/Contact.tsx`, find the `<iframe ... src="..." />` (around line 73). Replace the `q=` parameter in the URL with your address.

---

## Anything else?

Tell Lovable in chat what you want to change and it will either do it or extend this guide.
