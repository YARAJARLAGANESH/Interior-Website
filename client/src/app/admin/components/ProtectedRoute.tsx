import { Navigate } from 'react-router';
import { ReactNode } from 'react';
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

  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {

    const decoded = jwtDecode<DecodedToken>(token);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {

      localStorage.removeItem('adminToken');

      return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;

  } catch (error) {

    localStorage.removeItem('adminToken');

    return <Navigate to="/admin/login" replace />;
  }
}