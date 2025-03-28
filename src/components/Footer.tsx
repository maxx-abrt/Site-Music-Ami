import React from 'react';
import { Music2, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 mb-10">
          {/* Logo and description column */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full">
                <Music2 className="h-7 w-7 text-blue-600" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Music<span className="text-blue-600">Ami</span></span>
            </div>
            <p className="text-gray-600 mt-4 max-w-md leading-relaxed">
              LE podcast mensuel où des musiciens nous racontent à quel point la musique change leur quotidien
            </p>
            
            {/* Social media links - horizontal layout */}
            <div className="flex items-center mt-6 space-x-5">
              <a 
                href="https://www.instagram.com/musicami_podcast?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <div className="bg-gray-100 rounded-full p-2.5 transition-colors group-hover:bg-purple-100">
                  <Instagram className="h-5 w-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
                </div>
              </a>
              
              <a 
                href="https://www.youtube.com/@musicamipodcast" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group"
              >
                <div className="bg-gray-100 rounded-full p-2.5 transition-colors group-hover:bg-red-100">
                  <Youtube className="h-5 w-5 text-gray-700 group-hover:text-red-600 transition-colors" />
                </div>
              </a>
              
              <a 
                href="https://open.spotify.com/show/6IAyX0MqB3WchQjI1l2PXU?si=2ed22970cf124d76" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="group"
              >
                <div className="bg-gray-100 rounded-full p-2.5 transition-colors group-hover:bg-green-100">
                  <svg 
                    className="h-5 w-5 text-gray-700 group-hover:text-green-600 transition-colors" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          {/* Navigation links column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">Navigation</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Accueil
              </Link>
              <Link to="/episodes" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Épisodes
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                À propos
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Contact
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Nous Soutenir
              </Link>
              <Link to="/MentionLegales" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Mentions légales
              </Link>
              <Link to="/CGV" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Conditions Générales de Vente
              </Link>
              <Link to="/Confidentialité" className="text-gray-600 hover:text-blue-600 transition-colors hover:underline decoration-blue-400 underline-offset-4">
                Confidentialité
              </Link>
              
            </div>
          </div>
        </div>
        
        {/* Footer divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        {/* MaxxAbrt*/}
        <div className="text-center text-sm text-gray-500 mt-6">
          Développé avec ❤️ par
        <a
            href="https://www.instagram.com/maxx.abrt/"
            className="hover:text-blue-600 transition-colors text-blue-400"
          >
            ‎ maxx.abrt
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Musicami. Tous droits réservés.
        </div>


        
      </div>
    </footer>
  );
};

export default Footer;