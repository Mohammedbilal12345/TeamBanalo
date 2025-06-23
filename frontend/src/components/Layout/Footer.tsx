import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & Contact */}
          <div className="col-span-1">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <img
                src="/logo-footer.png"
                alt="TeamBanalo Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto md:mx-0">
              Connecting talented developers to build winning hackathon teams.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 text-sm">
              <a href="https://github.com/teambanalo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition-colors">
                GitHub
              </a>
              <a href="mailto:teambanalo@gmail.com" className="text-gray-400 hover:text-electric-blue transition-colors">
                teambanalo@gmail.com
              </a>
            </div>
          </div>

          {/* Empty column for spacing on larger screens */}
          <div className="hidden lg:block col-span-1"></div> 

          {/* Quick Links (Moved to the right) */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/find-teammates" className="text-gray-400 hover:text-electric-blue transition-colors">
                  Find Teammates
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-electric-blue transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-xs mb-1">
            &copy; {new Date().getFullYear()} TeamBanalo. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs">
            Crafted for the developer community by{' '}
            <a 
              href="https://github.com/MohammedMusharraf11/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-electric-blue hover:text-white transition-colors font-medium"
            >
              Musharraf
            </a>
            {' '}and{' '}
            <a 
              href="https://github.com/Mohammedbilal12345" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-electric-blue hover:text-white transition-colors font-medium"
            >
              Bilal
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
