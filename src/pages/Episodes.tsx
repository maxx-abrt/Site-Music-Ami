import React, { useState } from 'react';
import { Search, RefreshCw, AlertTriangle, Filter, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EpisodeCard from '../components/EpisodeCard';
import { useYouTubeVideos } from '../hooks/usePodcastData';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Episodes = () => {
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const queryClient = useQueryClient();
  
  // Récupérer toutes les vidéos sans limite
  const { data: videos, isLoading, error, refetch } = useYouTubeVideos();
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Invalider le cache pour forcer un rechargement complet
      await queryClient.invalidateQueries({ queryKey: ['youtubeVideos'] });
      await refetch();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const toggleExpand = (id: string) => {
    setExpandedEpisode(expandedEpisode === id ? null : id);
  };
  
  const togglePlay = (id: string) => {
    setPlayingEpisode(playingEpisode === id ? null : id);
  };
  
  // Extraire toutes les catégories uniques des épisodes
  const allCategories = React.useMemo(() => {
    if (!videos) return [];
    
    const categories = new Set<string>();
    videos.forEach(video => {
      if (video.categories) {
        video.categories.forEach(category => {
          categories.add(category);
        });
      }
    });
    
    return Array.from(categories).sort();
  }, [videos]);
  
  const filteredEpisodes = React.useMemo(() => {
    if (!videos) return [];
    
    return videos.filter(video => {
      const matchesFilter = filter ? video.title.toLowerCase().includes(filter.toLowerCase()) : true;
      const matchesCategory = categoryFilter ? video.categories?.includes(categoryFilter) : true;
      return matchesFilter && matchesCategory;
    });
  }, [videos, filter, categoryFilter]);
  
  // Effet pour forcer un rafraîchissement au montage du composant
  React.useEffect(() => {
    // Vérifier si nous avons moins de 4 vidéos (ce qui suggère que nous avons les données limitées)
    if (videos && videos.length <= 3) {
      handleRefresh();
    }
  }, []);
  
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      

      {isLoading || isRefreshing ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Une erreur est survenue lors du chargement des vidéos.</p>
        </div>
      ) : filteredEpisodes.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Aucun épisode ne correspond à votre recherche.</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8" 
            : "space-y-12"
          }>
            {filteredEpisodes.map(video => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' ? 'h-full' : ''}
              >
                <Link to={`/video/${video.id}`} className="block h-full">
                  <EpisodeCard
                    video={video}
                    isExpanded={expandedEpisode === video.id}
                    onToggleExpand={() => toggleExpand(video.id)}
                    variant={viewMode === 'grid' ? 'grid' : 'default'}
                    className={`${viewMode === 'grid' ? 'h-full' : 'max-w-none w-full'} ${viewMode === 'list' ? 'thumbnail-large' : ''}`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Episodes;