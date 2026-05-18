import { Award, Briefcase, Heart, Lightbulb, Users, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/card';

export default function About() {
  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We start by understanding your vision, lifestyle, and requirements through an in-depth consultation.',
    },
    {
      step: '02',
      title: 'Concept Development',
      description: 'Our team creates initial concepts and mood boards that capture the essence of your dream space.',
    },
    {
      step: '03',
      title: 'Design Refinement',
      description: 'We refine the design based on your feedback, ensuring every detail aligns with your expectations.',
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Our trusted partners bring the design to life with meticulous attention to quality and craftsmanship.',
    },
    {
      step: '05',
      title: 'Final Touches',
      description: 'We add the finishing touches and ensure everything is perfect before the final reveal.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our heart into every project, treating each space as if it were our own.',
    },
    {
      icon: CheckCircle,
      title: 'Excellence',
      description: 'We never compromise on quality, ensuring the highest standards in every detail.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We blend timeless design principles with fresh, creative solutions.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Your input is invaluable. We work together to bring your vision to life.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center text-background">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6 leading-tight">About Us</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-background/90 leading-snug">
            Creating meaningful spaces through thoughtful design and genuine care
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Our Story</h2>
              <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                <p>
                  With a degree in interior design and 2 years of hands-on experience, we've built 
                  our practice on a foundation of education, creativity, and an unwavering commitment 
                  to excellence.
                </p>
                <p>
                  Every project is an opportunity to create something beautiful and meaningful. We 
                  believe that great design isn't just about aesthetics—it's about understanding how 
                  people live, work, and interact with their spaces.
                </p>
                <p>
                  Our approach combines classic elegance with modern functionality, creating interiors 
                  that stand the test of time while meeting the evolving needs of contemporary living.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 md:p-8 text-center border-border rounded-xl">
                <div className="text-3xl md:text-4xl text-primary mb-2">2+</div>
                <div className="text-foreground/70 text-sm md:text-base">Years Experience</div>
              </Card>
              <Card className="p-6 md:p-8 text-center border-border rounded-xl">
                <div className="text-3xl md:text-4xl text-primary mb-2">35+</div>
                <div className="text-foreground/70 text-sm md:text-base">Projects Completed</div>
              </Card>
              <Card className="p-6 md:p-8 text-center border-border rounded-xl">
                <div className="text-3xl md:text-4xl text-primary mb-2">100%</div>
                <div className="text-foreground/70 text-sm md:text-base">Client Satisfaction</div>
              </Card>
              <Card className="p-6 md:p-8 text-center border-border rounded-xl">
                <div className="text-3xl md:text-4xl text-primary mb-2">
                  <Award size={32} className="inline-block md:w-10 md:h-10" />
                </div>
                <div className="text-foreground/70 text-sm md:text-base">Design Degree</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Design Philosophy</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              We believe in creating spaces that are timeless, functional, and deeply personal. 
              Our design philosophy centers on three core principles:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 border-border rounded-xl">
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Timeless Elegance</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                We favor classic design elements that won't feel dated in a few years. Quality 
                materials, clean lines, and thoughtful proportions create spaces that age beautifully.
              </p>
            </Card>
            <Card className="p-6 md:p-8 border-border rounded-xl">
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Functional Beauty</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                Beauty must serve a purpose. Every design decision is made with both aesthetics 
                and functionality in mind, ensuring spaces that are as practical as they are beautiful.
              </p>
            </Card>
            <Card className="p-6 md:p-8 border-border rounded-xl">
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Personal Touch</h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                Your space should tell your story. We incorporate personal elements that make 
                each project unique, creating interiors that truly feel like home.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Our Process</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              A structured approach that ensures clarity, collaboration, and exceptional results
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {process.map((item, index) => (
              <div
                key={item.step}
                className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-medium">
                    {item.step}
                  </div>
                </div>
                <Card className="flex-1 p-6 md:p-8 border-border rounded-xl">
                  <h3 className="text-xl md:text-2xl mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-foreground/70 text-sm md:text-lg leading-relaxed">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Why Choose Us</h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Our values guide everything we do, ensuring you receive not just a beautiful space, 
              but an exceptional experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <value.icon size={28} className="text-primary-foreground md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl mb-2 md:mb-3">{value.title}</h3>
                <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 text-center">Credentials</h2>
            <Card className="p-6 md:p-8 border-border rounded-xl">
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-4">
                  <Award className="text-primary mt-1" size={22} />
                  <div>
                    <h3 className="text-lg md:text-xl mb-2">Degree in Interior Design</h3>
                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                      Comprehensive education in design principles, spatial planning, color theory, 
                      and material selection from an accredited institution.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Briefcase className="text-primary mt-1" size={22} />
                  <div>
                    <h3 className="text-lg md:text-xl mb-2">2 Years Professional Experience</h3>
                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                      Hands-on experience across residential, commercial, and hospitality projects, 
                      working with diverse clients and design challenges.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}