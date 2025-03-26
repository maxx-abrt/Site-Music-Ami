import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = '/images/placeholder.jpg',
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imgSrc, setImgSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    // Réinitialiser l'état si la source change
    if (src !== imgSrc && src !== placeholder) {
      setImgSrc(placeholder);
      setIsLoaded(false);
      
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
        onLoad && onLoad();
      };
      img.onerror = (e) => {
        onError && onError(e as any);
      };
    }
  }, [src, placeholder, onLoad, onError, imgSrc]);
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'animate-pulse bg-gray-200' : ''}`}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        setImgSrc(placeholder);
        onError && onError(e);
      }}
    />
  );
};

export default OptimizedImage; 