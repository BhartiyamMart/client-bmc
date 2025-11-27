'use client';

import Image from 'next/image';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  blurDataURL,
  priority = false,
  sizes = '(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 500px',
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
