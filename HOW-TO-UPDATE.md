# How to update Terra Space Studio

This is your one-page cheat-sheet. Everything here is something you can do
yourself, no developer needed. All paths are relative to the project root.

---

## 1. Add a new project (Residential / Interior / Commercial / Renovation)

1. Drop the image into the right folder:
   - `src/assets/projects/` for any project image
   - File name in lowercase with dashes, e.g. `lake-villa.jpeg`

2. Open `src/data/projects.ts`, copy any existing entry inside `projects = [...]`,
   paste it at the bottom, change the fields:

   ```ts
   {
     id: "lake-villa",
     title: "Lake Villa",
     location: "Hyderabad, India",
     year: "2026",
     category: "Residential", // or "Interior" | "Commercial" | "Renovation"
     status: "in-progress",   // or "completed" | "concept"
     image: lakeVilla,         // same name as your import below
     description: "One short paragraph about the project.",
     materials: ["Walnut", "Travertine", "Brass"],
     intent: "The why — what made this house feel right.",
     approach: "How you worked through it.",
   },
   ```

3. At the very top of the same file, add the import:
   ```ts
   import lakeVilla from "@/assets/projects/lake-villa.jpeg";
   ```

That's it. The new card will show in the Work section under its category,
and on hover it will flip to reveal materials + intent.

---

## 2. Replace the architect's portrait

Just overwrite this exact file with the new photo (same filename):

```
src/assets/architect-portrait.jpeg
```

Recommended: portrait orientation, 4:5 ratio, 1024×1280 or larger.

---

## 3. Add the launch reel video

1. Drop your `.mp4` file into the `public/` folder at the project root, named
   exactly:

   ```
   public/reel.mp4
   ```

2. That's it. The site will auto-detect it and play it muted on scroll.
   Click still opens the Instagram reel.

3. Tips for the file:
   - Keep it under ~15 MB if possible (use [Handbrake](https://handbrake.fr/)
     or any online compressor — H.264, 720p, 2 Mbps bitrate works great).
   - 16:9 looks best in the slot.

---

## 4. Add a 3D building model (when your client sends the file)

When she gives you the model, ask for **`.glb`** format specifically. From
SketchUp she can export it via the *glTF Exporter* plugin (free); from Revit
or Blender it's a built-in export.

Then:

1. Drop the file into `public/models/` (create the folder if needed):
   ```
   public/models/munny-residence.glb
   ```

2. Tell me ("Add the 3D viewer using `/models/munny-residence.glb`") and I'll
   wire it into the Best Project section — it's a 5-minute change once the
   file exists.

---

## 5. Update studio details (phone, email, Instagram, address)

All in one place: `src/data/projects.ts` → bottom of the file → `export const studio = {...}`.

---

## 6. Add before / after construction pairs

1. Drop the two images into `src/assets/process/`
2. Open `src/data/interiors.ts`, scroll to `processPairs = [...]` and add a
   new entry (copy any existing one as template).

---

## 7. Add walkthrough scenes

The home walkthrough is 6 steps. To swap or add:

1. Drop new images into `src/assets/walkthrough/`
2. Edit `src/data/walkthrough.ts` — order matters (top = first scene seen).

---

## Anything else?

Tell me in chat what you want to change and I'll either do it or write it
into this guide.
