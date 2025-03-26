import { useEffect, useState } from 'react';

interface PerformanceOptions {
  enableLazyLoading?: boolean;
  preloadImages?: string[];
  preconnectUrls?: string[];
  prefetchUrls?: string[];
}

export const usePerformanceOptimization = ({
  enableLazyLoading = true,
  preloadImages = [],
  preconnectUrls = [],
  prefetchUrls = []
}: PerformanceOptions = {}) => {
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // En développement, désactiver la plupart des optimisations pour éviter les avertissements
    const isDev = process.env.NODE_ENV === 'development';
    
    // Ajouter des liens de préconnexion pour les domaines externes (utile même en dev)
    const preconnectLinks: HTMLLinkElement[] = [];
    
    if (!isDev) {
      preconnectUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
        preconnectLinks.push(link);
        
        // Ajouter également dns-prefetch comme fallback
        const dnsLink = document.createElement('link');
        dnsLink.rel = 'dns-prefetch';
        dnsLink.href = url;
        document.head.appendChild(dnsLink);
        preconnectLinks.push(dnsLink);
      });
    }
    
    // Précharger uniquement en production et limiter à 1 image maximum
    const preloadLinks: HTMLLinkElement[] = [];
    if (!isDev && preloadImages.length > 0) {
      const criticalImage = preloadImages[0]; // Une seule image critique
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = criticalImage;
      document.head.appendChild(link);
      preloadLinks.push(link);
    }
    
    // Désactiver complètement le prefetch en développement
    const prefetchLinks: HTMLLinkElement[] = [];
    if (!isDev) {
      // Limiter à une seule page en production
      const criticalPage = prefetchUrls[0];
      if (criticalPage) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = criticalPage;
        document.head.appendChild(link);
        prefetchLinks.push(link);
      }
    }
    
    // Activer le chargement paresseux pour toutes les images
    if (enableLazyLoading) {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
    
    setIsOptimized(true);
    
    // Nettoyage
    return () => {
      [...preconnectLinks, ...preloadLinks, ...prefetchLinks].forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [enableLazyLoading, preloadImages, preconnectUrls, prefetchUrls]);

  return { isOptimized };
}; 