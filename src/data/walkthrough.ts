import s1 from "@/assets/walkthrough/01-approach.jpg";
import s2 from "@/assets/walkthrough/02-facade.jpg";
import s3 from "@/assets/walkthrough/03-foyer.jpg";
import s4 from "@/assets/walkthrough/04-living.jpg";
import s5 from "@/assets/walkthrough/05-bedroom.jpg";
import s6 from "@/assets/walkthrough/06-terrace.jpg";

export interface WalkStep {
  image: string;
  label: string;
  title: string;
  body: string;
  side: "exterior" | "interior";
}

export const walkthrough: WalkStep[] = [
  { image: s1, label: "01 · Approach", title: "You arrive.", body: "The driveway softens under your feet. Palms part. A wall of white render, a lantern of warm light beyond.", side: "exterior" },
  { image: s2, label: "02 · Façade", title: "You pause.", body: "Walnut battens, raw stone, the brass house number warmed by the last of the sun. Architecture that wants to be touched.", side: "exterior" },
  { image: s3, label: "03 · Threshold", title: "You step inside.", body: "The pivot door swings. The world is suddenly quieter. A double-height foyer holds the silence.", side: "interior" },
  { image: s4, label: "04 · Living", title: "You exhale.", body: "Linen, walnut, marble. Light that has travelled through trees. A room designed for slow conversations.", side: "interior" },
  { image: s5, label: "05 · Refuge", title: "You drift.", body: "Sheers filter golden hour into the bedroom. The wood absorbs sound. Your shoulders drop without permission.", side: "interior" },
  { image: s6, label: "06 · Sky", title: "You arrive — again.", body: "On the roof, the city falls away. The pergola frames the sun. This is what we build for.", side: "interior" },
];
