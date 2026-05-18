import { Link } from "react-router";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import heroBg from "../../assets/hero_bg.jpg";
import portfolioImg from "../../assets/Portfolio.jpeg";

export function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        if (response.data.projects) {
          setProjects(response.data.projects.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const heroBgUrl = heroBg

  return (
    <div className="w-full">

      {/* Hero Section */}
<section className="relative h-[90vh] flex items-center overflow-hidden">
  
  {/* Background - lowest layer */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${heroBgUrl})` }}
  />
  
  {/* Overlay - middle layer */}
  <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/65 to-black/25" />
  
  {/* Content - top layer */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-[2] w-full max-w-7xl mx-auto px-8 lg:px-16 text-white"
  >
    <h1
      className="text-5xl md:text-7xl lg:text-8xl mb-6 max-w-4xl leading-tight"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      Crafting Timeless Elegant Spaces
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-90 leading-relaxed">
      Transform your vision into reality with bespoke interior design
      that reflects your unique style.
    </p>
    <div className="flex flex-wrap gap-4">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        View Our Work
        <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white text-white rounded-md hover:bg-white/20 transition-colors"
      >
        Get In Touch
      </Link>
    </div>
  </motion.div>

</section>

      {/* About Snapshot */}
      <section className="py-24 bg-muted">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Design that tells your story
              </h2>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                With a degree in interior design and 2 years of dedicated experience,
                we bring a fresh perspective to every project. Our approach combines
                timeless elegance with modern functionality.
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Every space has a story. We're here to help you tell yours through
                thoughtful design, quality materials, and attention to every detail.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={portfolioImg}
                alt="Sri Dhathrika Interiors Portfolio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A selection of our recent work showcasing our commitment to
              excellence and attention to detail.
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No projects yet. Add projects from the admin panel.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/projects/${project._id}`}
                    className="group block relative h-[400px] rounded-xl overflow-hidden shadow-md"
                  >
                    {project.images?.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm opacity-90 mb-2 block capitalize">
                        {project.category}
                      </span>
                      <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Let's discuss your vision and bring it to life. Get in touch for a consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              
              <a href="tel:+919618096194"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-md hover:bg-black/40 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              
              <a href="https://wa.me/919618096194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white text-white rounded-md hover:bg-white/40 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}