import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Residential", "Commercial", "Kitchen", "Bathroom", "Office"];

  const projects: Array<{_id: string; title: string; category: string; description: string; image: string}> = [
    {
      _id: "modern-living-room",
      title: "Modern Living Space",
      category: "Residential",
      description: "Contemporary elegance meets comfort",
      image: "https://images.unsplash.com/photo-1760072513442-9872656c1b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVnYW50JTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTA3NzUzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      _id: "minimalist-bedroom",
      title: "Serene Bedroom Retreat",
      category: "Residential",
      description: "Minimalist design with warm undertones",
      image: "https://images.unsplash.com/photo-1763419161907-1e00b2f883c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGludGVyaW9yJTIwd2FybSUyMHRvbmVzfGVufDF8fHx8MTc3MTA3NzUzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      _id: "luxury-kitchen",
      title: "Culinary Excellence",
      category: "Kitchen",
      description: "Luxury kitchen with modern amenities",
      image: "https://images.unsplash.com/photo-1704383014594-01bc24b6b840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxMDA5MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      _id: "elegant-bathroom",
      title: "Spa-Inspired Sanctuary",
      category: "Bathroom",
      description: "Contemporary bathroom with spa aesthetics",
      image: "https://images.unsplash.com/photo-1750036015902-c6f5ebca924e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzEwNzc1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      _id: "sophisticated-dining",
      title: "Sophisticated Dining",
      category: "Residential",
      description: "Elegant dining space for entertaining",
      image: "https://images.unsplash.com/photo-1758448500631-644bb3c1c942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBzb3BoaXN0aWNhdGVkfGVufDF8fHx8MTc3MTA3NzUzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      _id: "modern-office",
      title: "Productive Home Office",
      category: "Office",
      description: "Modern workspace designed for productivity",
      image: "https://images.unsplash.com/photo-1651602855717-9f79c72893cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBtb2Rlcm58ZW58MXx8fHwxNzcxMDc3NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of thoughtfully designed spaces that blend aesthetics with functionality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl text-muted-foreground">
                No projects found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/${project._id}`}
                    className="group block"
                  >
                    <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                        {project.category}
                      </div>
                    </div>
                    <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Results count */}
          <div className="mt-12 text-center text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </section>
    </div>
  );
}
