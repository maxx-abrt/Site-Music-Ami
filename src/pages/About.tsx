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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Qui sommes-nous ?</h1>
        <p className="text-xl text-gray-600">Votre fenêtre sur l'univers musical</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="images/Photo-about1-Camille.jpeg"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
          <p className="text-gray-600 mb-6">
            Musicami est né d'une passion profonde pour la musique et d'un désir de partager des connaissances approfondies sur cet art universel. Chaque semaine, nous explorons différents aspects de la musique, des dernières tendances aux classiques intemporels.
          </p>
          
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
              src="images/1.webp"
              alt="Camille"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Camille</h3>
            <p className="text-gray-600">Production, Animation, Montage</p>
          </div>
          <div className="text-center">
            <img
              src="images/2.webp"
              alt="Jean"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Jean</h3>
            <p className="text-gray-600">Responsable technique</p>
          </div>
          <div className="text-center">
            <img
              src="images/3.webp"
              alt="Gabriel"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-gray-900">Gabriel</h3>
            <p className="text-gray-600">Responsable finances</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;