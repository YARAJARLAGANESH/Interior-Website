import { Link } from 'react-router';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export function PageFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="mb-4">Sri Dhathrika Interiors</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Creating beautiful, functional spaces that inspire and delight. With 2 years of experience and a degree in interior design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Phone size={16} />
                <span>+91 9618096194</span>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Mail size={16} />
                <span>sridhathrikainteriors@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-secondary-foreground/80">
                <MapPin size={16} className="mt-1" />
                <span>Matrusree Nagar, Miyapur,
                  <br />Hyderabad, 500049</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 text-center text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Sri Dhathrika Interiors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
