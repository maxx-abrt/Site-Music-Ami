import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Headphones, 
  Users, 
  Music, 
  Mic, 
  TrendingUp, 
  Radio, 
  User, 
  Mail, 
  ArrowRight, 
  Calendar, 
  Star, 
  MessageCircle, 
  Award,
  Info,
  Heart,
  Sparkles,
  Share2,
  AlertTriangle,
  ChevronDown,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLatestEpisodes, useTrendingPodcasts } from '../hooks/usePodcastData';
import EpisodeCard from '../components/EpisodeCard';
import { subscribeToNewsletter } from '../services/newsletterService';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

// Add fallback image constant at the top
const FALLBACK_IMAGE = '/images/podcast-placeholder.jpg';

const Home = () => {
  const { latestEpisodes, isLoading: isLoadingEpisodes, error: episodesError } = useLatestEpisodes(3);
  const { data: trendingPodcasts, isLoading: isLoadingTrending } = useTrendingPodcasts(3);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedHomeEpisode, setExpandedHomeEpisode] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // Premier élément ouvert par défaut

  // Particules initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  // Données FAQ
  const faqItems = [
    {
      question: "Quelle est la fréquence de publication des épisodes ?",
      answer: "Nous publions un nouvel épisode le premier jour de chaque mois."
    },
    {
      question: "Comment puis-je participer au podcast ?",
      answer: "Si vous êtes musicien et souhaitez partager votre expérience, n'hésitez pas à nous contacter via notre formulaire de contact. Nous sommes toujours à la recherche d'artistes inspirants!"
    },
    {
      question: "Est-ce que je peux proposer des invités pour Musicami ?",
      answer: "Bien sûr ! Si vous souhaitez voir un artiste qui n'a pas encore été invité sur Musicami, n'hésitez pas à nous le faire savoir via notre formulaire de contact. Nous sommes toujours à la recherche de suggestions pertinentes et nous apprécions votre participation!"
    },
    {
      question: "Où puis-je écouter Musicami ?",
      answer: "Tous nos épisodes sont dispos sur notre site internet et sur Youtube ainsi que sur les plateformes de podcasts: Spotify et Apple Podcast."
    },
    {
      question : "Comment puis-je soutenir le podcast?",
      answer: "Vous pouvez nous soutenir de plusieurs façons: en partageant nos épisodes sur vos réseaux sociaux et autour de vous, en laissant des commentaires et des évaluations sur les plateformes d'écoute, ou en contribuant financièrement via notre page de soutien."
    }
  ];

  // Fonction pour basculer l'état d'expansion d'un élément FAQ
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Témoignages des auditeurs
  const testimonials = [
    {
      id: 1,
      name: "Bld14",
      quote: "Encore un podcast incroyable ! Où on s'intéresse aussi bien à l'artiste qu'à l'humain ! Toujours aussi agréable à écouter et même à voir ! Sympa cette nouveauté!"
    },
    {
      id: 2,
      name: "Manon",
      quote: "Super épisode comme toujours ! Bravo pour tout ce que tu fais"
    },
    {
      id: 3,
      name: "yvesjazz",
      quote: "Très sympa votre podcast. Merci"
    },
    {
      id: 4,
      name: "kevinthiebot",
      quote: "Excellente interview ! J'espère que ce podcast va continuer et grandir. Bravo pour la démarche"
    },
    {
      id: 5,
      name: "semperfidelis",
      quote: "Quelle éloquence ! Très agréable à écouter et instructif. Merci"
    },
    {
      id: 6,
      name: "blacks0u",
      quote: "Salut ! Super vidéo, continue comme ça !"
    },
    {
      id: 7,
      name: "manon",
      quote: "Super intéressant, hâte de voir le prochain épisode ! Je m'abonne"
    },
    {
      id: 8,
      name: "jean",
      quote: "L'impro de la fin est magique et bravo pour ce nouvel épisode avec un musicien tellement inspirant"
    },
    {
      id: 9,
      name: "jean",
      quote: "Ah oui l'épisode décoiffe"
    }
  ];

  // Statistiques du podcast
  const podcastStats = [
    { icon: <Headphones className="h-8 w-8 text-blue-500" />, value: "*+", label: "Épisodes" },
    { icon: <Users className="h-8 w-8 text-blue-500" />, value: "*K+", label: "Auditeurs" },
    { icon: <Star className="h-8 w-8 text-blue-500" />, value: "*", label: "Note moyenne" },
    { icon: <MessageCircle className="h-8 w-8 text-blue-500" />, value: "*K+", label: "Commentaires" }
  ];

  // Rotation automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubscribing(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      setSubscriptionStatus(result.success ? 'success' : 'error');
      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
      // Réinitialiser le statut après 5 secondes
      setTimeout(() => setSubscriptionStatus('idle'), 5000);
    }
  };

  // Fonction pour gérer l'expansion des cartes
  const toggleExpandHome = (id: string) => {
    setExpandedHomeEpisode(prev => prev === id ? null : id);
  };

  // Add the missing newsletter section implementation
  const NewsletterSection = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Restez connecté
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Recevez nos dernières actualités et nos meilleurs contenus directement dans votre boîte mail.
      </p>
      <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isSubscribing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription...
              </span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full">
      {/* Add a small border at the top */}
      <div className="border-t border-gray-200"></div>

      {/* Hero Section - Amélioré avec particules */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
        {/* Particules interactives */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0"
          options={{
            fpsLimit: 60,
            fullScreen: false,
            interactivity: false,
            particles: {
              color: {
                value: "#ffffff",
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "bounce",
                },
                trail: {
                  enable: false,
                },
              },
              number: {
                density: {
                  enable: true,
                  area: 1000,
                },
                value: 15,
                max: 25,
                limit: 25
              },
              opacity: {
                value: { min: 0.1, max: 0.4 },
                animation: {
                  enable: true,
                  speed: 0.6,
                  minimumValue: 0.1,
                  sync: false
                },
              },
              shape: {
                type: ["character"],
                options: {
                  character: {
                    value: ["♪", "♫", "♬", "♩", "𝄞"],
                    font: "Arial",
                    weight: "400",
                  },
                },
              },
              size: {
                value: { min: 6, max: 10 },
              },
              rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                  enable: true,
                  speed: 2,
                },
              },
            },
            detectRetina: true,
            pauseOnBlur: true,
            responsive: [
              {
                maxWidth: 768,
                options: {
                  particles: {
                    number: {
                      value: 10,
                      max: 15
                    },
                    move: {
                      speed: 0.5
                    }
                  }
                }
              }
            ]
          }}
        />
        
        <div className="absolute inset-0 bg-[url('/images/music-pattern.svg')] opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-0"
            >
              <img 
                src="/images/musicami-logo.webp" 
                alt="Musicami Logo" 
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-xl shadow-2xl object-cover transform hover:scale-102 transition-transform duration-300"
                width={500}
                height={500}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative -mt-12 sm:-mt-16 md:-mt-20 z-20"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 backdrop-blur-sm py-4 px-6 rounded-xl max-w-3xl mx-auto shadow-lg">
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                  Le podcast mensuel où des musiciens nous racontent à quel point la musique change leur quotidien
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8 sm:mt-10"
          >
            <Link
              to="/episodes"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Commencer l'écoute
              <span className="absolute inset-0 rounded-full border-2 border-white opacity-70 animate-ping"></span>
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              <Info className="mr-2 h-5 w-5" />
              Nous découvrir
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Vagues décoratives en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none">
            <path 
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      

      {/* Latest Episodes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Derniers épisodes</h2>
            <Link to="/episodes" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Voir tous les épisodes
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {isLoadingEpisodes ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : episodesError ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <p className="text-gray-600">Une erreur est survenue lors du chargement des vidéos.</p>
            </div>
          ) : latestEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600">Aucun épisode n'a été trouvé.</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestEpisodes.map(episode => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Link to={`/video/${episode.id}`} className="block h-full">
                      <EpisodeCard
                        video={episode}
                        isExpanded={expandedHomeEpisode === episode.id}
                        onToggleExpand={() => toggleExpandHome(episode.id)}
                        variant="grid"
                        className="h-full transform hover:shadow-xl transition-all duration-300"
                        onImageError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Testimonials Section - Carrousel automatique */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Ce que disent nos auditeurs...
            </motion.h2>
            
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Indicateurs de navigation */}
            <div className="flex justify-center space-x-2 mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? 'bg-white scale-125' : 'bg-white/30'
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>

            {/* Carrousel */}
            <div className="relative h-64 sm:h-52 overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center p-8 text-center"
                >
                  <p className="text-blue-100 mb-6 italic text-lg">"{testimonials[activeTestimonial].quote}"</p>
                  <div>
                    <h4 className="font-semibold text-xl">{testimonials[activeTestimonial].name}</h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ - Nouvelle section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur notre podcast
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-blue-600 transition-transform duration-300 ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Vous avez d'autres questions ? Contactez-nous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section - Amélioré */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100"
          >
            <NewsletterSection />
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Amélioré */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Devenez membre de notre communauté grandissante et participez à l'évolution 
              de votre podcast musical préféré.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/episodes"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Découvrir les épisodes
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                <Heart className="mr-2 h-5 w-5" />
                Soutenir le podcast
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;