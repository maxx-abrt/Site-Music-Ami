import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Calendar, Clock, User, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { PodcastEpisode } from '../utils/podcastApi';

interface EpisodeCardProps {
  episode: PodcastEpisode;
  isExpanded?: boolean;
  isPlaying?: boolean;
  onToggleExpand?: () => void;
  onTogglePlay?: () => void;
  variant?: 'default' | 'compact' | 'featured' | 'grid';
  className?: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  isExpanded = false,
  isPlaying = false,
  onToggleExpand,
  onTogglePlay,
  variant = 'default',
  className = '',
  onImageError
}) => {
  const [imageError, setImageError] = useState(false);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes} min`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const cardVariants = {
    default: "bg-white rounded-xl shadow-sm hover:shadow-md p-4 sm:p-6 transition-all duration-300 border border-gray-100 w-full",
    compact: "bg-white rounded-lg shadow-sm hover:shadow-md p-3 sm:p-4 transition-all duration-300 border border-gray-100",
    featured: "bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-4 sm:p-6 border border-blue-100 transition-all duration-300 hover:shadow-lg w-full",
    grid: "bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 h-full flex flex-col border border-gray-100"
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!imageError) {
      setImageError(true);
      e.currentTarget.src = FALLBACK_IMAGE;
      onImageError?.(e);
    }
  };

  const isHorizontalLayout = variant !== 'grid';

  return (
    <motion.div
      className={`${cardVariants[variant]} ${className} overflow-hidden`}
      whileHover={{ scale: 1.01, translateY: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`flex ${isHorizontalLayout ? 'flex-row' : 'flex-col'} gap-4 relative`}>
        {/* Image */}
        <div className={`flex-shrink-0 ${isHorizontalLayout ? 'w-48 h-48' : 'w-full aspect-video'}`}>
          <div className={`relative ${isHorizontalLayout ? 'aspect-square' : 'aspect-video'} rounded-md overflow-hidden`}>
            <img 
              src={episode.episodeImage || episode.artwork || episode.podcastImage || FALLBACK_IMAGE}
              alt={episode.title}
              onError={handleImageError}
              className={`rounded-md object-cover ${
                variant === 'compact' 
                  ? 'w-full sm:w-20 h-32 sm:h-20 max-w-[200px]' 
                  : variant === 'grid'
                    ? 'w-full aspect-[4/3]'
                    : 'w-full sm:w-32 h-48 sm:h-32 max-w-[250px]'
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Volume2 className="h-8 w-8 text-white animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">
            {episode.title}
          </h3>

          {/* Meta information */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(episode.publishedAt)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(episode.duration)}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {episode.author}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-600">
            {isExpanded ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: episode.description 
                }} 
                className="prose prose-sm max-w-none prose-blue"
              />
            ) : (
              <p className="line-clamp-2 text-sm">
                {episode.description.replace(/<[^>]*>/g, '')}
              </p>
            )}
          </div>

          {/* Expand/Collapse button */}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Voir plus
                </>
              )}
            </button>
          )}
        </div>

        {/* Play button */}
        <div className="flex-shrink-0 flex items-center">
          <button
            onClick={() => onTogglePlay?.()}
            className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-blue-600" />
            ) : (
              <Play className="h-6 w-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Audio player */}
      {isPlaying && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <audio 
            controls 
            className="w-full" 
            autoPlay
            src={episode.enclosureUrl}
            onEnded={() => onTogglePlay?.()}
          >
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EpisodeCard; 