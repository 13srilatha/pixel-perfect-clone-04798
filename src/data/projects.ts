import project1 from "@/assets/projects/project-1.jpeg";
import project2 from "@/assets/projects/project-2.jpeg";
import project3 from "@/assets/projects/project-3.jpeg";
import project4 from "@/assets/projects/project-4.jpeg";
import project5 from "@/assets/projects/project-5.jpeg";
import project6 from "@/assets/projects/project-6.jpeg";
import munny3d from "@/assets/projects/munny-3d.jpeg";

export type ProjectStatus = "completed" | "in-progress" | "concept";

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: "Residential" | "Interior" | "Commercial" | "Renovation";
  status: ProjectStatus;
  image: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "munny-residence",
    title: "Munny Residence",
    location: "Chandigarh, India",
    year: "2025",
    category: "Residential",
    status: "in-progress",
    image: munny3d,
    description:
      "A three-storey contemporary home composed in stone, wood and glass. Cantilevered volumes wrap around a private courtyard and a stepped roof terrace.",
  },
  {
    id: "tree-of-life-villa",
    title: "Tree of Life Villa",
    location: "Chandigarh, India",
    year: "2025",
    category: "Residential",
    status: "completed",
    image: project1,
    description:
      "A meditative façade carved with the Bodhi motif. Wood, stone and ribbon balconies bring quiet weight to the street elevation.",
  },
  {
    id: "tree-of-life-villa-alt",
    title: "Tree of Life Villa · Side View",
    location: "Chandigarh, India",
    year: "2025",
    category: "Residential",
    status: "completed",
    image: project2,
    description:
      "Studied from the south, the villa reveals its full massing — a bold play of solid and void framed by glass railings.",
  },
  {
    id: "curved-residence",
    title: "Curved Residence",
    location: "Mohali, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project3,
    description:
      "A softened modernist envelope. The wrap-around white shell hugs marble and walnut interiors, opening to wood-lined balconies.",
  },
  {
    id: "vertical-fin-house",
    title: "Vertical Fin House",
    location: "Punjab, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project4,
    description:
      "Vertical metal fins sculpt light across the day. Wood-lined undersides warm the deep balconies above the street.",
  },
  {
    id: "twilight-house",
    title: "Twilight House",
    location: "Punjab, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project5,
    description:
      "Captured at dusk. Wall-washers carve out the wood-and-stone corner tower while the rooftop pergola opens to the sky.",
  },
  {
    id: "stair-light-residence",
    title: "Stair-Light Residence",
    location: "Punjab, India",
    year: "2023",
    category: "Residential",
    status: "completed",
    image: project6,
    description:
      "A minimal volume hiding a sculptural staircase. The floating treads are revealed to the street through a vertical slit window.",
  },
];

export const studio = {
  name: "Terra Space Studio",
  tagline: "Architecture rooted in earth, light, and craft.",
  city: "Chandigarh, India",
  email: "hello@terraspacestudio.in",
  phone: "+91 00000 00000",
  instagram: "@terraspacestudio",
  founded: "2019",
  stats: [
    { label: "Projects Completed", value: "40+" },
    { label: "Years of Practice", value: "6" },
    { label: "Cities", value: "5" },
    { label: "Awards", value: "3" },
  ],
};
