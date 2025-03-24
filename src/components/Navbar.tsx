import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, Menu, X, ChevronDown, Search, Heart, Bell, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Détecte le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Ferme le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
      : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Ferme la recherche si elle est ouverte
    if (searchOpen) setSearchOpen(false);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémentation de la recherche à venir
    console.log('Recherche:', searchQuery);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Spacer pour compenser la hauteur de la navbar fixe */}
      <div className={`h-${isScrolled ? '16' : '20'} transition-all duration-300`}></div>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo et nom du site */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-200 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                  <Headphones className="h-9 w-9 text-blue-600 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-gray-900">Music<span className="text-blue-600">Ami</span></span>
                  <span className="hidden sm:block text-xs text-gray-500">Votre podcast musical</span>
                </div>
              </Link>
            </div>
            
            {/* Navigation pour desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`${isActive('/')} px-3 py-2 transition-colors duration-200 text-sm`}
              >
                Accueil
              </Link>
              <Link 
                to="/episodes" 
                className={`${isActive('/episodes')} px-3 py-2 transition-colors duration-200 text-sm`}
              >
                Épisodes
              </Link>
              <Link 
                to="/about" 
                className={`${isActive('/about')} px-3 py-2 transition-colors duration-200 text-sm`}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`${isActive('/contact')} px-3 py-2 transition-colors duration-200 text-sm`}
              >
                Contact
              </Link>
            </div>
            
            {/* Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link
                to="/support"
                className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Soutenir
              </Link>
            </div>
            
            {/* Bouton menu mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 mr-1"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Barre de recherche */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-md p-4 border-t border-gray-100"
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex">
                <input
                  type="text"
                  placeholder="Rechercher un épisode, un sujet..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg divide-y divide-gray-100">
                <div className="py-2">
                  <Link
                    to="/"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/episodes"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/episodes' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Épisodes
                  </Link>
                  <Link
                    to="/about"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/about' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    À propos
                  </Link>
                  <Link
                    to="/contact"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/contact' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/support"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/support' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Soutenir
                  </Link>
                  <Link
                    to="/favorites"
                    className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/favorites' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-200 flex items-center`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favoris
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;