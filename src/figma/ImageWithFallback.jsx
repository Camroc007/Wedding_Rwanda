import React from 'react';

export function ImageWithFallback({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} />;
}