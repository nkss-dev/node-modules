'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import fallbackImage from '../public/assets/404.svg';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  fallback?: ImageProps['src'];
  src?: ImageProps['src'] | null;
}

export default function ImageWithFallback({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error || !src ? fallback : src}
      {...props}
    />
  );
}
