# How to update Terra Space Studio

A plain-English guide for changing every image, video, and detail on the
website without touching design or animations. All paths are relative to the
project root (the folder that contains `package.json`).

> 📁 Rule of thumb: **drop the new image into the right folder using the
> SAME filename as the old one** and the website will pick it up
> automatically. No code changes needed in that case. If you want to add a
> NEW project / image (not replace), follow the "Add new" instructions below.

---

## Folder map (where every image lives)

```
src/assets/
├── architect-portrait.jpeg     ← Founder photo (About + Client Words center)
├── hero-feature.jpg            ← Big image on the home hero (top of page)
├── terra-logo-transparent.png  ← Logo used in nav + footer
│
├── projects/                   ← All Work-section project images
│   ├── munny-3d.jpeg           ← The "In Progress" featured render (Munny)
│   ├── project-1.jpeg          ← Residential — Tree of Life Villa
│   ├── project-2.jpeg          ← Residential — Tree of Life · Side View
│   ├── project-3.jpeg          ← Residential — Curved Residence
│   ├── project-4.jpeg          ← Residential — Vertical Fin House
│   ├── project-5.jpeg          ← Residential — Twilight House
│   ├── project-6.jpeg          ← Residential — Stair-Light Residence
│   ├── commercial-1.jpeg       ← Commercial — Walnut Reception Lounge
│   ├── commercial-2.jpeg       ← Commercial — Arched Window Café
│   ├── commercial-3.jpeg       ← Commercial — Boutique Showroom
│   ├── renovation-1.jpeg       ← Renovation — Heritage Bungalow
│   ├── renovation-2.jpeg       ← Renovation — Apartment Revival
│   └── renovation-3.jpeg       ← Renovation — Brick Wall Kitchen Refit
│
├── interiors/                  ← All Interior-category images
│   ├── interior-1.jpeg         ← Walnut Arch Niche
│   ├── interior-2.jpeg         ← Forest Media Wall
│   ├── interior-3.jpeg         ← Fluted Walnut Partition
│   ├── interior-4.jpeg         ← Reeded Glass Screen
│   ├── interior-5.jpeg         ← Lit Display Spine
│   ├── interior-6.jpeg         ← Glossy Wardrobe System
│   └── interior-7.jpeg         ← Fluted Glass Bar Cabinet
│
├── process/                    ← Before/After construction pairs
│   ├── before-media.jpeg
│   ├── after-media.jpeg
│   ├── before-structure.jpeg
│   └── after-structure.jpeg
│
├── walkthrough/                ← Home walkthrough scenes (6 slides)
│   └── *.jpeg                  ← (see src/data/walkthrough.ts for order)
│
└── rotation/                   ← Rotating gallery (legacy / optional)

public/
├── reel.mp4                    ← Studio launch reel (homepage video)
└── models/                     ← (optional) 3D building models
```

---

## 1. Replace any existing image (the easy way)

The fastest way: keep the same filename and just overwrite the file on
GitHub.

1. Go to your GitHub repo in the browser.
2. Open the folder (e.g. `src/assets/projects/`).
3. Click the file you want to replace (e.g. `project-3.jpeg`).
4. Click the pencil icon → **"Replace this file"** → upload the new image.
5. Commit. The site will redeploy automatically.

> Make sure the new image keeps the **same file extension** (`.jpeg` for
> jpeg, `.png` for png). If it's a different type, see section 2.

### What replaces what — quick lookup

| To change…                                | Replace this file                                  |
|-------------------------------------------|----------------------------------------------------|
| Founder photo (Architect + Client Words)  | `src/assets/architect-portrait.jpeg`               |
| Hero image on the home page               | `src/assets/hero-feature.jpg`                      |
| Logo (nav + footer)                       | `src/assets/terra-logo-transparent.png`            |
| **In-Progress** featured render (Munny)   | `src/assets/projects/munny-3d.jpeg`                |
| Residential project 1 (Tree of Life)      | `src/assets/projects/project-1.jpeg`               |
| Residential project 2                     | `src/assets/projects/project-2.jpeg`               |
| Residential project 3 (Curved)            | `src/assets/projects/project-3.jpeg`               |
| Residential project 4 (Vertical Fin)      | `src/assets/projects/project-4.jpeg`               |
| Residential project 5 (Twilight)          | `src/assets/projects/project-5.jpeg`               |
| Residential project 6 (Stair-Light)       | `src/assets/projects/project-6.jpeg`               |
| Commercial project 1 (Reception)          | `src/assets/projects/commercial-1.jpeg`            |
| Commercial project 2 (Café)               | `src/assets/projects/commercial-2.jpeg`            |
| Commercial project 3 (Showroom)           | `src/assets/projects/commercial-3.jpeg`            |
| Renovation 1 (Heritage Bungalow)          | `src/assets/projects/renovation-1.jpeg`            |
| Renovation 2 (Apartment Revival)          | `src/assets/projects/renovation-2.jpeg`            |
| Renovation 3 (Brick Wall Kitchen)         | `src/assets/projects/renovation-3.jpeg`            |
| Interior 1 (Walnut Arch Niche)            | `src/assets/interiors/interior-1.jpeg`             |
| Interior 2 (Forest Media Wall)            | `src/assets/interiors/interior-2.jpeg`             |
| Interior 3 (Fluted Partition)             | `src/assets/interiors/interior-3.jpeg`             |
| Interior 4 (Reeded Glass)                 | `src/assets/interiors/interior-4.jpeg`             |
| Interior 5 (Lit Spine)                    | `src/assets/interiors/interior-5.jpeg`             |
| Interior 6 (Wardrobe)                     | `src/assets/interiors/interior-6.jpeg`             |
| Interior 7 (Bar Cabinet)                  | `src/assets/interiors/interior-7.jpeg`             |
| Before — media wall                       | `src/assets/process/before-media.jpeg`             |
| After  — media wall                       | `src/assets/process/after-media.jpeg`              |
| Before — structure                        | `src/assets/process/before-structure.jpeg`         |
| After  — structure                        | `src/assets/process/after-structure.jpeg`          |
| Launch reel video                         | `public/reel.mp4`                                  |

That's it for the simple case. Done.

---

## 2. Add a NEW project (Residential / Interior / Commercial / Renovation)

Two files to touch:
- `src/assets/projects/<your-image>.jpeg` (or `.png`)
- `src/data/projects.ts`

### Step A — drop the image

Put it in `src/assets/projects/`. Use lowercase with dashes,
e.g. `lake-villa.jpeg`.

### Step B — register it in `src/data/projects.ts`

1. **Top of the file** (around lines 1–13), add an import line:
   ```ts
   import lakeVilla from "@/assets/projects/lake-villa.jpeg";
   ```

2. **Inside the `projects` array** (starts around line 35), copy any
   existing entry, paste at the bottom of its category, edit the fields:
   ```ts
   {
     id: "lake-villa",
     title: "Lake Villa",
     location: "Hyderabad, India",
     year: "2026",
     category: "Residential",          // or "Interior" | "Commercial" | "Renovation"
     status: "in-progress",            // or "completed" | "concept"
     image: lakeVilla,                  // must match the import name above
     description: "Short paragraph.",
     materials: ["Walnut", "Travertine", "Brass"],
     intent: "Why this house feels right.",
     approach: "How you worked through it.",
   },
   ```

The new card shows up in the Work section under its category automatically.

> ⚠️ Only **one** project should have `status: "in-progress"` at a time —
> that one becomes the big "In Progress" card with the scroll animation.

---

## 3. Add a NEW interior (Interior gallery)

Same idea, in a different file:

- `src/assets/interiors/interior-NEW.jpeg`
- `src/data/interiors.ts`

In `src/data/interiors.ts`:
1. Top of file (lines 1–7), add the import:
   ```ts
   import iNew from "@/assets/interiors/interior-NEW.jpeg";
   ```
2. Inside the `interiors` array (starts around line 18), add an entry:
   ```ts
   { id: "name", title: "Title", room: "Living · Display",
     location: "Hyderabad, India", image: iNew,
     description: "One-line description." },
   ```

---

## 4. Add a Before / After construction pair

- Drop both images into `src/assets/process/`
- Edit `src/data/interiors.ts`, scroll to `processPairs = [...]` (around
  line 41), copy any existing entry, change the fields and update the
  imports at the top of that file (around lines 28–31).

---

## 5. Update walkthrough scenes (6-step home walkthrough)

- Drop new images into `src/assets/walkthrough/`
- Edit `src/data/walkthrough.ts` — order in the array = order on the page.

---

## 6. Replace the architect's portrait

Just overwrite this file with the new photo (same filename):

```
src/assets/architect-portrait.jpeg
```

Recommended: portrait orientation, 4:5 ratio, 1024×1280 or larger.

This image appears in TWO places automatically:
- Architect / About section
- Center of the "Client Words" testimonial spread

---

## 7. Update the launch reel video

1. Replace this file with your new mp4 (same filename):
   ```
   public/reel.mp4
   ```
2. Tips: under ~15 MB if possible (use [Handbrake](https://handbrake.fr/) —
   H.264, 720p, 2 Mbps). 16:9 looks best.

---

## 8. Add a 3D building model (when client sends one)

Ask the client for a **`.glb`** file (SketchUp → glTF Exporter plugin;
Blender / Revit have built-in export).

1. Drop the file into `public/models/` (create the folder if needed):
   ```
   public/models/munny-residence.glb
   ```
2. Tell the developer ("Add the 3D viewer using `/models/munny-residence.glb`")
  — wiring it in is a 5-minute change once the file exists.

---

## 9. Update studio details (phone, email, Instagram, address)

Open `src/data/projects.ts` and scroll to the very bottom — `export const studio = { ... }` (around line 225). Edit values directly.

---

## 10. Update client words / testimonials text

Open `src/components/site/Testimonials.tsx`. The four testimonials live in
the `CARDS` array near the top of the file (around line 25). Edit name,
city, and quote in place.

---

## 11. Image guidelines (so things look sharp)

| Image type            | Aspect / size suggestion         |
|-----------------------|----------------------------------|
| Hero feature          | 16:10, 1920×1200                 |
| Project card          | 4:3, 1600×1200                   |
| Interior card         | 4:5 portrait OR 4:3, 1400×1050   |
| Founder portrait      | 4:5 portrait, 1024×1280          |
| Before/After pairs    | Same aspect ratio for both!      |
| Walkthrough scene     | 16:10 or 16:9, 1920×1080         |
| Logo (transparent)    | PNG, square, 800×800             |

Keep file size under 600 KB per image. Use [Squoosh](https://squoosh.app/)
to compress before uploading.

---

## Anything else?

Tell me in chat what you want to change and I'll do it, or write the
instructions into this guide.
