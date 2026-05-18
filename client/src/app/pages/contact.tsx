import { useState } from 'react';
import useSettings from '../../hooks/useSettings';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';

export default function Contact() {
  const { settings, loading, error } = useSettings();
  if (error) console.error('Contact settings error:', error);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (would integrate with backend in production)
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6 leading-tight">Get In Touch</h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Ready to start your design journey? We'd love to hear about your project.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border rounded-xl">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl mb-5 md:mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2 bg-input-background"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 bg-input-background"
                          placeholder="email@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 bg-input-background"
                          placeholder="+91 1234567890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="mt-2 w-full h-10 px-3 py-2 rounded-md border border-border bg-input-background text-foreground"
                        >
                          <option value="">Select a type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="renovation">Renovation</option>
                          <option value="consultation">Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2 bg-input-background"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Send className="mr-2" size={20} />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="border-border rounded-xl">
                <CardContent className="p-5 md:p-6 space-y-4">
                  <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Contact Information</h3>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1" size={20} />
                    <div>
                          <div className="font-medium mb-1 text-sm md:text-base">Phone</div>
                          <a href={`tel:${settings?.phone ?? '+919618096194'}`} className="text-foreground/70 hover:text-primary transition-colors text-sm md:text-base">
                            {settings?.phone ?? '+91 9618096194'}
                          </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-1" size={20} />
                    <div>
                          <div className="font-medium mb-1 text-sm md:text-base">Email</div>
                          <a href={`mailto:${settings?.email ?? 'sridhathrikainteriors@gmail.com'}`} className="text-foreground/70 hover:text-primary transition-colors text-sm md:text-base">
                            {settings?.email ?? 'sridhathrikainteriors@gmail.com'}
                          </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium mb-1 text-sm md:text-base">Address</div>
                          <div className="text-foreground/70 text-sm md:text-base">
                            {settings?.address ? (
                              <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, '<br />') }} />
                            ) : (
                              <>
                                Matrusree Nagar<br />
                                Miyapur, Hyderabad 500049
                              </>
                            )}
                          </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium mb-1 text-sm md:text-base">Hours</div>
                      <div className="text-foreground/70 text-sm md:text-base">
                        Mon - Sat: 9:00 AM - 5:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-primary text-primary-foreground border-primary rounded-xl">
                <CardContent className="p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Prefer to Chat?</h3>
                  <p className="mb-5 md:mb-6 text-primary-foreground/90 text-sm md:text-base leading-relaxed">
                    Get instant answers to your questions via phone or WhatsApp.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-background text-foreground hover:bg-background/90">
                      <a href={`tel:${settings?.phone ?? '+919618096194'}`}>
                        <Phone className="mr-2" size={18} />
                        Call Now
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      <a href={settings?.whatsapp ?? 'https://wa.me/+91 9618096194'} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2" size={18} />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-center">Visit Our Studio</h2>
          <div className="rounded-xl overflow-hidden h-80 md:h-96 bg-card border border-border flex items-center justify-center">
            <div className="text-center text-foreground/60">
              <MapPin size={40} className="mx-auto mb-3 md:mb-4 text-primary md:w-12 md:h-12" />
              <p className="text-sm md:text-base">Map location would be embedded here</p>
              <p className="text-xs md:text-sm mt-2">123 Design Street, Creative City, ST 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-center">Common Questions</h2>
          <div className="space-y-5 md:space-y-6">
            <Card className="border-border rounded-xl">
              <CardContent className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl mb-2">What is your design process?</h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                  Our process includes consultation, concept development, design refinement, implementation, 
                  and final touches. We work closely with you at every stage to ensure the result exceeds expectations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border rounded-xl">
              <CardContent className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl mb-2">How long does a typical project take?</h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                  Project timelines vary based on scope and complexity. A residential room redesign might take 
                  4-6 weeks, while a full home renovation could take 3-6 months. We'll provide a detailed timeline 
                  during consultation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border rounded-xl">
              <CardContent className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl mb-2">Do you work with existing furniture?</h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                  Absolutely! We love incorporating pieces that have meaning to you. We'll help you blend 
                  existing furniture with new elements to create a cohesive, personalized design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}