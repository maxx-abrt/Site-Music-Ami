import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Mic, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos de MusicAmi</h1>
        <p className="text-xl text-gray-600">Votre fenêtre sur l'univers musical</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Studio d'enregistrement"
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
          <p className="text-gray-600 mb-6">
            MusicAmi est né d'une passion profonde pour la musique et d'un désir de partager des connaissances approfondies sur cet art universel. Chaque semaine, nous explorons différents aspects de la musique, des dernières tendances aux classiques intemporels.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <Music2 className="h-6 w-6 text-blue-500 mr-3" />
              <span className="text-gray-700">Exploration musicale</span>
            </div>
            <div className="flex items-center">
              <Mic className="h-6 w-6 text-blue-500 mr-3" />
              <span className="text-gray-700">Interviews exclusives</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-blue-500 mr-3" />
              <span className="text-gray-700">Communauté passionnée</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-blue-50 rounded-lg p-8 mb-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">L'équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Thomas Martin"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Thomas Martin</h3>
            <p className="text-gray-600">Animateur principal</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Sophie Dubois"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Sophie Dubois</h3>
            <p className="text-gray-600">Productrice</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Marc Laurent"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Marc Laurent</h3>
            <p className="text-gray-600">Ingénieur son</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;