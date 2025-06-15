import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise show landing page
  return <Landing />;
};

export default Index;
