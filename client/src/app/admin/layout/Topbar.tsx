import { useLocation } from 'react-router';

export default function Topbar() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return 'Dashboard';
      case '/admin/projects':
        return 'Projects';
      case '/admin/projects/new':
        return 'Add Project';
      default:
        if (location.pathname.startsWith('/admin/projects/') && location.pathname.endsWith('/edit')) {
          return 'Edit Project';
        }
        return 'Admin Panel';
    }
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
      <div className="flex items-center">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          Admin
        </span>
      </div>
    </header>
  );
}