import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Explore from "@/pages/Explore"; // Import the Explore page
import Profile from "@/pages/Profile";
import FindTeammates from "@/pages/FindTeammates";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import CreateProject from "@/pages/CreateProject"; // Import the new CreateProject component
import PostHackathon from "./pages/PostHackathon"; // Import PostHackathon component
import ExploreAndTeammates from "@/pages/ExploreAndTeamates"; // Import ExploreAndTeammates component

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        {/* You might want a better loading spinner here */}
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        {/* You might want a better loading spinner here */}
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (user) {
    // If user is logged in, redirect them from public routes to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-hackathon"
            element={
              <ProtectedRoute>
                <PostHackathon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-teammates"
            element={
              <ProtectedRoute>
                <FindTeammates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore-and-teammates"
            element={
              <ProtectedRoute>
                <ExploreAndTeammates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-project" // New route for CreateProject
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster /> {/* For shadcn/ui toast */}
          <Sonner /> {/* For sonner toast */}
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;