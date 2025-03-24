import React from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Coffee, Gift, Award, Zap } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Soutenez MusicAmi</h1>
        <p className="text-xl text-gray-600">Aidez-nous à continuer de créer du contenu de qualité</p>
      </motion.div>

      {/* Section des remerciements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Merci à nos auditeurs</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nous tenons à remercier chaleureusement tous nos auditeurs fidèles qui nous suivent chaque semaine. 
            Votre soutien et vos retours nous permettent de continuer à créer du contenu qui vous passionne.
          </p>
        </div>
      </motion.section>

      {/* Section des sponsors actuels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos sponsors</h2>
          <p className="text-gray-600 mb-6">
            Nous sommes fiers de collaborer avec des partenaires qui partagent notre passion pour la musique.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Sponsor 1</h3>
              <p className="text-gray-600">Description du sponsor 1.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Coffee className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Sponsor 2</h3>
              <p className="text-gray-600">Description du sponsor 2.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Gift className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Sponsor 3</h3>
              <p className="text-gray-600">Description du sponsor 3.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section de contact pour le sponsoring */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-blue-600 text-white rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-4">Devenir sponsor</h2>
        <p className="mb-6">
          Si vous souhaitez soutenir notre podcast et devenir sponsor, veuillez nous contacter via le formulaire ci-dessous.
        </p>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="entreprise" className="block text-gray-300 mb-2">Nom de l'entreprise</label>
              <input
                type="text"
                id="entreprise"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email professionnel</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">Votre proposition</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Envoyer ma demande
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default Support;
