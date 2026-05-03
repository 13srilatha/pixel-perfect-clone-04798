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
  { image: s1, label: "01 · Approach", title: "You arrive.", body: "", side: "exterior" },
  { image: s2, label: "02 · Façade", title: "You pause.", body: "", side: "exterior" },
  { image: s3, label: "03 · Threshold", title: "You step inside.", body: "", side: "interior" },
  { image: s4, label: "04 · Living", title: "You exhale.", body: "", side: "interior" },
  { image: s5, label: "05 · Refuge", title: "You drift.", body: "", side: "interior" },
  { image: s6, label: "06 · Sky", title: "You arrive — again.", body: "", side: "interior" },
];
