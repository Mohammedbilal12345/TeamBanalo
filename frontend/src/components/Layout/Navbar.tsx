import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { Compass, User as UserIcon, Settings, LogOut, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, profile, logout, loginWithGoogle } = useAuth();
  const location = useLocation();

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  if (isAuthPage) return null;

  const navigate = useNavigate();

const handleGetStarted = () => {
  navigate('/login');
};

  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo - Made significantly larger */}
         <Link to="/" className="flex items-center group">
  <img
    src="/logo.png"
    alt="TeamBanalo Logo"
    className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain transition-transform duration-300 group-hover:scale-105"
  />
</Link>

          {/* Links for authenticated user */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard' ? 'text-electric-blue bg-electric-blue/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/explore-and-teammates"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === '/explore-and-teammates'
                  ? 'text-electric-blue bg-electric-blue/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Search className="w-4 h-4" />
                <span>Find Teammates</span>
              </Link>

              <Link
                to="/explore"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === '/explore'
                  ? 'text-electric-blue bg-electric-blue/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </Link>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{profile?.full_name || user.email}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <Link to="/profile">
                    {profile?.avatar_url ? (
  <img
    src={profile.avatar_url}
    alt="Avatar"
    className="w-8 h-8 rounded-full object-cover border border-white/10"
  />
) : (
  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/10">
    <UserIcon className="w-4 h-4 text-gray-300" />
  </div>
)}

                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <Link to="/settings">
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 hover:bg-white/10">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="w-9 h-9 p-0 hover:bg-red-500/20 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={handleGetStarted} className="btn-electric">
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;