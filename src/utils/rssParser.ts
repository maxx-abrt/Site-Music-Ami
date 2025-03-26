import axios from 'axios';
import { parseString } from 'xml2js';

export interface Episode {
  guid: string;
  title: string;
  pubDate: string;
  formattedDate?: string;
  content: string;
  description?: string;
  duration?: string;
  imageUrl?: string;
  podcastImage?: string;
  enclosure?: {
    url: string;
    type: string;
    length: string;
  };
  categories?: string[];
  author?: string;
  season?: number;
  episode?: number;
}

/**
 * Formate la durée en minutes et secondes
 */
const formatDuration = (duration: string): string => {
  // Si la durée est en secondes
  if (!isNaN(Number(duration))) {
    const totalSeconds = parseInt(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Si la durée est au format HH:MM:SS
  const parts = duration.split(':');
  if (parts.length === 3) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }
  
  // Format par défaut
  return duration;
};

/**
 * Extrait l'URL de l'image depuis le contenu HTML
 */
const extractImageUrl = (content: string): string | undefined => {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : undefined;
};

/**
 * Nettoie le contenu HTML pour l'affichage
 */
const cleanHtmlContent = (content: string): string => {
  // Supprime les balises HTML
  let cleanContent = content.replace(/<[^>]*>/g, ' ');
  // Supprime les espaces multiples
  cleanContent = cleanContent.replace(/\s+/g, ' ');
  // Supprime les caractères spéciaux HTML
  cleanContent = cleanContent.replace(/&[^;]+;/g, '');
  return cleanContent.trim();
};

/**
 * Formate la date pour l'affichage
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error);
    return dateString;
  }
};

/**
 * Récupère les épisodes depuis un flux RSS
 */
export const fetchEpisodes = async (feedUrl: string): Promise<Episode[]> => {
  try {
    // Utiliser un proxy local pour éviter les problèmes CORS
    const proxyUrl = '/api/rss' + new URL(feedUrl).pathname;
    
    const response = await axios.get(proxyUrl, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'Cache-Control': 'no-cache'
      },
      timeout: 10000
    });
    
    const xml = response.data;
    
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'analyse XML:', err);
          reject(err);
          return;
        }
        
        try {
          // Vérification de la structure du flux RSS
          if (!result || !result.rss || !result.rss.channel) {
            throw new Error('Format RSS invalide');
          }
          
          const channel = result.rss.channel;
          const items = Array.isArray(channel.item) ? channel.item : [channel.item];
          
          // Image par défaut du podcast (si disponible)
          const podcastImageUrl = channel.image?.url || '';
          
          const episodes = items.map((item: any) => {
            // Extraction de l'image spécifique à l'épisode
            const episodeImage = 
              item['itunes:image']?.href || // Format iTunes
              item['media:thumbnail']?.url || // Format Media RSS
              item.image?.url || // Format RSS standard
              extractImageUrl(item['content:encoded']) || // Image dans le contenu
              item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] || // Image dans la description
              podcastImageUrl; // Fallback sur l'image du podcast
            
            // Extraction des données de base
            const content = item['content:encoded'] || item.description || '';
            const description = item.description || '';
            
            // Extraction des métadonnées iTunes (si disponibles)
            const itunesData = item['itunes:duration'] || 
                              (item.itunes && item.itunes.duration) || 
                              '45:00'; // Durée par défaut
            
            const itunesAuthor = item['itunes:author'] || 
                                (item.itunes && item.itunes.author) || 
                                channel.author || 
                                'Musicami';
            
            const itunesSeason = item['itunes:season'] || 
                                (item.itunes && item.itunes.season) || 
                                null;
            
            const itunesEpisode = item['itunes:episode'] || 
                                 (item.itunes && item.itunes.episode) || 
                                 null;
            
            // Extraction des catégories
            let categories: string[] = [];
            if (item.category) {
              categories = Array.isArray(item.category) 
                ? item.category 
                : [item.category];
            }
            
            // Construction de l'objet épisode
            const episode: Episode = {
              guid: item.guid?._ || item.guid || item.link,
              title: item.title,
              pubDate: item.pubDate,
              formattedDate: formatDate(item.pubDate),
              content: item['content:encoded'] || item.description,
              description: item.description || '',
              duration: formatDuration(itunesData),
              imageUrl: episodeImage,
              podcastImage: podcastImageUrl,
              enclosure: item.enclosure,
              categories: categories,
              author: itunesAuthor,
              season: itunesSeason,
              episode: itunesEpisode
            };
            
            return episode;
          });
          
          resolve(episodes);
        } catch (error) {
          console.error('Erreur lors du traitement des données RSS:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du flux RSS:', error);
    
    // Utiliser des données de démonstration en cas d'échec
    return getMockEpisodes();
  }
};

/**
 * Fournit des données de démonstration en cas d'échec de récupération
 */
const getMockEpisodes = (): Episode[] => {
  return [
    {
      guid: 'episode-1',
      title: 'Les origines du jazz moderne',
      pubDate: new Date().toISOString(),
      formattedDate: formatDate(new Date().toISOString()),
      content: 'Dans cet épisode, nous explorons les racines du jazz moderne et son influence sur la musique contemporaine.',
      description: 'Une plongée dans l\'histoire du jazz',
      duration: '45:30',
      imageUrl: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categories: ['Jazz', 'Histoire musicale'],
      author: 'Thomas Martin',
      enclosure: {
        url: 'https://ia800905.us.archive.org/19/items/FREE_20s_Jazz_Collection/Harry_Reser_-_01_-_Dry_Martini.mp3',
        type: 'audio/mpeg',
        length: '0'
      }
    },
    {
      guid: 'episode-2',
      title: 'L\'évolution de la musique électronique',
      pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      formattedDate: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      content: 'Comment la musique électronique a-t-elle évolué depuis ses débuts? Nous analysons les tendances et les artistes qui ont façonné ce genre.',
      description: 'Un voyage à travers l\'histoire de la musique électronique',
      duration: '52:15',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categories: ['Électronique', 'Technologie'],
      author: 'Sophie Dubois',
      enclosure: {
        url: 'https://ia800905.us.archive.org/19/items/FREE_20s_Jazz_Collection/Harry_Reser_-_02_-_Crackerjack.mp3',
        type: 'audio/mpeg',
        length: '0'
      }
    },
    {
      guid: 'episode-3',
      title: 'Les instruments traditionnels dans la musique moderne',
      pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      formattedDate: formatDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()),
      content: 'Découvrez comment les instruments traditionnels trouvent leur place dans les productions musicales contemporaines.',
      description: 'La fusion entre tradition et modernité',
      duration: '38:45',
      imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categories: ['Instruments', 'Fusion', 'Musique du monde'],
      author: 'Marc Laurent',
      enclosure: {
        url: 'https://ia800905.us.archive.org/19/items/FREE_20s_Jazz_Collection/Harry_Reser_-_03_-_Goofus.mp3',
        type: 'audio/mpeg',
        length: '0'
      }
    }
  ];
};