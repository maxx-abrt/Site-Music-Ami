import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLatestEpisodes, useTrendingPodcasts } from '../hooks/usePodcastData';
import EpisodeCard from '../components/EpisodeCard';
import { subscribeToNewsletter } from '../services/newsletterService';

// Add fallback image constant at the top
const FALLBACK_IMAGE = '/images/podcast-placeholder.jpg';

const Home = () => {
  const { latestEpisodes, isLoading: isLoadingEpisodes } = useLatestEpisodes(2);
  const { data: trendingPodcasts, isLoading: isLoadingTrending } = useTrendingPodcasts(3);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [playingHomeEpisode, setPlayingHomeEpisode] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
            Découvrez la Musique<br />
            <span className="text-blue-200">Comme Jamais Auparavant</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          >
            Plongez dans l'univers fascinant de la musique avec des analyses approfondies, 
            des interviews exclusives et des découvertes musicales uniques.
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
              En savoir plus
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

      {/* Stats Section - Nouveau */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {podcastStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episodes - Amélioré */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Derniers Épisodes
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos dernières productions et plongez dans des discussions passionnantes 
              sur l'univers musical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingEpisodes ? (
              // Ajout d'un skeleton loader élégant
              Array(3).fill(null).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              latestEpisodes.map(episode => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <EpisodeCard
                    episode={{
                      ...episode,
                      episodeImage: episode.artwork || episode.episodeImage,
                      podcastImage: episode.podcastImage || FALLBACK_IMAGE
                    }}
                    isPlaying={playingHomeEpisode === episode.id}
                    onTogglePlay={() => setPlayingHomeEpisode(
                      playingHomeEpisode === episode.id ? null : episode.id
                    )}
                    variant="grid"
                    className="h-full transform hover:shadow-xl transition-all duration-300"
                    onImageError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials - Complètement revu */}
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