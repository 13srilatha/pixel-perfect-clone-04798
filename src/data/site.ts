import exterior1 from "@/assets/exterior-1.jpeg";
import exterior2 from "@/assets/exterior-2.jpeg";
import exterior3 from "@/assets/exterior-3.jpeg";
import exterior4 from "@/assets/exterior-4.jpeg";
import interior1 from "@/assets/interior-1.jpeg";
import interior2 from "@/assets/interior-2.jpeg";
import interior3 from "@/assets/interior-3.jpeg";
import interior4 from "@/assets/interior-4.jpeg";
import interior5 from "@/assets/interior-5.jpeg";
import construction1 from "@/assets/construction-1.jpeg";

export const images = {
  exterior1, exterior2, exterior3, exterior4,
  interior1, interior2, interior3, interior4, interior5,
  construction1,
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Residential" | "Interior" | "Mixed-use" | "Commercial";
  location: string;
  year: number;
  status: "Completed" | "Ongoing" | "Concept";
  services: string[];
  shortDescription: string;
  featuredImage: string;
  galleryImages: string[];
  bestProject?: boolean;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "the-lattice-house",
    title: "The Lattice House",
    category: "Residential",
    location: "Hyderabad, IN",
    year: 2025,
    status: "Completed",
    services: ["Architecture", "Interior Design", "Site Supervision"],
    shortDescription:
      "A three-storey residence wrapped in a perforated brick screen — daylight is filtered, never imposed.",
    featuredImage: exterior1,
    galleryImages: [exterior1, exterior3, interior1, interior4],
    bestProject: true,
    tags: ["G+2", "Brick screen", "Stone"],
  },
  {
    id: "2",
    slug: "warm-grain",
    title: "Warm Grain",
    category: "Residential",
    location: "Bengaluru, IN",
    year: 2025,
    status: "Completed",
    services: ["Architecture", "Interior Design"],
    shortDescription:
      "Timber fins, grey stone, soft white planes. A quiet rhythm at the city's edge.",
    featuredImage: exterior2,
    galleryImages: [exterior2, interior2, interior3],
    tags: ["Modern", "Timber"],
  },
  {
    id: "3",
    slug: "elevation-07",
    title: "Elevation 07",
    category: "Residential",
    location: "Visakhapatnam, IN",
    year: 2024,
    status: "Completed",
    services: ["Architecture", "Facade"],
    shortDescription:
      "A sculpted street facade — a single curved frame holds the entire elevation in tension.",
    featuredImage: exterior4,
    galleryImages: [exterior4, interior4],
    tags: ["Facade", "Sculptural"],
  },
  {
    id: "4",
    slug: "stone-and-shadow",
    title: "Stone & Shadow",
    category: "Residential",
    location: "Pune, IN",
    year: 2024,
    status: "Ongoing",
    services: ["Architecture", "Interior Design", "Construction"],
    shortDescription:
      "Stacked volumes, planted terraces, and a stone-clad core that anchors the home.",
    featuredImage: exterior3,
    galleryImages: [exterior3, construction1, interior5],
    tags: ["Terraces", "Stone"],
  },
  {
    id: "5",
    slug: "ivory-living",
    title: "Ivory Living",
    category: "Interior",
    location: "Hyderabad, IN",
    year: 2025,
    status: "Completed",
    services: ["Interior Design", "Bespoke Joinery"],
    shortDescription:
      "Walnut, ivory lacquer, and concealed warm light — a living wall composed like a still life.",
    featuredImage: interior1,
    galleryImages: [interior1, interior3, interior4],
    tags: ["Joinery", "Walnut"],
  },
  {
    id: "6",
    slug: "the-green-room",
    title: "The Green Room",
    category: "Interior",
    location: "Chennai, IN",
    year: 2025,
    status: "Ongoing",
    services: ["Interior Design", "Media Wall"],
    shortDescription:
      "A study in moss-green panelling and timber slats — a quiet room that holds a whole evening.",
    featuredImage: interior2,
    galleryImages: [interior2],
    tags: ["Media wall", "Panelling"],
  },
];

export const services = [
  {
    title: "Architectural Design",
    body: "Site studies, planning, elevations, and detailed working drawings tuned to climate and context.",
  },
  {
    title: "Interior Design",
    body: "Spatial planning, joinery, lighting, and material curation — coherent from doorframe to lampshade.",
  },
  {
    title: "Construction Management",
    body: "On-site supervision, vendor coordination, and quality control through to handover.",
  },
  {
    title: "3D Visualisation",
    body: "Photo-real exteriors and interiors so you can walk the home before the first stone is laid.",
  },
];

export const stats = [
  { value: "60+", label: "Projects realised" },
  { value: "12", label: "Cities" },
  { value: "9", label: "Years of practice" },
  { value: "100%", label: "Built by hand" },
];

export const journey = [
  { img: exterior1, title: "Approach", caption: "From the street, the screen reveals nothing and everything." },
  { img: exterior4, title: "Facade", caption: "A single sculpted frame holds the elevation in tension." },
  { img: exterior3, title: "Threshold", caption: "Stone underfoot. The garden steps aside." },
  { img: interior1, title: "Foyer", caption: "Walnut warmth, a niche of light." },
  { img: interior4, title: "Living", caption: "Marble, lacquer, the long quiet of the room." },
  { img: interior3, title: "Private", caption: "Curved ceilings hold the morning." },
];

export const journalPosts = [
  {
    title: "On filtered light",
    excerpt: "Why a perforated screen does more for a home than any window ever can.",
    date: "Mar 2026",
    readTime: "4 min",
  },
  {
    title: "Material honesty",
    excerpt: "Stone is not a finish. It is a decision about time.",
    date: "Feb 2026",
    readTime: "6 min",
  },
  {
    title: "The site visits nobody sees",
    excerpt: "Field notes from a year of construction Tuesdays.",
    date: "Jan 2026",
    readTime: "5 min",
  },
];
