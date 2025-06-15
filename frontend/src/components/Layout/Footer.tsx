
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-electric-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold gradient-text">TeamBanalo</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connect with talented developers and find your perfect hackathon teammates. 
              Build amazing projects together and win more hackathons.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-teammates" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Find Teammates
                </Link>
              </li>
              <li>
                <Link to="/hackathons" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 TeamBanalo. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Made with ❤️ for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
