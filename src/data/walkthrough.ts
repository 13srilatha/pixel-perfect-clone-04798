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
  { image: s1, label: "01 · Approach", title: "You arrive.", body: "Home calls you in — softly, like amma's voice.", side: "exterior" },
  { image: s2, label: "02 · Façade", title: "You pause.", body: "The walls hold the warmth of the evening sun.", side: "exterior" },
  { image: s3, label: "03 · Threshold", title: "You step in.", body: "The world quiets. The house begins to listen.", side: "interior" },
  { image: s4, label: "04 · Living", title: "You exhale.", body: "Light, laughter, the clink of chai cups — a room made for togetherness.", side: "interior" },
  { image: s5, label: "05 · Refuge", title: "You rest.", body: "Sheers, soft wood, slow breaths. Your shoulders drop.", side: "interior" },
  { image: s6, label: "06 · Sky", title: "You belong.", body: "On the terrace, the sky leans down to meet you. This is home.", side: "interior" },
];
