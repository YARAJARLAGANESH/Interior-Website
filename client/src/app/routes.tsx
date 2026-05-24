import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout';
import { HomePage } from './pages/home-page';
import Projects from './pages/projects';
import ProjectDetail from './pages/project-detail';
import About from './pages/about';
import Contact from './pages/contact';
import { Link } from 'react-router';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProjectsList from './admin/pages/ProjectsList';
import AddProject from './admin/pages/AddProject';
import EditProject from './admin/pages/EditProject';
import Settings from './admin/pages/Settings';
import AdminLayout from './admin/layout/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
        <p className="text-foreground/70 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="text-primary hover:underline">Go back home</Link>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'projects', Component: Projects },
      { path: 'projects/:id', Component: ProjectDetail },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'settings', element: <Settings /> },
          { path: 'projects', element: <ProjectsList /> },
          { path: 'projects/new', element: <AddProject /> },
          { path: 'projects/:id/edit', element: <EditProject /> },
        ],
      },
    ],
  },
]);