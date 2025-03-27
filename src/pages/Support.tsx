import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Share, Star, MessageSquare, Headphones, BookOpen, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Support = () => {
  const [coffeeAmount, setCoffeeAmount] = useState<number>(3);
  const [showCoffeeForm, setShowCoffeeForm] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Déplacer la définition de supportWays avant son utilisation
  const supportWays = [
    {
      icon: <Headphones className="h-10 w-10 text-blue-600" />,
      title: "Écoutez régulièrement",
      description: "Le simple fait d'écouter chaque épisode nous aide à grandir et à améliorer notre contenu.",
      action: "Abonnez-vous sur votre plateforme préférée"
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Notez et commentez",
      description: "Laissez une note 5 étoiles et un commentaire positif sur Apple Podcasts, Spotify ou YouTube.",
      action: "Donnez votre avis"
    },
    {
      icon: <Share className="h-10 w-10 text-green-600" />,
      title: "Partagez notre contenu",
      description: "Partagez vos épisodes préférés sur les réseaux sociaux ou avec vos amis.",
      action: "Partager maintenant"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-600" />,
      title: "Participez à la communauté",
      description: "Rejoignez les discussions et partagez vos idées sur notre Instagram ou dans les commentaires.",
      action: "Rejoindre la communauté"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-red-600" />,
      title: "Suggérez des sujets",
      description: "Proposez des thèmes ou des invités que vous aimeriez entendre dans nos prochains épisodes.",
      action: "Proposer un sujet"
    },
    {
      icon: <Coffee className="h-10 w-10 text-amber-700" />,
      title: "Offrez-nous un café",
      description: "Si vous souhaitez nous soutenir financièrement, un petit café nous fait toujours plaisir !",
      action: "Offrir un café",
      onClick: () => window.open('https://www.buymeacoffee.com/musicamipodcast', '_blank')
    }
  ];
  
  // Optimisation SEO - Ajout de métadonnées structurées
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Soutenez notre podcast Musicami",
    "description": "Découvrez comment soutenir le podcast Musicami et nous aider à continuer à créer du contenu de qualité.",
    "url": window.location.href,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": supportWays.map((way, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": way.title,
        "description": way.description
      }))
    }
  };

  useEffect(() => {
    // Préchargement des images pour améliorer les performances
    const preloadImages = [
      '/images/support-banner.jpg',
      '/images/donation-icon.svg'
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  const handleCoffeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler un traitement de paiement
    setDonationComplete(true);
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setDonationComplete(false);
      setShowCoffeeForm(false);
    }, 3000);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute('data-name', 'bmc-button');
    script.setAttribute('data-slug', 'musicamipodcast');
    script.setAttribute('data-color', '#FFDD00');
    script.setAttribute('data-emoji', '');
    script.setAttribute('data-font', 'Cookie');
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#ffffff');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-20">
      <Helmet>
        <title>Soutenez Musicami - Votre podcast musical préféré</title>
        <meta name="description" content="Découvrez comment soutenir le podcast Musicami et nous aider à continuer à créer du contenu de qualité." />
        <meta name="keywords" content="soutien podcast, faire un don podcast, aider podcast musical, Musicami support" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content="Soutenez Musicami - Votre podcast musical préféré" />
        <meta property="og:description" content="Votre soutien nous permet de continuer à créer du contenu de qualité sur la musique et les musiciens." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/images/musicami-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soutenez Musicami - Votre podcast musical préféré" />
        <meta name="twitter:description" content="Votre soutien nous permet de continuer à créer du contenu de qualité sur la musique et les musiciens." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Soutenez notre podcast</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Votre soutien nous permet de continuer à créer du contenu de qualité. 
          Il existe de nombreuses façons de nous aider, même sans dépenser un centime !
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Comment nous soutenir ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportWays.map((way, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-50 rounded-full">
                  {way.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{way.title}</h3>
                <p className="text-gray-600 mb-4">{way.description}</p>
                <button 
                  onClick={way.onClick || (() => {})}
                  className="mt-auto text-blue-600 font-medium hover:text-blue-800 flex items-center"
                >
                  {way.action}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section d'impact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ce que votre soutien nous permet de faire</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Améliorer la qualité</h3>
              <p className="text-gray-600">Investir dans du meilleur matériel audio et vidéo pour une expérience optimale.</p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Créer plus de contenu</h3>
              <p className="text-gray-600">Augmenter la fréquence de nos épisodes et explorer de nouveaux formats.</p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Inviter des experts</h3>
              <p className="text-gray-600">Faire venir des invités spéciaux pour enrichir nos discussions.</p>
            </div>
          </div>
          
          <p className="text-center text-gray-600 italic">
            "Chaque partage, chaque commentaire, chaque écoute compte pour nous. Merci de faire partie de cette aventure !"
          </p>
        </div>
      </motion.section>

      {/* Formulaire de café */}
      {showCoffeeForm && !donationComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-center">Offrez-nous un café</h3>
            <div className="flex justify-center mb-6">
              <Coffee className="h-12 w-12 text-amber-700" />
            </div>
            
            <form onSubmit={handleCoffeeSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Combien de cafés ?</label>
                <div className="flex justify-between gap-4">
                  {[1, 3, 5].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setCoffeeAmount(amount)}
                      className={`flex-1 py-3 rounded-lg border ${
                        coffeeAmount === amount 
                          ? 'bg-amber-100 border-amber-500 text-amber-800' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {amount} {amount === 1 ? 'café' : 'cafés'}
                      <div className="text-sm text-gray-600">{(amount * 3).toFixed(2)}€</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCoffeeForm(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Offrir {coffeeAmount} {coffeeAmount === 1 ? 'café' : 'cafés'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Confirmation de don */}
      {donationComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Merci pour votre soutien !</h3>
            <p className="text-gray-600 mb-6">
              Votre café nous aide à continuer à créer du contenu que vous aimez.
            </p>
            <button
              onClick={() => {
                setDonationComplete(false);
                setShowCoffeeForm(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Soutenez-nous avec un café !</h2>
        <div className="flex justify-center">
          <a href="https://www.buymeacoffee.com/musicamipodcast" target="_blank">
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
              alt="Offrez nous un caffé !" 
              style={{ height: '60px', width: '217px' }} 
            />
          </a>
        </div>
      </div>

      {/* Section de partenariat */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-200"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Vous représentez une marque ?</h2>
          <p className="text-gray-600 mb-8 text-center">
            Si vous souhaitez collaborer avec notre podcast pour toucher notre audience engagée,
            nous serions ravis d'en discuter.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/contact?subject=Partenariat" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Discuter d'un partenariat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Support;
