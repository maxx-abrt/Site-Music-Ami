import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEpisodesByFeedUrl, getTrendingPodcasts, PodcastEpisode, Podcast } from '../utils/podcastApi';
import { getYouTubeVideos, YouTubeVideo } from '../utils/podcastApi';

// URL du flux RSS de votre podcast
const PODCAST_FEED_URL = 'https://anchor.fm/s/fb72a3fc/podcast/rss';

export const usePodcastEpisodes = (limit?: number) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['podcastEpisodes'],
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
  return useQuery({
    queryKey: ['youtubeVideos'],
    queryFn: async () => {
      try {
        const videos = await getYouTubeVideos();
        return limit ? videos.slice(0, limit) : videos;
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos YouTube:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    retry: 1
  });
};

export const useLatestEpisodes = (limit: number = 6) => {
  // Remplacer par useYouTubeVideos pour assurer la cohérence
  const { data, isLoading, error } = useYouTubeVideos(limit);
  
  return {
    latestEpisodes: data || [],
    isLoading,
    error
  };
};

export const useTrendingPodcasts = (limit: number = 3) => {
  return useQuery({
    queryKey: ['trendingPodcasts'],
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