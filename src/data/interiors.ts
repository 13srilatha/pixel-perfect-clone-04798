import i1 from "@/assets/interiors/interior-1.jpeg";
import i2 from "@/assets/interiors/interior-2.jpeg";
import i3 from "@/assets/interiors/interior-3.jpeg";
import i4 from "@/assets/interiors/interior-4.jpeg";
import i5 from "@/assets/interiors/interior-5.jpeg";
import i6 from "@/assets/interiors/interior-6.jpeg";
import i7 from "@/assets/interiors/interior-7.jpeg";

export interface Interior {
  id: string;
  title: string;
  room: string;
  location: string;
  image: string;
  description: string;
}

export const interiors: Interior[] = [
  { id: "wood-arch-niche", title: "Walnut Arch Niche", room: "Living · Display", location: "Chandigarh, India", image: i1, description: "Backlit walnut arches frame a sculptural display niche — soft glow, mirrored insets, hand-finished veneer." },
  { id: "fluted-partition", title: "Fluted Walnut Partition", room: "Foyer · Divider", location: "Mohali, India", image: i3, description: "A floor-to-ceiling fluted screen separates foyer and living without closing the space." },
  { id: "reeded-glass-screen", title: "Reeded Glass Screen", room: "Living · Pooja", location: "Punjab, India", image: i4, description: "Reeded glass and arched openings shape a quiet pooja vignette behind the lounge." },
  { id: "lit-display-spine", title: "Lit Display Spine", room: "Living · Niche", location: "Punjab, India", image: i5, description: "Coloured pin-spots illuminate a curated spine of family heirlooms." },
  { id: "wardrobe-system", title: "Glossy Wardrobe System", room: "Bedroom · Storage", location: "Chandigarh, India", image: i6, description: "High-gloss lacquer and matte oak in a built-in wardrobe — soft-close, brassless pulls." },
  { id: "fluted-glass-bar", title: "Fluted Glass Bar Cabinet", room: "Dining · Bar", location: "Chandigarh, India", image: i7, description: "A four-door bar cabinet in fluted glass and dark steel, internally lit." },
  { id: "media-wall", title: "Forest Media Wall", room: "Living · Media", location: "Punjab, India", image: i2, description: "Deep-green panelled media wall with linear oak ceiling and asymmetric oak shelving." },
];

import b1 from "@/assets/process/before-1.jpeg";
import b2 from "@/assets/process/before-2.jpeg";

export interface ProcessPair {
  id: string;
  title: string;
  caption: string;
  before: string;
  after: string;
}

export const processPairs: ProcessPair[] = [
  {
    id: "media-wall-evolution",
    title: "From bare board to forest wall",
    caption: "Plywood substrate, ceiling battens and base cabinetry — sketched on site, finished in deep green panelling and oak.",
    before: b1,
    after: i2,
  },
  {
    id: "structure-to-skin",
    title: "From structure to skin",
    caption: "Cast columns and shuttering on day one — the same volume, months later, dressed in walnut, glass and warm light.",
    before: b2,
    after: i1,
  },
];
