import { Link } from 'react-router';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import useSettings from '../../hooks/useSettings';

export function Footer() {
  const { settings, loading, error } = useSettings();

  if (error) {
    console.error('Footer settings error:', error);
  }

  // Show loading placeholder only while settings are being fetched
  if (loading && !settings) {
    return (
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-16">Loading...</div>
      </footer>
    );
  }

  // If settings are not available after load, render nothing to avoid crashes
  if (!settings) return null;

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4 text-primary-foreground">{settings?.studioName}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {settings?.tagline ?? 'Creating timeless, elegant interiors that reflect your unique style.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-primary-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {settings?.phone ? (
                  <a href={`tel:${settings.phone}`} className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                    {settings.phone}
                  </a>
                ) : (
                  <span className="text-sm opacity-90">—</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {settings?.email ? (
                  <a href={`mailto:${settings.email}`} className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-colors">
                    {settings.email}
                  </a>
                ) : (
                  <span className="text-sm opacity-90">—</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm opacity-90">{settings?.address ?? '—'}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-primary-foreground">Follow Us</h4>
            <div className="flex gap-4">
              {settings?.instagram ? (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              ) : null}
              {settings?.facebook ? (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              ) : null}
              {settings?.linkedin ? (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-75">© {new Date().getFullYear()} {settings?.studioName}. All rights reserved.</p>
            <div className="flex gap-6 text-sm opacity-75">
              <a href="#" className="hover:opacity-100 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
