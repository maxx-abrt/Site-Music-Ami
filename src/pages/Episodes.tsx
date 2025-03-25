import React, { useState } from 'react';
import { Search, RefreshCw, AlertTriangle, Filter, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EpisodeCard from '../components/EpisodeCard';
import { useYouTubeVideos } from '../hooks/usePodcastData';
import { Link } from 'react-router-dom';

const Episodes = () => {
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  
  const { data: videos, isLoading, error } = useYouTubeVideos();
  
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
        Object.values(video.categories).forEach(category => {
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
  
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-1 w-full sm:w-auto gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un épisode..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <select
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toutes catégories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Une erreur est survenue lors du chargement des vidéos.</p>
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