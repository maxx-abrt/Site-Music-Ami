import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const MentionsLegales = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions Légales</h1>
        <p className="text-xl text-gray-600">
          Informations légales concernant Musicami Podcast
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Éditeur du site</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium">Nom de l'entreprise :</span> Musicami Podcast
          </p>
          <p>
            <span className="font-medium">Forme juridique :</span> Entrepreneur individuel (Micro-entreprise)
          </p>
          <p>
            <span className="font-medium">Responsable de publication :</span> Camille PERUTA
          </p>
          <p>
            <span className="font-medium">Adresse :</span> 28 Bis CHEMIN des bicquey, 25000 Besançon, FRANCE
          </p>
          <p>
            <span className="font-medium">Téléphone :</span> +33 7 66 01 75 81
          </p>
          <p>
            <span className="font-medium">Email :</span> contact@musicamipodcast.fr
          </p>
          <p>
            <span className="font-medium">SIRET :</span> 942 543 513 00016
          </p>
          <p>
            <span className="font-medium">Code APE :</span> 7021Z - Conseil en relations publiques et communication
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hébergement</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium">Hébergeur :</span> Vercel Inc.
          </p>
          <p>
            <span className="font-medium">Adresse :</span> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
          </p>
          <p>
            <span className="font-medium">Site web :</span> <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Propriété intellectuelle</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            L'ensemble du contenu présent sur le site Musicami Podcast (textes, images, vidéos, logos, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Musicami Podcast.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Protection des données personnelles</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
          </p>
          <p>
            Ces droits peuvent être exercés en nous contactant à l'adresse email suivante : contact@musicamipodcast.fr
          </p>
          <p>
            Les informations recueillies sur ce site sont utilisées uniquement dans le cadre de la relation commerciale entre Musicami Podcast et ses utilisateurs, et ne sont en aucun cas cédées à des tiers sans votre consentement explicite.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookies</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Le site Musicami Podcast peut utiliser des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsque des cookies sont envoyés. Toutefois, certaines parties du site peuvent ne pas fonctionner correctement si vous désactivez les cookies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;