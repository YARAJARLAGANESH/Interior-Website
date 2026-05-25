import { Navigate } from 'react-router';
import { ReactNode, useState, useEffect } from 'react';

interface RoleBasedRouteProps {
  children: ReactNode;
  requiredRole: 'admin' | 'superadmin';
}

interface AdminData {
  _id?: string;
  id?: string;
  role?: string;
  email?: string;
  name?: string;
}

export default function RoleBasedRoute({
  children,
  requiredRole,
}: RoleBasedRouteProps) {

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    try {
      const adminDataStr = localStorage.getItem('adminData');
      if (!adminDataStr) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const adminData: AdminData = JSON.parse(adminDataStr);
      const userRole = adminData.role;

      if (requiredRole === 'superadmin' && userRole !== 'superadmin') {
        setHasAccess(false);
      } else if (requiredRole === 'admin' && (!userRole || (userRole !== 'admin' && userRole !== 'superadmin'))) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }

      setLoading(false);
    } catch {
      setHasAccess(false);
      setLoading(false);
    }
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a href="/admin/dashboard" className="text-blue-600 hover:underline">
            Go back to dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
