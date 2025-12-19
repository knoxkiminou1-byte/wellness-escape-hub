import { ReactNode } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireAccess?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false, requireAccess = false }: ProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth/signin" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Redirect to="/app" replace />;
  }

  if (requireAccess && !user?.hasAccess && !isAdmin) {
    return <Redirect to="/purchase" replace />;
  }

  return <>{children}</>;
};
