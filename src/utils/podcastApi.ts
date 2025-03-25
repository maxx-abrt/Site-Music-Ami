import axios from 'axios';
import CryptoJS from 'crypto-js';

// Configuration de l'API
const API_KEY = 'MRYZFQ8VUCTH68HZBF6X';
const API_SECRET = 'qyCVd5v$Pz3Z^5bWHWq#ytMkNcn6$K8hpSK5ywb8';
const BASE_URL = 'https://api.podcastindex.org/api/1.0';

// Configuration de l'API YouTube
const YOUTUBE_API_KEY = 'AIzaSyDEoB1csom4eZHGETpMkDSyzgoIsG0rx6U';
const CHANNEL_ID = 'UCNZWO9kWm76mntaa8s7rJkQ'; // Replace with the actual channel ID

// Interface pour les podcasts
export interface Podcast {
  id: number;
  title: string;
  url: string;
  description: string;
  author: string;
  image: string;
  categories: Record<string, string>;
  episodeCount: number;
}

// Interface pour les épisodes
export interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  duration: number;
  author: string;
  enclosureUrl: string;
  episodeImage: string; // Image spécifique à l'épisode
  podcastImage: string; // Image du podcast parent
  categories?: string[];
}

// Interface pour les vidéos YouTube
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  author: string;
  viewCount?: string;
}

/**
 * Génère les en-têtes d'authentification pour l'API Podcast Index
 */
const getAuthHeaders = () => {
  const apiHeaderTime = Math.floor(Date.now() / 1000);
  const apiHeaderHash = CryptoJS.SHA1(`${API_KEY}${API_SECRET}${apiHeaderTime}`).toString();
  
  return {
    'X-Auth-Date': apiHeaderTime.toString(),
    'X-Auth-Key': API_KEY,
    'Authorization': apiHeaderHash,
  };
};

/**
 * Recherche des podcasts par terme
 */
export const searchPodcasts = async (term: string): Promise<Podcast[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/byterm`, {
      params: { q: term, max: 20 },
      headers: getAuthHeaders()
    });
    
    return response.data.feeds || [];
  } catch (error) {
    console.error('Erreur lors de la recherche de podcasts:', error);
    return [];
  }
};

/**
 * Récupère les détails d'un podcast par son ID
 */
export const getPodcastById = async (id: number): Promise<Podcast | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/podcasts/byfeedid`, {
      params: { id },
      headers: getAuthHeaders()
    });
    
    return response.data.feed || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du podcast:', error);
    return null;
  }
};

/**
 * Récupère les épisodes d'un podcast par son ID
 */
export const getEpisodesByPodcastId = async (podcastId: number): Promise<PodcastEpisode[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/episodes/byfeedidfull`, {
      params: { id: podcastId, max: 50 },
      headers: getAuthHeaders()
    });
    
    return response.data.items || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des épisodes:', error);
    return [];
  }
};

/**
 * Récupère les épisodes d'un podcast par son URL de flux RSS
 */
export const getEpisodesByFeedUrl = async (feedUrl: string): Promise<PodcastEpisode[]> => {
  try {
    // Utilisation de l'endpoint byitunesid qui fournit plus de détails sur les épisodes
    const response = await axios.get(`${BASE_URL}/episodes/byfeedurl`, {
      params: { 
        url: feedUrl, 
        max: 50,
        fulltext: true,
        pretty: true // Pour un meilleur débogage
      },
      headers: getAuthHeaders()
    });
    
    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      publishedAt: item.datePublished,
      duration: item.duration,
      author: item.author,
      enclosureUrl: item.enclosureUrl,
      episodeImage: item.artwork || item.image, // Artwork spécifique à l'épisode
      podcastImage: item.feedImage, // Image du podcast comme fallback
      categories: item.categories || []
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des épisodes:", error);
    return getMockEpisodes();
  }
};

/**
 * Récupère les podcasts populaires
 */
export const getTrendingPodcasts = async (category?: number): Promise<Podcast[]> => {
  try {
    const params: Record<string, any> = { max: 20 };
    if (category) params.cat = category;
    
    const response = await axios.get(`${BASE_URL}/podcasts/trending`, {
      params,
      headers: getAuthHeaders()
    });
    
    return response.data.feeds || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des podcasts tendance:', error);
    return getMockPodcasts();
  }
};

/**
 * Données de test pour les podcasts
 */
const getMockPodcasts = (): Podcast[] => {
  return [
    {
      id: 1,
      title: "Musique & Culture",
      url: "https://example.com/podcast1",
      description: "Un podcast sur l'influence de la musique dans notre culture",
      author: "Marie Dupont",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      categories: { "1": "Musique", "2": "Culture" },
      episodeCount: 42
    },
    {
      id: 2,
      title: "Histoire du Jazz",
      url: "https://example.com/podcast2",
      description: "Découvrez l'histoire fascinante du jazz à travers les époques",
      author: "Jean Martin",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      categories: { "1": "Jazz", "2": "Histoire" },
      episodeCount: 28
    },
    {
      id: 3,
      title: "Technologie Audio",
      url: "https://example.com/podcast3",
      description: "Tout sur les dernières innovations en matière de technologie audio",
      author: "Sophie Leclerc",
      image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      categories: { "1": "Technologie", "2": "Audio" },
      episodeCount: 35
    }
  ];
};

/**
 * Données de test pour les épisodes
 */
const getMockEpisodes = (): PodcastEpisode[] => {
  return [
    {
      id: 101,
      title: "L'évolution de la musique électronique",
      description: "Dans cet épisode, nous explorons l'histoire fascinante de la musique électronique, des premiers synthétiseurs aux productions modernes.",
      publishedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      duration: 2580,
      author: "Marie Dupont",
      enclosureUrl: "https://ia800905.us.archive.org/19/items/FREE_20s_Jazz_Collection/Harry_Reser_-_01_-_Dont_Wake_Me_Up.mp3",
      episodeImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      podcastImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      categories: ["Électronique", "Histoire"]
    },
    {
      id: 102,
      title: "Interview avec un compositeur de film",
      description: "Rencontre exclusive avec un compositeur renommé qui nous parle de son processus créatif et des défis de la composition pour le cinéma.",
      publishedAt: Date.now() - 9 * 24 * 60 * 60 * 1000,
      duration: 3120,
      author: "Jean Martin",
      enclosureUrl: "https://ia800905.us.archive.org/19/items/FREE_20s_Jazz_Collection/Harry_Reser_-_02_-_Crackerjack.mp3",
      episodeImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      podcastImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      categories: ["Cinéma", "Composition"]
    }
  ];
};

// Récupère les vidéos d'une chaîne YouTube
export const getYouTubeVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    // Première requête pour obtenir la liste des vidéos
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: 50,
        type: 'video',
        order: 'date',
        key: YOUTUBE_API_KEY,
      },
    });

    // Vérification si des éléments sont retournés
    if (!response.data.items || response.data.items.length === 0) {
      console.error('Aucune vidéo trouvée pour cette chaîne.');
      return [];
    }

    // Extraction des ID de vidéos
    const videoIds = response.data.items
      .filter((item: any) => item.id && item.id.videoId)
      .map((item: any) => item.id.videoId)
      .join(',');

    if (!videoIds) {
      console.error('Aucun ID de vidéo valide trouvé.');
      return [];
    }

    // Deuxième requête pour obtenir les détails des vidéos
    const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails,snippet,statistics',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    if (!videoDetailsResponse.data.items) {
      console.error('Aucun détail de vidéo trouvé.');
      return [];
    }

    // Filtrer pour exclure les Shorts (vidéos verticales et courtes)
    const filteredVideos = videoDetailsResponse.data.items.filter((item: any) => {
      // Convertir la durée ISO 8601 en secondes
      const duration = item.contentDetails.duration;
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0');
      const seconds = parseInt(match[3] || '0');
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      
      // Considérer comme Short si la durée est < 60 secondes
      return totalSeconds >= 60;
    });

    // Transformation des données en format YouTube Video
    return filteredVideos.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description || '',
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
      duration: item.contentDetails.duration || 'PT0S',
      author: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount,
      categories: []
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos YouTube:', error);
    return [];
  }
}; 