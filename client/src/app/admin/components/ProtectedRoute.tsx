import { Navigate } from 'react-router';
import { ReactNode } from 'react';
import jwt_decode from 'jwt-decode';

interface ProtectedRouteProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  const token = localStorage.getItem('adminToken');

  if (!token) return <Navigate to="/admin" replace />;

  try {
    const decoded = jwt_decode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    return <Navigate to="/admin" replace />;
  }
}