import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const PolitiqueConfidentialite = () => {
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
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
        <p className="text-xl text-gray-600">
          Protection de vos données personnelles
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Introduction</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Chez Musicami Podcast, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
          </p>
          <p>
            En utilisant notre site web et nos services, vous acceptez les pratiques décrites dans la présente politique de confidentialité.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Données collectées</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Nous pouvons collecter les types d'informations suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Informations personnelles :</span> nom, prénom, adresse email, numéro de téléphone lorsque vous nous contactez ou vous inscrivez à notre newsletter.
            </li>
            <li>
              <span className="font-medium">Données de navigation :</span> adresse IP, type de navigateur, pages visitées, temps passé sur le site, via des cookies et technologies similaires.
            </li>
            <li>
              <span className="font-medium">Informations de paiement :</span> en cas d'achat, les informations nécessaires au traitement du paiement (ces données sont traitées directement par nos prestataires de paiement sécurisés).
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Utilisation des données</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Nous utilisons vos données personnelles pour :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fournir, exploiter et maintenir notre site web et nos services</li>
            <li>Améliorer, personnaliser et développer nos services</li>
            <li>Comprendre et analyser comment vous utilisez notre site web</li>
            <li>Communiquer avec vous, notamment pour vous informer des nouveaux épisodes, événements ou offres</li>
            <li>Traiter vos transactions et gérer votre compte</li>
            <li>Prévenir et résoudre les problèmes techniques ou de sécurité</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Partage des données</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Avec des prestataires de services qui nous aident à exploiter notre site web et à fournir nos services (hébergement, traitement des paiements, envoi d'emails)</li>
            <li>Si la loi l'exige, en réponse à une procédure judiciaire ou pour protéger nos droits</li>
            <li>En cas de fusion, acquisition ou vente d'actifs, vos données peuvent être transférées à la nouvelle entité</li>
          </ul>
          <p>
            Ces tiers sont tenus de respecter la confidentialité de vos données et de les traiter conformément à la loi.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookies et technologies similaires</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Notre site utilise des cookies et technologies similaires pour améliorer votre expérience, analyser l'utilisation du site et personnaliser le contenu.
          </p>
          <p>
            Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Toutefois, la désactivation de certains cookies peut affecter votre expérience sur notre site.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sécurité des données</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
          </p>
          <p>
            Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vos droits</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l'adresse email : contact@musicamipodcast.fr
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Modifications de la politique de confidentialité</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version la plus récente sera toujours disponible sur notre site web avec la date de dernière mise à jour.
          </p>
          <p>
            Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements.
          </p>
          <p className="mt-6 font-medium">
            Dernière mise à jour : 1er Avril 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;