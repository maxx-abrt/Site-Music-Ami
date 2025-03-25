import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEpisodesByFeedUrl, getTrendingPodcasts, PodcastEpisode, Podcast } from '../utils/podcastApi';
import { getYouTubeVideos, YouTubeVideo } from '../utils/podcastApi';

// URL du flux RSS de votre podcast
const PODCAST_FEED_URL = 'https://anchor.fm/s/fb72a3fc/podcast/rss';

export const usePodcastEpisodes = (limit?: number) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['podcastEpisodes', { limit }],
    queryFn: async () => {
      try {
        const episodes = await getEpisodesByFeedUrl(PODCAST_FEED_URL);
        return limit ? episodes.slice(0, limit) : episodes;
      } catch (error) {
        console.error("Erreur lors de la récupération des épisodes:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    retry: 1, // Limiter les tentatives de nouvelle requête en cas d'échec
    onSuccess: (data) => {
      // Précharger les données individuelles des épisodes
      data.forEach(episode => {
        queryClient.setQueryData(['podcastEpisode', episode.id], episode);
      });
    }
  });
};

export const useYouTubeVideos = (limit?: number) => {
  // Utiliser une clé de requête différente selon qu'il y a une limite ou non
  return useQuery({
    // Inclure la limite dans la clé de requête pour différencier les requêtes
    queryKey: ['youtubeVideos', { limit }],
    queryFn: async () => {
      try {
        // Récupérer toutes les vidéos YouTube
        const videos = await getYouTubeVideos();
        
        // Filtrer pour exclure les shorts (généralement moins de 60 secondes ou avec #shorts dans le titre/description)
        const filteredVideos = videos.filter(video => {
          // Exclure les vidéos marquées comme shorts ou de durée très courte
          const isShort = 
            video.title?.toLowerCase().includes('#short') || 
            video.description?.toLowerCase().includes('#short') ||
            (video.duration && video.duration < 60); // Moins de 60 secondes
          
          return !isShort;
        });
        
        // Trier par date de publication (du plus récent au plus ancien)
        const sortedVideos = filteredVideos.sort((a, b) => {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        
        // Appliquer la limite si spécifiée
        return limit ? sortedVideos.slice(0, limit) : sortedVideos;
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos YouTube:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    retry: 1
  });
};

export const useLatestEpisodes = (limit: number = 3) => {
  // Utiliser useYouTubeVideos avec la limite spécifiée
  const { data, isLoading, error } = useYouTubeVideos(limit);
  
  return {
    latestEpisodes: data || [],
    isLoading,
    error
  };
};

export const useTrendingPodcasts = (limit: number = 3) => {
  return useQuery({
    queryKey: ['trendingPodcasts', { limit }],
    queryFn: async () => {
      try {
        const podcasts = await getTrendingPodcasts();
        return limit ? podcasts.slice(0, limit) : podcasts;
      } catch (error) {
        console.error("Erreur lors de la récupération des podcasts tendance:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    retry: 1
  });
}; 