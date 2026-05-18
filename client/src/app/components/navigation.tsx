import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Lock } from 'lucide-react';
import { useState } from 'react';
import useSettings from '../../hooks/useSettings';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('adminToken');
  const isAdminLoggedIn = !!token;
  const { settings, loading, error } = useSettings();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
    window.location.reload();
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {settings?.studioName ?? 'Interior Studio'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!isAdminLoggedIn && (
              <Link
                to="/admin"
                className="flex items-center gap-2 transition-colors text-foreground/70 hover:text-foreground"
              >
                <Lock size={16} />
                Admin Login
              </Link>
            )}
            {isAdminLoggedIn && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 transition-colors text-foreground/70 hover:text-foreground"
                >
                  <Lock size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!isAdminLoggedIn && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 transition-colors text-foreground/70 hover:text-foreground"
              >
                <Lock size={16} />
                Admin Login
              </Link>
            )}
            {isAdminLoggedIn && (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 transition-colors text-foreground/70 hover:text-foreground"
                >
                  <Lock size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
