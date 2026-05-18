import { Link, useParams } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Ruler, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import api from '../../api/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        console.log("Project from API:", response.data);
        if (response.data.project) {
          setProject(response.data.project);
          
          // Fetch related projects
          const allResponse = await api.get('/projects');
          if (allResponse.data.projects) {
            const related = allResponse.data.projects
              .filter((p: any) => p.category === response.data.project.category && p._id !== id)
              .slice(0, 3);
            setRelatedProjects(related);
          }
        }
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 md:py-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/projects">
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[70vh] bg-gray-200">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
      </section>

      {/* Project Details */}
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-3 md:mb-4">
                <span className="inline-block bg-primary text-primary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm">
                  {project.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 leading-tight">{project.title}</h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-6 md:mb-8 leading-relaxed">
                {project.description}
              </p>
              <div className="prose prose-lg max-w-none text-foreground/70 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  This project represents our commitment to creating spaces that are both beautiful and functional. 
                  Every element was carefully considered, from the material selection to the lighting design, 
                  ensuring that the final result exceeded our client's expectations.
                </p>
                <p>
                  We worked closely with the client to understand their lifestyle and preferences, translating 
                  their vision into a cohesive design that reflects their personality while incorporating our 
                  expertise in creating timeless, elegant interiors.
                </p>
              </div>
            </div>

            {/* Sidebar Info */}
            <div>
              <Card className="border-border rounded-xl">
                <CardContent className="p-5 md:p-6 space-y-5 md:space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl mb-3 md:mb-4">Project Details</h3>
                  </div>
                  
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <User className="text-primary mt-1" size={20} />
                      <div>
                        <div className="text-xs md:text-sm text-foreground/60">Client</div>
                        <div className="font-medium text-sm md:text-base">{project.client}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="text-primary mt-1" size={20} />
                    <div>
                      <div className="text-xs md:text-sm text-foreground/60">Year</div>
                      <div className="font-medium text-sm md:text-base">{project.year}</div>
                    </div>
                  </div>

                  {project.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div>
                        <div className="text-xs md:text-sm text-foreground/60">Location</div>
                        <div className="font-medium text-sm md:text-base">{project.location}</div>
                      </div>
                    </div>
                  )}

                  {project.area && (
                    <div className="flex items-start gap-3">
                      <Ruler className="text-primary mt-1" size={20} />
                      <div>
                        <div className="text-xs md:text-sm text-foreground/60">Area</div>
                        <div className="font-medium text-sm md:text-base">{project.area}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 md:mt-8">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 1 && (
        <section className="py-10 md:py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8">Project Gallery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {project.images.slice(1).map((image: string, index: number) => (
                <div key={index} className="relative h-56 md:h-64 lg:h-80 rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-10 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <Link key={relatedProject._id} to={`/projects/${relatedProject._id}`} className="group">
                  <Card className="overflow-hidden border-border hover:shadow-xl transition-shadow rounded-xl">
                    <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200">
                      {relatedProject.images && relatedProject.images.length > 0 ? (
                        <img
                          src={relatedProject.images[0]}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 md:p-6">
                      <div className="text-xs md:text-sm text-primary mb-1.5 md:mb-2">{relatedProject.category}</div>
                      <h3 className="text-lg md:text-xl mb-1.5 md:mb-2">{relatedProject.title}</h3>
                      <p className="text-foreground/70 text-xs md:text-sm line-clamp-2 leading-relaxed">{relatedProject.description || relatedProject.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}