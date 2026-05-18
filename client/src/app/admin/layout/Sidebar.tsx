import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/projects"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/admin/projects/new"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Add Project
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}