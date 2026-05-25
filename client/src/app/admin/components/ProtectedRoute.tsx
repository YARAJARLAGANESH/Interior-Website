import { Navigate } from 'react-router';
import { ReactNode, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Validate token on mount
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        setError('Token expired');
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      setError('Invalid token');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !token) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}