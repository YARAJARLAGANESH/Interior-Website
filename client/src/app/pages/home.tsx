import { Link } from 'react-router';
import { Phone, MessageCircle, Award, Users, Briefcase, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { testimonials } from '../data/projects';
import { FadeIn } from '../components/fade-in';
import api from '../../api/api';
import heroBg from '../../assets/hero_bg.jpg';
import portfolioImg from '../../assets/Portfolio.jpeg';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        console.log('Home page API response:', response.data);
        if (response.data.projects) {
          console.log('Featured projects loaded:', response.data.projects.slice(0, 3));
          console.log('Sample project.images:', response.data.projects[0]?.images);
          setProjects(response.data.projects.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const featuredProjects = projects;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="relative h-[75vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
  
  {/* Background Image */}
  <img
    src={
      featuredProjects.length > 0 && featuredProjects[0]?.images?.length > 0
        ? featuredProjects[0].images[0]
        : heroBg
    }
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

  {/* Content */}
  <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-6 text-center text-white">
    <FadeIn>
      <h1 className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
        Crafting Timeless Interiors
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/90 leading-snug">
        Where elegant design meets functional living. Transforming spaces into beautiful, livable art.
      </p>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/projects">View Our Work</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
          <Link to="/contact">Get In Touch</Link>
        </Button>
      </div>
    </FadeIn>
  </div>

</section>

      {/* About Snapshot */}
      <section className="py-12 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">
                  Design that tells your story
                </h2>
                <p className="text-base md:text-lg mb-4 md:mb-6 text-foreground/80 leading-relaxed">
                  With a degree in interior design and 2 years of dedicated experience, we bring a fresh perspective to every project. Our approach combines timeless elegance with modern functionality.
                </p>
                <p className="text-base md:text-lg mb-6 md:mb-8 text-foreground/80 leading-relaxed">
                  Every space has a story. We're here to help you tell yours through thoughtful design, quality materials, and attention to every detail.
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img src={portfolioImg} alt="Sri Dhathrika Interiors - Our Work" className="w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">Featured Projects</h2>
              <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                A selection of our recent work showcasing our commitment to excellence and attention to detail
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => {
              return (
                <FadeIn key={project._id} delay={index * 0.1}>
                  <Link to={`/projects/${project._id}`} className="group">
                    <Card className="overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                      <div className="relative h-72 md:h-80 overflow-hidden rounded-t-lg bg-gray-200">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-5 md:p-6">
                        <div className="text-sm text-primary mb-1.5">{project.category}</div>
                        <h3 className="text-xl md:text-2xl mb-1.5">{project.title}</h3>
                        <p className="text-foreground/70 text-sm md:text-base leading-relaxed">{project.shortDescription}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10 md:mt-12">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">Our Expertise</h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">Specialized in diverse design categories</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { name: 'Residential', icon: '🏡', count: '12+ Projects' },
              { name: 'Commercial', icon: '🏢', count: '8+ Projects' },
              { name: 'Hospitality', icon: '✨', count: '5+ Projects' },
              { name: 'Renovation', icon: '🔨', count: '10+ Projects' },
            ].map((category, index) => (
              <FadeIn key={category.name} delay={index * 0.1}>
                <Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow border-border rounded-xl">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{category.icon}</div>
                  <h3 className="text-xl md:text-2xl mb-1.5 md:mb-2">{category.name}</h3>
                  <p className="text-foreground/60 text-sm md:text-base">{category.count}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-12 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">What Clients Say</h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">Trusted by homeowners and businesses alike</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <Card className="p-6 md:p-8 border-border rounded-xl">
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg mb-5 md:mb-6 text-foreground/80 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-medium text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-foreground/60">{testimonial.project}</div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-primary-foreground/90 leading-relaxed">
              Let's discuss your vision and bring it to life. Get in touch for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <a href="tel:+15551234567">
                  <Phone className="mr-2" size={20} />
                  Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}