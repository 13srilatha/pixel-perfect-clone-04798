import project1 from "@/assets/projects/project-1.jpeg";
import project2 from "@/assets/projects/project-2.jpeg";
import project3 from "@/assets/projects/project-3.jpeg";
import project4 from "@/assets/projects/project-4.jpeg";
import project5 from "@/assets/projects/project-5.jpeg";
import project6 from "@/assets/projects/project-6.jpeg";
import munny3d from "@/assets/projects/munny-3d.jpeg";
import commercial1 from "@/assets/projects/commercial-1.jpeg";
import commercial2 from "@/assets/projects/commercial-2.jpeg";
import commercial3 from "@/assets/projects/commercial-3.jpeg";
import renovation1 from "@/assets/projects/renovation-1.jpeg";
import renovation2 from "@/assets/projects/renovation-2.jpeg";
import renovation3 from "@/assets/projects/renovation-3.jpeg";

export type ProjectStatus = "completed" | "in-progress" | "concept";
export type ProjectCategory = "Residential" | "Interior" | "Commercial" | "Renovation";

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  image: string;
  description: string;
  /** Materials used — appears on the back of the flip card */
  materials?: string[];
  /** Why these materials / design intent — appears on the back of the flip card */
  intent?: string;
  /** Working style or process notes */
  approach?: string;
}

export const projects: Project[] = [
  {
    id: "munny-residence",
    title: "Munny Residence",
    location: "Hyderabad, India",
    year: "2025",
    category: "Residential",
    status: "in-progress",
    image: munny3d,
    description:
      "A three-storey contemporary home composed in stone, wood and glass. Cantilevered volumes wrap around a private courtyard and a stepped roof terrace.",
    materials: ["Dholpur sandstone", "Walnut veneer", "Low-iron glass", "Patinated brass"],
    intent:
      "A house that ages well — stone for permanence, walnut for warmth, glass to keep the family connected to their courtyard.",
    approach: "SketchUp massing → AutoCAD plans → site-built prototype joints → final detailing on site.",
  },
  {
    id: "tree-of-life-villa",
    title: "Tree of Life Villa",
    location: "Hyderabad, India",
    year: "2025",
    category: "Residential",
    status: "completed",
    image: project1,
    description:
      "A meditative façade carved with the Bodhi motif. Wood, stone and ribbon balconies bring quiet weight to the street elevation.",
    materials: ["Carved teak panel", "Kota stone cladding", "White lime render", "Black anodised aluminium"],
    intent: "The Bodhi motif faces east — the family wanted the morning sun to read it first.",
    approach: "Hand-sketched motif → CNC pattern study → on-site teak carving with local craftsmen.",
  },
  {
    id: "tree-of-life-villa-alt",
    title: "Tree of Life Villa · Side View",
    location: "Hyderabad, India",
    year: "2025",
    category: "Residential",
    status: "completed",
    image: project2,
    description:
      "Studied from the south, the villa reveals its full massing — a bold play of solid and void framed by glass railings.",
    materials: ["Lime-rendered RCC", "Toughened glass railings", "Teak louvres", "Kota stone plinth"],
    intent: "The south façade is mostly closed to keep the house cool — voids are placed where the breeze enters.",
    approach: "Solar study in SketchUp → balcony depth tuned to block summer sun, admit winter sun.",
  },
  {
    id: "curved-residence",
    title: "Curved Residence",
    location: "Hyderabad, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project3,
    description:
      "A softened modernist envelope. The wrap-around white shell hugs marble and walnut interiors, opening to wood-lined balconies.",
    materials: ["Curved RCC shell", "Italian marble", "Burmese teak", "Matte white render"],
    intent: "A house with no sharp corners — designed for a young family with toddlers and grandparents under one roof.",
    approach: "3D-printed model first, then refined curves in Rhino before AutoCAD documentation.",
  },
  {
    id: "vertical-fin-house",
    title: "Vertical Fin House",
    location: "Hyderabad, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project4,
    description:
      "Vertical metal fins sculpt light across the day. Wood-lined undersides warm the deep balconies above the street.",
    materials: ["Powder-coated steel fins", "Burma teak soffit", "Granite base", "White stucco"],
    intent: "Privacy without curtains — the fins screen the street while keeping the views and breeze.",
    approach: "Light-and-shadow studies through the day in SketchUp before fin spacing was finalised.",
  },
  {
    id: "twilight-house",
    title: "Twilight House",
    location: "Hyderabad, India",
    year: "2024",
    category: "Residential",
    status: "completed",
    image: project5,
    description:
      "Captured at dusk. Wall-washers carve out the wood-and-stone corner tower while the rooftop pergola opens to the sky.",
    materials: ["Random rubble stone", "Sapele wood cladding", "Hidden LED wall-washers", "Black metal pergola"],
    intent: "The corner tower is the family's evening room — designed to glow from inside out at twilight.",
    approach: "Lighting layout drawn first, then the architecture wrapped around the light.",
  },
  {
    id: "stair-light-residence",
    title: "Stair-Light Residence",
    location: "Hyderabad, India",
    year: "2023",
    category: "Residential",
    status: "completed",
    image: project6,
    description:
      "A minimal volume hiding a sculptural staircase. The floating treads are revealed to the street through a vertical slit window.",
    materials: ["Cantilevered concrete treads", "Smoked oak handrail", "Frameless glass slit window", "Polished plaster"],
    intent: "We wanted the stair to be the house's secret — visible only to those who slow down at night.",
    approach: "Structural cantilever resolved with a steel spine inside the wall — drawn in detail with our engineer.",
  },

  // Commercial
  {
    id: "office-reception",
    title: "Walnut Reception Lounge",
    location: "Hyderabad, India",
    year: "2024",
    category: "Commercial",
    status: "completed",
    image: commercial1,
    description:
      "A corporate reception that reads like a hotel lobby. Fluted walnut, polished travertine and a single sculptural pendant.",
    materials: ["Fluted walnut panelling", "Travertine flooring", "Brass pendant lighting", "Tan leather lounges"],
    intent: "The brief was 'calm authority' — soft materials for confidence, not aggression.",
    approach: "Material samples reviewed in client's actual light → final palette locked in one meeting.",
  },
  {
    id: "boutique-cafe",
    title: "Arched Window Café",
    location: "Hyderabad, India",
    year: "2024",
    category: "Commercial",
    status: "completed",
    image: commercial2,
    description:
      "A 38-seat café in a restored heritage shell. Lime plaster, walnut counter and rattan pendants over marble bistro tops.",
    materials: ["Restored lime plaster", "Walnut counter with brass inlay", "Rattan pendants", "Carrara marble tops"],
    intent: "Honour the old building, host the new ritual.",
    approach: "Existing arch documented in detail before any new joinery was drawn.",
  },
  {
    id: "boutique-showroom",
    title: "Boutique Showroom",
    location: "Hyderabad, India",
    year: "2023",
    category: "Commercial",
    status: "completed",
    image: commercial3,
    description:
      "A small-format retail space where fluted oak, brass shelves and a sculptural pendant cluster make every object feel chosen.",
    materials: ["Fluted oak panels", "Brass floating shelves", "Polished concrete floor", "Brass sputnik pendant"],
    intent: "Light pulls the eye across the wall — every product gets its turn under the pin-spot.",
    approach: "Lighting plan led the design — joinery was sized to match the cones of light.",
  },

  // Renovation
  {
    id: "heritage-bungalow",
    title: "Heritage Bungalow Restoration",
    location: "Hyderabad, India",
    year: "2024",
    category: "Renovation",
    status: "completed",
    image: renovation1,
    description:
      "Lime-washed walls, restored teak shutters and a sympathetically updated terracotta roof. The house kept its memory.",
    materials: ["Lime wash (chuna)", "Restored teak shutters", "Mangalore tile roof", "Original mosaic flooring"],
    intent: "Repair, do not replace. The family had grown up here — every restored detail mattered.",
    approach: "Heritage audit first → repair-vs-replace mapped room by room with the client.",
  },
  {
    id: "apartment-revival",
    title: "Apartment Revival",
    location: "Hyderabad, India",
    year: "2023",
    category: "Renovation",
    status: "completed",
    image: renovation2,
    description:
      "Original mosaic floor preserved, teak ceiling beams uncovered, the apartment opened back up to its arched window and morning light.",
    materials: ["Restored mosaic flooring", "Exposed teak beams", "Cream lime plaster", "Jute rug + walnut sofa"],
    intent: "Strip back what the previous owners had hidden — let the building's bones speak again.",
    approach: "Selective demolition photographed for the client every day — decisions made together.",
  },
  {
    id: "kitchen-refit",
    title: "Brick Wall Kitchen Refit",
    location: "Hyderabad, India",
    year: "2023",
    category: "Renovation",
    status: "completed",
    image: renovation3,
    description:
      "Original brick wall kept exposed and sealed. New cream cabinetry, polished concrete tops and brass pulls — the kitchen the house always wanted.",
    materials: ["Sealed exposed brick", "Cream lacquered cabinetry", "Polished concrete countertop", "Antique brass tap & pulls"],
    intent: "Earn the warmth from the old wall, not from a new finish.",
    approach: "Brick wall test-cleaned in three patches before the client chose the final tone.",
  },
];

export const studio = {
  name: "Terra Space Studio",
  tagline: "Architecture rooted in earth, light, and craft.",
  city: "Hyderabad, Telangana, India",
  address: "Street-2, Viharika Colony, Hyderabad, Telangana, 50098",
  email: "terraspacestudios07@gmail.com",
  phone: "+91 6305707859",
  instagram: "terra_spacestudio",
  instagramUrl:
    "https://www.instagram.com/terra_spacestudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  reelUrl:
    "https://www.instagram.com/reel/DXHC-RsgerM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  founded: "2019",
  stats: [
    { label: "Projects Completed", value: "40+" },
    { label: "Years of Practice", value: "6" },
    { label: "Cities", value: "5" },
    { label: "Awards", value: "3" },
  ],
};
