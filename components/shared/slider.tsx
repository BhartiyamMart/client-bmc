'use client';

import React, { useState, useCallback, useEffect, useRef, ReactNode, useMemo } from 'react';

interface ResponsiveBreakpoint {
  slidesToShow: number;
  slidesToScroll: number;
}

interface SliderProps {
  cards: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsiveBreakpoints?: Record<number, ResponsiveBreakpoint>;
  infinite?: boolean;
  className?: string;
  cardClassName?: string;
}

const Slider: React.FC<SliderProps> = ({
  cards,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  responsiveBreakpoints,
  infinite = true,
  className = '',
  cardClassName = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow);
  const [currentSlidesToScroll, setCurrentSlidesToScroll] = useState(slidesToScroll);
  const [dragOffset, setDragOffset] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const dragStateRef = useRef({ isDragging: false, startX: 0 });
  const transitioningRef = useRef(false);

  // Memoized calculations
  const totalSlides = useMemo(() => cards.length, [cards.length]);

  const effectiveSlidesToShow = useMemo(
    () => Math.min(currentSlidesToShow, totalSlides),
    [currentSlidesToShow, totalSlides]
  );

  const maxSlide = useMemo(
    () => Math.max(0, totalSlides - effectiveSlidesToShow),
    [totalSlides, effectiveSlidesToShow]
  );

  const shouldShowNavigation = useMemo(() => totalSlides > effectiveSlidesToShow, [totalSlides, effectiveSlidesToShow]);

  const shouldShowPrevButton = useMemo(() => infinite || currentSlide > 0, [infinite, currentSlide]);

  const shouldShowNextButton = useMemo(() => infinite || currentSlide < maxSlide, [infinite, currentSlide, maxSlide]);

  const dotsCount = useMemo(
    () => Math.max(1, Math.ceil((totalSlides - effectiveSlidesToShow) / currentSlidesToScroll) + 1),
    [totalSlides, effectiveSlidesToShow, currentSlidesToScroll]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (transitioningRef.current || totalSlides <= effectiveSlidesToShow) return;

    transitioningRef.current = true;
    setCurrentSlide((prev) => {
      const nextSlide = prev + currentSlidesToScroll;
      if (infinite) {
        return nextSlide > maxSlide ? 0 : nextSlide;
      }
      return Math.min(nextSlide, maxSlide);
    });

    setTimeout(() => {
      transitioningRef.current = false;
    }, 300);
  }, [totalSlides, effectiveSlidesToShow, currentSlidesToScroll, infinite, maxSlide]);

  const handlePrev = useCallback(() => {
    if (transitioningRef.current || totalSlides <= effectiveSlidesToShow) return;

    transitioningRef.current = true;
    setCurrentSlide((prev) => {
      const prevSlide = prev - currentSlidesToScroll;
      if (infinite) {
        return prevSlide < 0 ? maxSlide : prevSlide;
      }
      return Math.max(prevSlide, 0);
    });

    setTimeout(() => {
      transitioningRef.current = false;
    }, 300);
  }, [totalSlides, effectiveSlidesToShow, currentSlidesToScroll, infinite, maxSlide]);

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (transitioningRef.current || totalSlides <= effectiveSlidesToShow) return;

      transitioningRef.current = true;
      setCurrentSlide(Math.min(slideIndex, maxSlide));

      setTimeout(() => {
        transitioningRef.current = false;
      }, 300);
    },
    [totalSlides, effectiveSlidesToShow, maxSlide]
  );

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    dragStateRef.current = { isDragging: true, startX: clientX };
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!dragStateRef.current.isDragging || !sliderRef.current) return;

    const diff = dragStateRef.current.startX - clientX;
    const containerWidth = sliderRef.current.offsetWidth;
    const offset = (diff / containerWidth) * 100;
    setDragOffset(offset);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragStateRef.current.isDragging) return;

    const threshold = 50;
    const actualDiff =
      dragStateRef.current.startX -
      (dragStateRef.current.startX - (dragOffset * (sliderRef.current?.offsetWidth || 1)) / 100);

    if (Math.abs(actualDiff) > threshold) {
      if (actualDiff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    dragStateRef.current = { isDragging: false, startX: 0 };
    setDragOffset(0);
  }, [dragOffset, handleNext, handlePrev]);

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDragMove(e.clientX);
    },
    [handleDragMove]
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    },
    [handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleDragMove(e.touches[0].clientX);
    },
    [handleDragMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Auto-play control
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (autoPlay && !dragStateRef.current.isDragging && totalSlides > effectiveSlidesToShow) {
      stopAutoPlay();
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }
  }, [autoPlay, autoPlayInterval, totalSlides, effectiveSlidesToShow, handleNext, stopAutoPlay]);

  const handleMouseEnter = useCallback(() => {
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    startAutoPlay();
  }, [startAutoPlay]);

  // Responsive breakpoint handling
  useEffect(() => {
    const handleResize = () => {
      if (!responsiveBreakpoints) {
        setCurrentSlidesToShow(slidesToShow);
        setCurrentSlidesToScroll(slidesToScroll);
        return;
      }

      const width = window.innerWidth;
      const breakpoints = Object.keys(responsiveBreakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      let appliedConfig = { slidesToShow, slidesToScroll };

      for (const breakpoint of breakpoints) {
        if (width >= breakpoint) {
          appliedConfig = responsiveBreakpoints[breakpoint];
          break;
        }
      }

      setCurrentSlidesToShow(appliedConfig.slidesToShow);
      setCurrentSlidesToScroll(appliedConfig.slidesToScroll);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsiveBreakpoints, slidesToShow, slidesToScroll]);

  // Reset slide position when configuration changes
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(Math.max(0, maxSlide));
    }
  }, [currentSlide, maxSlide]);

  // Auto-play effect
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  // Calculate transform value
  const transformValue = useMemo(() => {
    const slideWidth = 100 / effectiveSlidesToShow;
    const baseTransform = currentSlide * slideWidth;

    if (dragStateRef.current.isDragging) {
      const maxTransform = (totalSlides - effectiveSlidesToShow) * slideWidth;
      return Math.min(Math.max(baseTransform + dragOffset, 0), maxTransform);
    }

    return baseTransform;
  }, [currentSlide, effectiveSlidesToShow, totalSlides, dragOffset]);

  return (
    <div
      className={`slider-container relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Slider */}
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className={`slider-wrapper flex transition-transform ${
            dragStateRef.current.isDragging ? 'duration-0' : 'duration-300'
          } ease-in-out select-none`}
          style={{
            transform: `translateX(-${transformValue}%)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`slider-slide shrink-0 ${cardClassName}`}
              style={{
                width: `${100 / effectiveSlidesToShow}%`,
                minWidth: `${100 / effectiveSlidesToShow}%`,
              }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && shouldShowNavigation && (
        <>
          {shouldShowPrevButton && (
            <button
              onClick={handlePrev}
              className="slider-arrow slider-arrow-prev absolute top-1/2 -left-[7px] z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#333] text-white shadow-lg transition-all duration-200 hover:scale-105 md:-left-3 md:h-10 md:w-10"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 md:h-4 md:w-4">
                <path
                  d="M10 12l-4-4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {shouldShowNextButton && (
            <button
              onClick={handleNext}
              className="slider-arrow slider-arrow-next absolute top-1/2 -right-2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#333] text-white shadow-lg transition-all duration-200 hover:scale-105 md:-right-3 md:h-10 md:w-10"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 md:h-4 md:w-4">
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Dots Navigation */}
      {showDots && shouldShowNavigation && dotsCount > 1 && (
        <div className="slider-dots mt-4 flex justify-center space-x-2">
          {Array.from({ length: dotsCount }).map((_, index) => {
            const dotSlideIndex = index * currentSlidesToScroll;
            const isActive = Math.abs(currentSlide - dotSlideIndex) < currentSlidesToScroll;

            return (
              <button
                key={index}
                onClick={() => goToSlide(dotSlideIndex)}
                className={`h-3 rounded-full transition-all duration-200 ${
                  isActive ? 'w-6 bg-orange-500' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
