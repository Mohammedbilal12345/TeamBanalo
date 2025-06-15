
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Search, Users, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-electric-gradient rounded-lg flex items-center justify-center group-hover:animate-glow transition-all duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold gradient-text">TeamBanalo</span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/dashboard' 
                    ? 'text-electric-blue bg-electric-blue/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/find-teammates" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/find-teammates' 
                    ? 'text-electric-blue bg-electric-blue/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Find Teammates</span>
              </Link>
              
              <Link 
                to="/profile" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/profile' 
                    ? 'text-electric-blue bg-electric-blue/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 hover:bg-white/10"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{profile?.full_name || user.email}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-electric-gradient rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Dropdown Menu */}
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
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="btn-ghost">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-electric">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
