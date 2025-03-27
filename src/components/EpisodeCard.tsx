import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Calendar, Clock, User, ChevronDown, ChevronUp, Volume2, ExternalLink } from 'lucide-react';
import { YouTubeVideo, PodcastEpisode } from '../utils/podcastApi';
import { useNavigate } from 'react-router-dom';

interface EpisodeCardProps {
  video?: YouTubeVideo;
  episode?: PodcastEpisode | any;
  isExpanded?: boolean;
  isPlaying?: boolean;
  onToggleExpand?: () => void;
  onTogglePlay?: () => void;
  variant?: 'default' | 'compact' | 'featured' | 'grid' | 'list';
  className?: string;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  video,
  episode,
  isExpanded = false,
  isPlaying = false,
  onToggleExpand,
  onTogglePlay,
  variant = 'default',
  className = '',
  onImageError,
}) => {
  const navigate = useNavigate();

  // Utiliser soit video, soit episode
  const data = video || episode;
  
  if (!data) {
    return null; // Retourne null si aucune donnée n'est fournie
  }

  const formatDuration = (duration: string | number) => {
    if (typeof duration === 'number') {
      // Convertir les secondes en format lisible
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      return `${hours > 0 ? `${hours}h ` : ''}${minutes}min ${seconds}s`;
    } else if (typeof duration === 'string') {
      // Convertir ISO 8601 en format lisible
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      if (!match) return '0min';
      
      const hours = parseInt(match[1]) || 0;
      const minutes = parseInt(match[2]) || 0;
      const seconds = parseInt(match[3]) || 0;
      return `${hours > 0 ? `${hours}h ` : ''}${minutes}min ${seconds > 0 ? `${seconds}s` : ''}`;
    }
    return '0min';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Déterminer les bonnes propriétés selon le type de données
  const imageUrl = video ? data.thumbnailUrl : (data.episodeImage || data.podcastImage);
  const title = data.title;
  const desc = data.description;
  const date = video ? data.publishedAt : data.publishedAt;
  const dur = data.duration;
  const auth = data.author;

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 ${className} relative`}
      whileHover={{ scale: 1.01, translateY: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`flex ${variant === 'list' || variant === 'default' ? 'flex-col md:flex-row' : 'flex-col'} gap-4`}>
        <div className="relative">
          <img 
            src={imageUrl}
            alt={title}
            className={`rounded-md object-cover ${
              variant === 'list' || variant === 'default' 
                ? 'w-full md:w-72 lg:w-96 xl:w-120 aspect-video' 
                : 'w-full aspect-video'
            }`}
            onError={onImageError}
          />
          <div 
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md cursor-pointer"
            onClick={() => video && navigate(`/video/${video.id}`)}
          >
            <span className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center gap-2 font-medium">
              <ExternalLink className="h-4 w-4" />
              Regarder la vidéo
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(date)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(dur)}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {auth}
            </div>
          </div>
          <div className="text-gray-600">
            {isExpanded ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: desc 
                }} 
                className="prose prose-sm max-w-none prose-blue"
              />
            ) : (
              <p className="line-clamp-2 text-sm">
                {desc.replace(/<[^>]*>/g, '')}
              </p>
            )}
          </div>
          {onToggleExpand && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleExpand();
              }}
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
      </div>
    </motion.div>
  );
};

export default EpisodeCard; 