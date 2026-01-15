'use client';
import { Package, RotateCCW, Share2, Truck } from '@/components/shared/svg/lucide-icon';
import Container from '@/components/shared/ui/container';
import Section from '@/components/shared/ui/section';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

export default function ProductDetail() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlight' | 'information'>('highlight');
  const [isHighlightInfoOpen, setIsHighlightInfoOpen] = useState(false);
  const [totalQuantity, setTotalQunatity] = useState(0);

  // Carousel navigation states
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [maxScrollIndex, setMaxScrollIndex] = useState(0);

  // Thumbnails + full images
  const images = [
    { index: 1, thumb: '/temp/product/magik_cook_sooji.webp', full: '/temp/product/magik_cook_sooji.webp' },
    { index: 2, thumb: '/temp/product/fortune_sooji.png', full: '/temp/product/fortune_sooji.png' },
    { index: 3, thumb: '/temp/product/magik_cook_sooji.webp', full: '/temp/product/magik_cook_sooji.webp' },
    { index: 4, thumb: '/temp/product/fortune_sooji.png', full: '/temp/product/fortune_sooji.png' },
    { index: 5, thumb: '/temp/product/magik_cook_sooji.webp', full: '/temp/product/magik_cook_sooji.webp' },
    { index: 6, thumb: '/temp/product/fortune_sooji.png', full: '/temp/product/fortune_sooji.png' },
    { index: 7, thumb: '/temp/product/magik_cook_sooji.webp', full: '/temp/product/magik_cook_sooji.webp' },
    { index: 8, thumb: '/temp/product/fortune_sooji.png', full: '/temp/product/fortune_sooji.png' },
  ];
  const [selectedImage, setSelectedImage] = useState(images[0].full);

  // Horizontal thumbnail scrolling (mobile)
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Calculate max scroll index on mount and window resize
  useEffect(() => {
    const calculateMaxScrollIndex = () => {
      const container = mobileScrollRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const firstImage = container.querySelector('img');
        if (firstImage) {
          const containerStyles = window.getComputedStyle(container);
          const gap = parseInt(containerStyles.gap.replace('px', '')) || 8;
          const imageRect = firstImage.getBoundingClientRect();
          const imageWidth = imageRect.width;
          const imageWithGap = imageWidth + gap;

          // Calculate how many images can fit in the visible area
          const visibleImages = Math.floor(containerWidth / imageWithGap);
          // Calculate max scroll index (how many scroll steps are possible)
          const maxIndex = Math.max(0, images.length - visibleImages);
          setMaxScrollIndex(maxIndex);
        }
      }
    };

    calculateMaxScrollIndex();
    window.addEventListener('resize', calculateMaxScrollIndex);

    return () => {
      window.removeEventListener('resize', calculateMaxScrollIndex);
    };
  }, [images.length]);

  const scrollHorizontal = (direction: unknown) => {
    const container = mobileScrollRef.current;
    if (container) {
      // Get the first image to calculate dimensions
      const firstImage = container.querySelector('img');
      if (firstImage) {
        // Get the computed styles to include gap
        const containerStyles = window.getComputedStyle(container);
        const gap = parseInt(containerStyles.gap.replace('px', '')) || 8;
        // Get image dimensions using getBoundingClientRect
        const imageRect = firstImage.getBoundingClientRect();
        const imageWidth = imageRect.width;
        // Calculate scroll distance (image width + gap)
        const scrollDistance = imageWidth + gap;

        // Update scroll index based on direction
        if (direction === 'left' && currentScrollIndex > 0) {
          setCurrentScrollIndex((prev) => prev - 1);
        } else if (direction === 'right' && currentScrollIndex < maxScrollIndex) {
          setCurrentScrollIndex((prev) => prev + 1);
        }

        // Scroll by one image width
        container.scrollBy({
          left: direction === 'left' ? -scrollDistance : scrollDistance,
          behavior: 'smooth',
        });
      }
    }
  };

  // Zoom effect (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    setBackgroundPosition(`${xPercent}% ${yPercent}%`);
  };

  const handleAddToCart = () => {
    setTotalQunatity(1);
  };

  const decreaseQuantityForCart = () => {
    setTotalQunatity(Math.max(totalQuantity - 1, 0));
  };

  const increaseQuantityForCart = () => {
    setTotalQunatity(totalQuantity + 1);
  };

  return (
    <Section>
      <Container>
        {/* Main Product Section */}
        <div className="grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-12 lg:grid-cols-12">
          {/* Mobile/Tablet Layout */}
          <div className="md:hidden">
            <div className="bg-white p-2 sm:p-4">
              <Image
                src={selectedImage}
                alt="Alphonso Mango"
                ref={imgRef}
                width={1200}
                height={800}
                className="w-full rounded-md object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
            {/* Desktop / Tablet thumbnails only (≥640px) */}
            <div className="mb-6 hidden w-full min-w-[320px] items-center gap-4 sm:flex">
              {/* Left Button - Only show when currentScrollIndex > 0 */}
              {currentScrollIndex > 0 && (
                <button
                  onClick={() => scrollHorizontal('left')}
                  className="flex-shrink-0 cursor-pointer rounded-full bg-[#F0701E] p-2"
                >
                  {/* <ChevronLeft className="h-5 w-5" /> */}

                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5 0L5.29312 0.79875L2.15437 3.9375L9 3.9375L9 5.0625L2.15437 5.0625L5.29312 8.20688L4.5 9L0 4.5L4.5 0Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
              {/* Thumbnails */}
              <div
                ref={mobileScrollRef}
                className="scrollbar-hide flex flex-1 gap-3 overflow-x-auto scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  scrollSnapType: 'x mandatory',
                }}
              >
                {images.map((img, index) => (
                  <Image
                    key={index}
                    src={img.thumb}
                    alt={`Product thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className={`h-16 w-16 cursor-pointer rounded-md border transition-all duration-200 md:h-20 md:w-20 ${
                      selectedImage === img.full ? 'border-[#F0701E]' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ scrollSnapAlign: 'start' }}
                    onClick={() => setSelectedImage(img.full)}
                  />
                ))}
              </div>
              {/* Right Button - Only show when currentScrollIndex < maxScrollIndex */}
              {currentScrollIndex < maxScrollIndex && (
                <button
                  onClick={() => scrollHorizontal('right')}
                  className="flex-shrink-0 cursor-pointer rounded-full bg-[#F0701E] p-2"
                >
                  {/* <ChevronRight className="h-5 w-5" /> */}

                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5 0L3.70688 0.79875L6.84563 3.9375L2.14577e-07 3.9375L2.14577e-07 5.0625L6.84563 5.0625L3.70688 8.20688L4.5 9L9 4.5L4.5 0Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
            </div>
            {/* Product Info - Mobile */}
            <div className="rounded-lg border p-4 sm:p-6">
              <div className="hidden max-[350px]:flex max-[350px]:flex-col max-[350px]:gap-1 max-[350px]:text-xs">
                <div className="flex items-center justify-between">
                  <h1 className="font-medium text-black max-[350px]:text-sm">Alphonso Mango</h1>
                  <span className="font-medium text-gray-500 max-[350px]:text-[10px]">15 min</span>
                </div>
                <div className="font-medium text-green-700 max-[350px]:text-[10px]">In Stock</div>
                <div className="text-gray-600 max-[350px]:text-[10px]">Net Qty: 1 pack</div>
              </div>
              {/* Regular layout for screens > 350px */}
              <div className="mb-2 flex flex-col gap-1 max-[350px]:hidden sm:gap-2">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  {/* Left side: Name + In stock */}
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium text-black sm:text-2xl lg:text-[27px]">Alphonso Mango</h1>
                    <span className="rounded-sm bg-green-700 px-2 py-1 text-xs font-medium text-white sm:text-sm">
                      In Stock
                    </span>
                  </div>
                  {/* Right side: Time */}
                  <span className="float-right rounded-sm bg-gray-100 p-1 px-3">
                    <Share2 />
                  </span>
                </div>
                {/* Bottom row */}
                <div className="text-sm text-[#868686]">Net Qty: 1 pack</div>
              </div>
              {/* Price */}
              <div className="mb-6 space-y-2">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  {/* Price + Discount */}
                  <div className="flex flex-col text-sm sm:text-base">
                    {/* First row: Price + Discount */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-semibold text-black sm:text-3xl lg:text-4xl">₹60</span>
                      <span className="text-sm font-semibold text-green-600 sm:text-base">15% OFF</span>
                    </div>
                    {/* Second row: MRP */}
                    <div className="w-full max-w-[100%] text-xs break-words text-gray-400 sm:text-sm">
                      <span className="text-[14px] text-gray-600">MRP ₹</span>
                      <span className="text-[14px] text-gray-700 line-through">75</span>{' '}
                      <span className="text-[14px] text-gray-500">(incl. of all Taxes)</span>
                    </div>
                  </div>
                  {/* Add button */}
                  {totalQuantity > 0 ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center rounded-lg bg-[#F0701E] text-white">
                        <button
                          className="cursor-pointer px-4 py-2 text-[16px] font-medium"
                          aria-label="Decrease quantity"
                          onClick={decreaseQuantityForCart}
                        >
                          −
                        </button>
                        <span className="px-4 text-[16px] font-medium">{totalQuantity}</span>
                        <button
                          className="cursor-pointer px-4 py-2 text-[16px] font-medium"
                          aria-label="Increase quantity"
                          onClick={increaseQuantityForCart}
                        >
                          +
                        </button>
                      </div>
                      <span className="mr-5 text-[10px] text-gray-400">3 Variants</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      <button
                        className="cursor-pointer rounded-lg bg-[#F0701E] px-8 py-2 text-[16px] font-medium text-white"
                        onClick={handleAddToCart}
                      >
                        Add
                      </button>
                      <span className="mr-5 text-[10px] text-gray-400">3 Variants</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Visible only on <1024px */}
              <div className="w-full lg:hidden">
                <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
                  {/* Full-width top box */}
                  <div className="my-1 w-full border-t border-gray-300"></div>
                  <div className="mx-auto flex w-full max-w-[690px] items-center justify-between p-2">
                    {/* Left SVG + Text */}
                    <div className="flex items-center">
                      {/* Left SVG */}
                      <Image
                        height={1000}
                        width={1000}
                        src="/image/mango.svg"
                        alt="mongo"
                        className="h-[25px] w-[25px]"
                      />
                      {/* Text immediately after SVG */}
                      <div className="ml-[15px] flex flex-col">
                        <span className="text-[14px] leading-[100%] font-medium text-black">Alphonso Mango</span>
                        <span className="text-[10px] leading-[100%] font-semibold text-[#109441]">
                          Explore all products
                        </span>
                      </div>
                    </div>
                    {/* Right SVG */}
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.5002 12.9491C8.49974 12.8505 8.51896 12.7529 8.55674 12.6619C8.59451 12.5709 8.65009 12.4883 8.7202 12.4191L14.1902 6.94907L8.7202 1.47907C8.58772 1.33689 8.5156 1.14884 8.51903 0.954543C8.52245 0.760242 8.60117 0.574856 8.73858 0.437443C8.87599 0.30003 9.06138 0.221319 9.25568 0.21789C9.44998 0.214462 9.63803 0.286585 9.7802 0.419065L15.7802 6.41907C15.9207 6.55969 15.9995 6.75031 15.9995 6.94907C15.9995 7.14782 15.9207 7.33844 15.7802 7.47906L9.7802 13.4791C9.63958 13.6195 9.44895 13.6984 9.2502 13.6984C9.05145 13.6984 8.86083 13.6195 8.7202 13.4791C8.65009 13.4098 8.59451 13.3273 8.55674 13.2363C8.51896 13.1452 8.49974 13.0476 8.5002 12.9491Z"
                        fill="#CCCCCC"
                      />
                      <path
                        d="M0.500031 6.94922C0.502621 6.75111 0.58247 6.56185 0.722565 6.42175C0.862659 6.28166 1.05192 6.20181 1.25003 6.19922L15.25 6.19922C15.4489 6.19922 15.6397 6.27824 15.7804 6.41889C15.921 6.55954 16 6.75031 16 6.94922C16 7.14813 15.921 7.3389 15.7804 7.47955C15.6397 7.6202 15.4489 7.69922 15.25 7.69922L1.25003 7.69922C1.05192 7.69663 0.862659 7.61678 0.722565 7.47668C0.58247 7.33659 0.502621 7.14733 0.500031 6.94922Z"
                        fill="#CCCCCC"
                      />
                    </svg>
                  </div>
                  <div className="my-1 w-full border-t border-gray-300"></div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    <div className="flex flex-col items-center rounded-lg border bg-[#FFE1CE] px-3 py-2 text-center">
                      <RotateCCW />
                      <p className="mt-1 text-[10px] font-medium sm:text-[10px]">No Return</p>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border bg-[#FFE1CE] px-3 py-2 text-center">
                      <Truck />
                      <p className="mt-1 text-[10px] font-medium sm:text-[10px]">Fast Delivery</p>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border bg-[#FFE1CE] px-3 py-2 text-center">
                      <Package />
                      <p className="mt-1 text-[10px] font-medium sm:text-[10px]">Exchange</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-proxima w-full rounded bg-white p-2 text-black md:h-[107px] md:w-[300px]">
                {/* Highlights Title with horizontal line */}
                <div className="mb-2 flex items-center">
                  <h2 className="text-[16px] font-medium" style={{ lineHeight: '100%' }}>
                    Highlights
                  </h2>
                  <div className="ml-2 flex-1 border-t border-gray-300"></div>
                </div>
                {/* Attributes and Details */}
                <div className="flex justify-between">
                  {/* Left Column */}
                  <div className="flex flex-col gap-2 font-normal text-black">
                    <span className="text-[12px] leading-[20px]">Attribute</span>
                    <span className="text-[12px] leading-[20px]">Variety</span>
                    <span className="text-[12px] leading-[20px]">Weight/Pack Size</span>
                  </div>
                  {/* Right Column */}
                  <div className="flex flex-col gap-2 font-normal text-black">
                    <span className="text-[12px] leading-[20px]">Details</span>
                    <span className="text-[12px] leading-[20px]">Alphazo Mango</span>
                    <span className="text-[12px] leading-[20px]">1kg (3–4 pieces)</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-full justify-center md:hidden">
                <button
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#FFF4E5] px-6 py-2 text-sm font-medium text-[#F0701E] transition"
                  onClick={() => setIsHighlightInfoOpen(true)}
                >
                  Know More Details
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.13397 7.5C4.51887 8.16667 5.48113 8.16667 5.86603 7.5L9.33013 1.5C9.71503 0.833334 9.2339 0 8.4641 0H1.5359C0.766098 0 0.284973 0.833333 0.669873 1.5L4.13397 7.5Z"
                      fill="#333333"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Desktop Layout */}
          <div className="hidden md:contents">
            {/* Middle Column - Main Image (Desktop) */}
            <div className="col-span-12 sm:col-span-5 md:col-span-5 lg:col-span-5">
              <div
                className="relative cursor-crosshair rounded-lg border p-2 lg:flex lg:items-center lg:justify-center"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomVisible(true)}
                onMouseLeave={() => setIsZoomVisible(false)}
              >
                <Image
                  height={1000}
                  width={1000}
                  ref={imgRef}
                  src={selectedImage}
                  alt="Alphonso Mango"
                  className="h-80 w-80 rounded-lg object-cover"
                />
              </div>
              <div className="xs:gap-2 mt-3 mb-6 flex w-full min-w-[320px] items-center gap-1 sm:gap-4">
                {/* Left Button - Only show when currentScrollIndex > 0 */}
                {currentScrollIndex > 0 && (
                  <button
                    onClick={() => scrollHorizontal('left')}
                    className="xs:p-1.5 flex-shrink-0 cursor-pointer rounded-full bg-[#F0701E] p-1 sm:p-2"
                  >
                    {/* <ChevronLeft className="xs:h-4 xs:w-4 h-4 w-4 sm:h-5 sm:w-5" /> */}

                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.5 0L5.29312 0.79875L2.15437 3.9375L9 3.9375L9 5.0625L2.15437 5.0625L5.29312 8.20688L4.5 9L0 4.5L4.5 0Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                )}
                {/* Images Container with Scroll Snap */}
                <div
                  ref={mobileScrollRef}
                  className="xs:gap-2 scrollbar-hide flex flex-1 gap-1 overflow-x-auto scroll-smooth sm:gap-3"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollSnapType: 'x mandatory',
                  }}
                >
                  {images.map((img, index) => (
                    <Image
                      height={1000}
                      width={1000}
                      key={index}
                      src={img.thumb}
                      alt={`Product thumbnail ${index + 1}`}
                      className={`xs:h-14 xs:w-14 xs:rounded-lg h-15 w-15 flex-shrink-0 cursor-pointer rounded-md border-1 transition-all duration-200 sm:h-16 sm:w-16 md:h-20 md:w-20 ${
                        selectedImage === img.full ? 'border-[#F0701E]' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ scrollSnapAlign: 'start' }}
                      onClick={() => setSelectedImage(img.full)}
                    />
                  ))}
                </div>
                {/* Right Button - Only show when currentScrollIndex < maxScrollIndex */}
                {currentScrollIndex < maxScrollIndex && (
                  <button
                    onClick={() => scrollHorizontal('right')}
                    className="xs:p-1.5 flex-shrink-0 cursor-pointer rounded-full bg-[#F0701E] p-1 sm:p-2"
                  >
                    {/* <ChevronRight className="xs:h-4 xs:w-4 h-4 w-4 sm:h-5 sm:w-5" /> */}

                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.5 0L3.70688 0.79875L6.84563 3.9375L2.14577e-07 3.9375L2.14577e-07 5.0625L6.84563 5.0625L3.70688 8.20688L4.5 9L9 4.5L4.5 0Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Product Info (Desktop) */}
            <div className="col-span-12 sm:col-span-7 md:col-span-7 lg:col-span-7">
              <div className="rounded-lg border px-5 pt-2 pb-0">
                <h1 className="text-[20px] font-medium text-black">
                  Alphonso Mango
                  <span className="ml-5 rounded-sm bg-green-600 px-2 py-1 text-[12px] text-white">In Stock</span>
                  <span className="float-right rounded-sm bg-gray-100 p-1 px-3">
                    <Share2 />
                  </span>
                </h1>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-[12px] sm:gap-4">
                  <span className="text-[16px] text-[#868686]">Net Qty: 1 pack (1 kg)</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    {/* MRP Section */}
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-start gap-2">
                          {/* ₹60 */}
                          <div className="flex items-start gap-2">
                            {/* ₹60 */}
                            <span
                              className="text-[30px] leading-[100%] font-medium text-black"
                              style={{ width: '58px', height: '30px' }}
                            >
                              ₹60
                            </span>
                            {/* 2 % off */}
                            <span
                              className="pt-2 text-[16px] leading-[100%] font-medium whitespace-nowrap text-[#2EB20B]"
                              style={{ height: '20px' }}
                            >
                              2 % off
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[12px] font-semibold text-[#868686]">
                        <span className="text-base text-gray-600">MRP ₹</span>
                        <span className="text-base text-gray-700 line-through">75</span>{' '}
                        <span className="text-gray-500">(incl. of all Taxes)</span>
                      </p>
                    </div>
                    {/* Add Button Section */}
                    {totalQuantity > 0 ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center rounded-lg bg-[#F0701E] text-white">
                          <button
                            className="cursor-pointer px-4 py-2 text-[16px] font-medium"
                            aria-label="Decrease quantity"
                            onClick={decreaseQuantityForCart}
                          >
                            −
                          </button>
                          <span className="px-4 text-[16px] font-medium">{totalQuantity}</span>
                          <button
                            className="cursor-pointer px-4 py-2 text-[16px] font-medium"
                            aria-label="Increase quantity"
                            onClick={increaseQuantityForCart}
                          >
                            +
                          </button>
                        </div>
                        <span className="mr-5 text-[10px] text-gray-400">3 Variants</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        <button
                          className="cursor-pointer rounded-lg bg-[#F0701E] px-8 py-2 text-[16px] font-medium text-white"
                          onClick={handleAddToCart}
                        >
                          Add
                        </button>
                        <span className="mr-5 text-[10px] text-gray-400">3 Variants</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col items-center">
                  {/* Top HR */}
                  <div className="-mx-4 my-1 w-full border-t border-gray-300"></div>
                  {/* Product Row */}
                  <div className="mx-auto flex w-full max-w-[800px] items-center justify-between px-0 py-2">
                    {/* Left Section */}
                    <div className="flex items-center">
                      {/* Left SVG */}
                      <Image
                        height={1000}
                        width={1000}
                        src="/image/mango.svg"
                        alt="mango"
                        className="h-[25px] w-[25px]"
                      />
                      {/* Text immediately after SVG */}
                      <div className="ml-[10px] flex flex-col">
                        <span className="text-[16px] leading-[100%] font-medium text-black">Alphonso Mango</span>
                        <span className="text-[12px] leading-[100%] font-medium text-[#109441]">
                          Explore all products
                        </span>
                      </div>
                    </div>

                    {/* Right SVG */}
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M8.5002 12.9491C8.49974 12.8505 8.51896 12.7529 8.55674 12.6619C8.59451 12.5709 8.65009 12.4883 8.7202 12.4191L14.1902 6.94907L8.7202 1.47907C8.58772 1.33689 8.5156 1.14884 8.51903 0.954543C8.52245 0.760242 8.60117 0.574856 8.73858 0.437443C8.87599 0.30003 9.06138 0.221319 9.25568 0.21789C9.44998 0.214462 9.63803 0.286585 9.7802 0.419065L15.7802 6.41907C15.9207 6.55969 15.9995 6.75031 15.9995 6.94907C15.9995 7.14782 15.9207 7.33844 15.7802 7.47906L9.7802 13.4791C9.63958 13.6195 9.44895 13.6984 9.2502 13.6984C9.05145 13.6984 8.86083 13.6195 8.7202 13.4791C8.65009 13.4098 8.59451 13.3273 8.55674 13.2363C8.51896 13.1452 8.49974 13.0476 8.5002 12.9491Z"
                        fill="#CCCCCC"
                      />
                      <path
                        d="M0.500031 6.94922C0.502621 6.75111 0.58247 6.56185 0.722565 6.42175C0.862659 6.28166 1.05192 6.20181 1.25003 6.19922L15.25 6.19922C15.4489 6.19922 15.6397 6.27824 15.7804 6.41889C15.921 6.55954 16 6.75031 16 6.94922C16 7.14813 15.921 7.3389 15.7804 7.47955C15.6397 7.6202 15.4489 7.69922 15.25 7.69922L1.25003 7.69922C1.05192 7.69663 0.862659 7.61678 0.722565 7.47668C0.58247 7.33659 0.502621 7.14733 0.500031 6.94922Z"
                        fill="#CCCCCC"
                      />
                    </svg>
                  </div>

                  {/* Bottom HR */}
                  <div className="-mx-4 my-1 w-full border-t border-gray-300"></div>
                </div>
                <div className="mt-1 flex gap-4">
                  <div className="flex w-[130px] flex-col items-center justify-between rounded-lg border border-[#FFF4E5] bg-[#FFF4E5] px-2 py-2 text-center">
                    <RotateCCW />
                    <p className="font-poppins py-2 pt-2 text-[14px] leading-[100%] font-normal tracking-normal">
                      No Return
                    </p>
                  </div>
                  <div className="flex w-[130px] flex-col items-center justify-between rounded-lg border border-[#FFF4E5] bg-[#FFF4E5] px-2 py-2 text-center">
                    <Truck />
                    <p className="font-poppins py-2 pt-2 text-[14px] leading-[100%] font-normal tracking-normal">
                      Fast Delivery
                    </p>
                  </div>
                  <div className="flex w-[130px] flex-col items-center justify-between rounded-lg border border-[#FFF4E5] bg-[#FFF4E5] px-2 py-2 text-center">
                    <Package className="h-12 w-12 font-light" />
                    <p className="font-poppins py-2 pt-2 text-[14px] leading-[100%] font-normal tracking-normal">
                      Exchange
                    </p>
                  </div>
                </div>
                <div className="mx-auto my-2 w-full border-t border-gray-300"></div>
                <div
                  className="font-proxima h-auto w-full bg-white p-2 text-black"
                  // style={{
                  //   width: '481px',
                  //   height: '107px',
                  // }}
                >
                  {/* Highlights Title */}
                  <h2 className="mb-2 text-[16px] font-medium" style={{ lineHeight: '100%' }}>
                    Highlights
                  </h2>
                  {/* Attributes and Details */}
                  <div className="flex justify-between">
                    {/* Left Column */}
                    <div className="flex flex-col gap-2 font-normal text-black">
                      <span className="text-[16px] leading-[20px]">Attribute</span>
                      <span className="text-[16px] leading-[20px]">Variety</span>
                      <span className="text-[16px] leading-[20px]">Weight/Pack Size</span>
                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col gap-2 text-right font-normal text-black">
                      <span className="text-start text-[16px] leading-[20px]">Details</span>
                      <span className="text-[16px] leading-[20px]">Alphazo Mango</span>
                      <span className="text-[16px] leading-[20px]">1kg (3–4 pieces)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-center">
                  <button
                    className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#FFF4E5] px-6 py-1 text-sm font-medium text-black transition"
                    onClick={() => setIsHighlightInfoOpen(true)}
                  >
                    Know More Details
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.13397 7.5C4.51887 8.16667 5.48113 8.16667 5.86603 7.5L9.33013 1.5C9.71503 0.833334 9.2339 0 8.4641 0H1.5359C0.766098 0 0.284973 0.833333 0.669873 1.5L4.13397 7.5Z"
                        fill="#333333"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Zoom Effect (Desktop Only) */}
          {isZoomVisible && window.innerWidth >= 1024 && (
            <div
              className="pointer-events-none absolute -mt-3 ml-15 hidden rounded-lg border border-gray-300 shadow-lg lg:block"
              style={{
                width: '920px',
                height: '480px',
                top: imgRef.current ? imgRef.current.getBoundingClientRect().top + window.scrollY : 10,
                left: imgRef.current ? imgRef.current.getBoundingClientRect().right + 90 + window.scrollX : 0,
                backgroundColor: 'white',
                backgroundImage: `url('${selectedImage}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: backgroundPosition,
                zIndex: 10,
                imageRendering: 'auto',
                transform: 'translateZ(0)',
              }}
            />
          )}
        </div>
        {/* Product Details */}
        <div className="mt-8 border-t pt-6 sm:mt-12 sm:pt-8"></div>
        {/* Highlight popup */}
        {isHighlightInfoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-6">
            <div className="w-full max-w-md overflow-hidden rounded-sm bg-white shadow-lg sm:max-w-lg lg:max-w-md xl:max-w-lg">
              {/* Top buttons */}
              <div className="flex w-full">
                <button
                  onClick={() => setActiveTab('highlight')}
                  className={`w-1/2 cursor-pointer py-3 font-medium text-black transition ${
                    activeTab === 'highlight' ? 'bg-[#F0701E] text-white' : 'bg-white'
                  } rounded-tl-sm`}
                >
                  Highlight
                </button>
                <button
                  onClick={() => setActiveTab('information')}
                  className={`w-1/2 cursor-pointer py-3 font-medium text-black transition ${
                    activeTab === 'information' ? 'bg-[#F0701E] text-white' : 'bg-white'
                  } rounded-tr-sm`}
                >
                  Information
                </button>
              </div>
              {/* Popup content */}
              <div className="min-h-[150px] p-4 sm:p-6">
                {activeTab === 'highlight' && (
                  <div>
                    <h2 className="mb-4 text-base font-semibold sm:text-lg">Highlight</h2>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      {/* Left Column */}
                      <div className="flex flex-col gap-2 font-normal text-black">
                        <span className="text-sm sm:text-base">Attribute</span>
                        <span className="text-sm sm:text-base">Variety</span>
                        <span className="text-sm sm:text-base">Weight/Pack Size</span>
                      </div>
                      {/* Right Column */}
                      <div className="flex flex-col gap-2 text-left font-normal text-black">
                        <span className="text-sm sm:text-base">Details</span>
                        <span className="text-sm sm:text-base">Alphazo Mango</span>
                        <span className="text-sm sm:text-base">1kg (3–4 pieces)</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'information' && (
                  <div>
                    <h2 className="mb-4 text-base font-semibold sm:text-lg">Information</h2>
                    <p className="text-sm text-gray-700 sm:text-base">
                      This section contains all the information you need.
                    </p>
                  </div>
                )}
              </div>
              {/* Close button */}
              <div className="flex justify-end border-t p-2 sm:p-4">
                <button
                  onClick={() => setIsHighlightInfoOpen(false)}
                  className="cursor-pointer rounded px-3 py-1.5 text-sm font-medium text-black hover:bg-gray-100 sm:px-4 sm:py-2 sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
