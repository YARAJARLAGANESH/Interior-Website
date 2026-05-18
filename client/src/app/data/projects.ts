export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  year: string;
  client?: string;
  location?: string;
  area?: string;
  featured?: boolean;
}

export const categories = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Renovation",
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Modern Minimalist Home",
    category: "Residential",
    shortDescription: "A serene living space with clean lines and natural materials",
    description: "This contemporary residential project showcases the perfect balance between minimalism and warmth. Using natural oak, soft textiles, and carefully curated lighting, we created a home that feels both spacious and inviting.",
    images: [],
    year: "2024",
    client: "Private Client",
    location: "Downtown",
    area: "2,400 sq ft",
    featured: true,
  },
  {
    id: "2",
    title: "Boutique Hotel Lobby",
    category: "Hospitality",
    shortDescription: "Luxurious entrance with custom furniture and ambient lighting",
    description: "A welcoming hotel lobby that combines classic elegance with modern comfort. Rich textures, brass accents, and plush seating create an unforgettable first impression.",
    images: [],
    year: "2024",
    client: "Lux Hotels Group",
    location: "City Center",
    area: "1,800 sq ft",
    featured: true,
  },
  {
    id: "3",
    title: "Creative Studio Office",
    category: "Commercial",
    shortDescription: "Inspiring workspace designed for collaboration and creativity",
    description: "This dynamic office space features flexible work zones, natural light, and sustainable materials. The design encourages creativity while maintaining professional functionality.",
    images: [],
    year: "2023",
    client: "Design Co.",
    location: "Tech District",
    area: "3,200 sq ft",
    featured: true,
  },
  {
    id: "4",
    title: "Victorian Home Restoration",
    category: "Renovation",
    shortDescription: "Preserving heritage while adding modern comfort",
    description: "A sensitive restoration that honors the home's Victorian character while integrating contemporary amenities. Original moldings and fireplaces were preserved and highlighted.",
    images: [],
    year: "2023",
    client: "Private Client",
    location: "Historic District",
    area: "3,600 sq ft",
    featured: false,
  },
  {
    id: "5",
    title: "Coastal Living Room",
    category: "Residential",
    shortDescription: "Breezy interiors inspired by seaside living",
    description: "Light-filled spaces with natural textures and coastal colors create a relaxing retreat. The design brings the outdoors in with large windows and organic materials.",
    images: [],
    year: "2024",
    client: "Private Client",
    location: "Beachside",
    area: "1,500 sq ft",
    featured: false,
  },
  {
    id: "6",
    title: "Fine Dining Restaurant",
    category: "Hospitality",
    shortDescription: "Sophisticated dining experience with intimate ambiance",
    description: "An upscale restaurant where every detail contributes to an exceptional dining experience. Custom lighting, rich materials, and thoughtful acoustics create the perfect atmosphere.",
    images: [],
    year: "2023",
    client: "Gourmet Restaurants",
    location: "Downtown",
    area: "2,800 sq ft",
    featured: false,
  },
  {
    id: "7",
    title: "Modern Kitchen Renovation",
    category: "Renovation",
    shortDescription: "Functional elegance for the heart of the home",
    description: "A complete kitchen transformation featuring custom cabinetry, marble countertops, and high-end appliances. The design maximizes storage while maintaining an open feel.",
    images: [],
    year: "2024",
    client: "Private Client",
    location: "Suburban",
    area: "400 sq ft",
    featured: false,
  },
  {
    id: "8",
    title: "Tech Startup Headquarters",
    category: "Commercial",
    shortDescription: "Innovative workspace for a growing company",
    description: "A flexible office environment that adapts to the needs of a fast-growing tech company. Features include collaborative zones, quiet rooms, and a central social hub.",
    images: [],
    year: "2024",
    client: "TechStart Inc.",
    location: "Innovation Park",
    area: "5,000 sq ft",
    featured: false,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    project: "Modern Minimalist Home",
    quote: "The attention to detail was extraordinary. Our home is exactly what we envisioned—elegant, functional, and truly ours.",
    rating: 5,
  },
  {
    id: "2",
    name: "James Rodriguez",
    project: "Boutique Hotel Lobby",
    quote: "Professional, creative, and always on time. The lobby has become a talking point for all our guests.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Chen",
    project: "Creative Studio Office",
    quote: "They transformed our workspace into an inspiring environment. Productivity and morale have never been higher.",
    rating: 5,
  },
];
