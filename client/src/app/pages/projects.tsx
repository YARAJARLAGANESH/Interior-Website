import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import api from '../../api/api';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        console.log('Projects API response:', response.data);
        if (response.data.projects) {
          console.log('Rendering projects from API:', response.data.projects);
          console.log('Sample project._id:', response.data.projects[0]?._id);
          console.log('Sample project.images:', response.data.projects[0]?.images);
          setProjects(response.data.projects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [...new Set(projects.map(p => p.category))];
  const uniqueCategories = ['All', ...categories];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  console.log('Rendering projects component', { projectCount: projects.length, filteredCount: filteredProjects.length });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6 leading-tight">Our Projects</h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of beautifully designed spaces that combine elegance with functionality
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 md:py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 md:px-6 py-2 rounded-full transition-all text-sm md:text-base ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 md:py-20">
              <p className="text-lg md:text-xl text-foreground/60">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 md:py-20">
              <p className="text-lg md:text-xl text-red-500">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 md:py-20">
              <p className="text-lg md:text-xl text-foreground/60">No projects found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <Link key={project._id} to={`/projects/${project._id}`} className="group">
                    <Card className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 rounded-xl">
                      <div className="relative h-72 md:h-80 overflow-hidden bg-gray-200">
                        {project.images && project.images.length > 0 ? (
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-5 md:p-6">
                        <h3 className="text-xl md:text-2xl mb-1.5 md:mb-2">{project.title}</h3>
                        <p className="text-foreground/70 line-clamp-2 text-sm md:text-base leading-relaxed">{project.description || project.location}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Results count */}
              <div className="mt-6 md:mt-8 text-center text-foreground/60 text-sm md:text-base">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}