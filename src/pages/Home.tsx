import React, { useState, useEffect } from 'react';
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
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLatestEpisodes, useTrendingPodcasts } from '../hooks/usePodcastData';
import EpisodeCard from '../components/EpisodeCard';
import { subscribeToNewsletter } from '../services/newsletterService';

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

  // Données FAQ
  const faqItems = [
    {
      question: "Quelle est la fréquence de publication des épisodes ?",
      answer: "Nous publions un nouvel épisode chaque mois, généralement le premier lundi. Nous proposons parfois des épisodes bonus sur des sujets spéciaux ou des interviews exclusives."
    },
    {
      question: "Comment puis-je participer au podcast ?",
      answer: "Si vous êtes musicien ou professionnel de l'industrie musicale et souhaitez partager votre expérience, contactez-nous via notre formulaire de contact. Nous sommes toujours à la recherche de nouvelles histoires inspirantes !"
    },
    {
      question: "Où puis-je écouter vos épisodes ?",
      answer: "Tous nos épisodes sont disponibles directement sur ce site, mais aussi sur YouTube, Spotify, Apple Podcasts, Google Podcasts et toutes les principales plateformes de podcast."
    },
    {
      question: "Proposez-vous des transcriptions de vos épisodes ?",
      answer: "Oui, nous fournissons des transcriptions complètes pour chaque épisode, accessibles depuis la page de l'épisode. Cela permet à tous nos auditeurs de profiter du contenu, y compris ceux qui préfèrent lire ou qui ont des difficultés auditives."
    },
    {
      question: "Comment puis-je soutenir le podcast ?",
      answer: "Vous pouvez nous soutenir de plusieurs façons : en vous abonnant à notre newsletter, en partageant nos épisodes sur les réseaux sociaux, en laissant des commentaires et des évaluations sur les plateformes d'écoute, ou en contribuant financièrement via notre page de soutien."
    }
  ];

  // Fonction pour basculer l'état d'expansion d'un élément FAQ
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Témoignages fictifs
  const testimonials = [
    {
      id: 1,
      name: "*",
      role: "Musicienne",
      quote: "Ce podcast m'a ouvert les yeux sur des aspects de l'industrie musicale que je ne connaissais pas. Chaque épisode est une mine d'or d'informations !",
      avatar: "/images/avatars/musician.jpg" // Move to local images
    },
    {
      id: 2,
      name: "*",
      role: "Producteur",
      quote: "En tant que producteur, j'apprécie énormément la profondeur des analyses et la qualité des invités. C'est devenu mon rendez-vous hebdomadaire incontournable.",
      avatar: "/images/avatars/producer.jpg" // Move to local images
    },
    {
      id: 3,
      name: "*",
      role: "Étudiante en musicologie",
      quote: "Les sujets abordés sont parfaitement en phase avec mes études. J'ai même cité ce podcast dans plusieurs de mes travaux universitaires !",
      avatar: "/images/avatars/student.jpg" // Move to local images
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
    }, 8000);
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
      {/* Hero Section - Amélioré */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/music-pattern.svg')] opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            MUSICAMI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          >
            LE podcast mensuel où des musiciens nous racontent à quel point la musique change leur quotidien 🎶 
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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

      {/* Testimonials Section - Complètement revu */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Ce que disent nos auditeurs
            </motion.h2>
            <p className="text-xl text-blue-100">
              Découvrez les retours de notre communauté passionnée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 relative"
              >
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-50"></div>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full border-4 border-white/20 mb-6"
                />
                <p className="text-blue-100 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-blue-200">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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