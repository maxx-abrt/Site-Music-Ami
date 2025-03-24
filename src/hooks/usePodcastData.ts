import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEpisodesByFeedUrl, getTrendingPodcasts, PodcastEpisode, Podcast } from '../utils/podcastApi';

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

export const useTrendingPodcasts = (limit: number = 5) => {
  return useQuery({
    queryKey: ['trendingPodcasts'],
    queryFn: async () => {
      try {
        const podcasts = await getTrendingPodcasts();
        return podcasts.slice(0, limit);
      } catch (error) {
        console.error("Erreur lors de la récupération des podcasts tendance:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 heures
    retry: 1, // Limiter les tentatives de nouvelle requête en cas d'échec
  });
};

export const useLatestEpisodes = (count: number = 2) => {
  const { data, isLoading, error } = usePodcastEpisodes();
  
  const latestEpisodes = data?.slice(0, count) || [];
  
  return {
    latestEpisodes,
    isLoading,
    error
  };
}; 