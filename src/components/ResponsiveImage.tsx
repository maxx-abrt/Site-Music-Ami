import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  srcSet,
  loading = 'lazy',
  onError
}) => {
  // Générer automatiquement un srcSet si non fourni
  const defaultSrcSet = !srcSet && src ? `
    ${src.replace(/\.(jpg|jpeg|png|webp)/, '-small.$1')} 480w,
    ${src.replace(/\.(jpg|jpeg|png|webp)/, '-medium.$1')} 768w,
    ${src} 1280w
  ` : srcSet;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      sizes={sizes}
      srcSet={defaultSrcSet}
      onError={onError}
    />
  );
};

export default ResponsiveImage; 