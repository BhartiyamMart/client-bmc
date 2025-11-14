'use client';

import toast from 'react-hot-toast';
import { storeList } from '@/apis/location.api';
import { useLocationStore } from '@/stores/useLocation.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon, LocateFixed, MapPin, OopsIcon } from '@/components/shared/svg-icon';

// Constants
const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_LENGTH = 2;
const GEOLOCATION_TIMEOUT = 10000;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Google Places API types
interface GooglePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const LocationModal = () => {
  // Store
  const { showLocationModal, setShowLocationModal, location, setLocation } = useLocationStore();

  // State
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<GooglePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCheckingStore, setIsCheckingStore] = useState(false);
  const [showOutOfRange, setShowOutOfRange] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Refs
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Computed
  const hasValidLocation = Boolean(location?.lattitude && location?.longitude && location?.display_address);
  const showEmptyState = !isCheckingStore && ((search && !isSearching && suggestions.length === 0) || showOutOfRange);

  // Initialize Google Services (only once, globally)
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);

    if (existingScript) {
      // Script already loaded
      if (window.google?.maps) {
        autocompleteService.current = new google.maps.places.AutocompleteService();
        geocoder.current = new google.maps.Geocoder();
        setIsScriptLoaded(true);
      }
      return;
    }

    // Load Google Maps script only once
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      geocoder.current = new google.maps.Geocoder();
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.log('Failed to load Google Maps script');
      toast.error('Failed to load location services');
    };

    scriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      // Don't remove the script on unmount to prevent reloading
    };
  }, []);

  // Check store availability
  const checkStoreAvailability = useCallback(
    async (lat: string, lng: string, displayAddress: string) => {
      setIsCheckingStore(true);
      setShowOutOfRange(false);

      try {
        const response = await storeList({ lat, lng });

        if (response?.status === 200 && response?.payload?.allStore?.length > 0) {
          setLocation({
            lattitude: lat,
            longitude: lng,
            display_address: displayAddress,
          });

          setSearch('');
          setSuggestions([]);
          setTimeout(() => setShowLocationModal(false), 300);
          return true;
        } else {
          setShowOutOfRange(true);
          return false;
        }
      } catch (error) {
        console.log('Store availability check failed:', error);
        toast.error('Unable to check service availability');
        return false;
      } finally {
        setIsCheckingStore(false);
      }
    },
    [setLocation, setShowLocationModal]
  );

  // Debounced search using Google Places API
  const debouncedSearch = useCallback(
    async (searchTerm: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      const trimmed = searchTerm.trim();
      if (trimmed.length < MIN_SEARCH_LENGTH) {
        setSuggestions([]);
        setIsSearching(false);
        setShowOutOfRange(false);
        return;
      }

      debounceTimeout.current = setTimeout(async () => {
        if (!autocompleteService.current || !isScriptLoaded) {
          console.log('Google Places service not initialized');
          setIsSearching(false);
          return;
        }

        try {
          setIsSearching(true);
          setShowOutOfRange(false);

          autocompleteService.current.getPlacePredictions(
            {
              input: trimmed,
              componentRestrictions: { country: 'in' },
            },
            (predictions, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                setSuggestions(predictions);
              } else {
                setSuggestions([]);
              }
              setIsSearching(false);
            }
          );
        } catch (error) {
          console.log('Search failed:', error);
          setSuggestions([]);
          setIsSearching(false);
        }
      }, DEBOUNCE_DELAY);
    },
    [isScriptLoaded]
  );

  // Handle search input
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      if (value.trim().length < MIN_SEARCH_LENGTH) {
        setSuggestions([]);
        setIsSearching(false);
        setShowOutOfRange(false);
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      } else {
        setIsSearching(true);
        debouncedSearch(value);
      }
    },
    [debouncedSearch]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearch('');
    setSuggestions([]);
    setShowOutOfRange(false);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  }, []);

  // Geocode place ID to get coordinates
  const geocodePlaceId = useCallback(
    async (placeId: string, description: string) => {
      if (!geocoder.current) {
        toast.error('Geocoding service not available');
        return;
      }

      try {
        geocoder.current.geocode({ placeId }, async (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            const { lat, lng } = results[0].geometry.location;
            await checkStoreAvailability(lat().toString(), lng().toString(), description);
          } else {
            toast.error('Unable to find location coordinates');
          }
        });
      } catch (error) {
        console.log('Geocode failed:', error);
        toast.error('Unable to process location');
      }
    },
    [checkStoreAvailability]
  );

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    async (suggestion: GooglePrediction) => {
      setSearch(suggestion.description);
      setSuggestions([]);
      setShowOutOfRange(false);

      await geocodePlaceId(suggestion.place_id, suggestion.description);
    },
    [geocodePlaceId]
  );

  // Detect current location
  const handleDetectLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      toast.error('Geolocation not supported');
      return;
    }

    if (!geocoder.current || !isScriptLoaded) {
      toast.error('Location services not ready');
      return;
    }

    setIsDetecting(true);
    setShowOutOfRange(false);
    setSuggestions([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          geocoder.current!.geocode(
            {
              location: { lat: latitude, lng: longitude },
            },
            async (results, status) => {
              if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                const address = results[0].formatted_address;
                setSearch(address);
                await checkStoreAvailability(latitude.toString(), longitude.toString(), address);
              } else {
                toast.error('Unable to get address for your location');
              }
              setIsDetecting(false);
            }
          );
        } catch (error) {
          console.log('Reverse geocode failed:', error);
          toast.error('Failed to get address');
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        console.log('Geolocation error:', error);

        const messages: Record<number, string> = {
          1: 'Please enable location access in browser settings',
          2: 'Location unavailable',
          3: 'Location request timed out',
        };

        toast.error(messages[error.code] || 'Unable to detect location');
      },
      {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: 0,
      }
    );
  }, [checkStoreAvailability, isScriptLoaded]);

  // Handle close
  const handleClose = useCallback(() => {
    if (hasValidLocation) {
      setShowLocationModal(false);
    }
  }, [hasValidLocation, setShowLocationModal]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && hasValidLocation) {
        setShowLocationModal(false);
      }
    },
    [hasValidLocation, setShowLocationModal]
  );

  // Reset on modal open
  useEffect(() => {
    if (showLocationModal) {
      setSearch('');
      setSuggestions([]);
      setShowOutOfRange(false);
      setIsDetecting(false);
    }
  }, [showLocationModal]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  // Don't render if modal is not open
  if (!showLocationModal) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - Same as AuthModal */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Modal Content - Same structure as AuthModal */}
      <div
        className="relative z-10 w-[min(600px,92%)] rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Only visible if valid location exists */}
        {hasValidLocation && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleClose}
              className="cursor-pointer rounded-full p-1.5 text-gray-600 transition-colors hover:bg-gray-100"
              aria-label="Close"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="relative px-6 py-8">
          {/* Loading Overlay */}
          {isCheckingStore && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/90">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                <p className="text-sm font-medium text-gray-700">Checking availability...</p>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="mb-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {hasValidLocation ? 'Change Location' : 'Select Location'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">Choose your location to see available products</p>
            </div>

            {/* Search and Detect */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search delivery location"
                  value={search}
                  onChange={handleSearch}
                  disabled={isCheckingStore || !isScriptLoaded}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                  {search && !isSearching && (
                    <button
                      onClick={handleClearSearch}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                      aria-label="Clear"
                    >
                      <CloseIcon className="h-3 w-3" />
                    </button>
                  )}

                  {isSearching && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                  )}
                </div>
              </div>

              <button
                onClick={handleDetectLocation}
                disabled={isDetecting || isCheckingStore || !isScriptLoaded}
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <LocateFixed className={`h-4 w-4 ${isDetecting ? 'animate-pulse' : ''}`} />
                <span>{isDetecting ? 'Detecting...' : 'Detect'}</span>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50">
            {suggestions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.place_id}
                    onClick={() => !isCheckingStore && handleSuggestionClick(suggestion)}
                    disabled={isCheckingStore}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
                  >
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gray-600" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {suggestion.structured_formatting.main_text}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {suggestion.structured_formatting.secondary_text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : showEmptyState ? (
              <div className="flex min-h-80 flex-col items-center justify-center bg-white px-4 py-12">
                <div className="mb-4 flex h-52 w-52 items-center justify-center">
                  <OopsIcon />
                </div>
                <p className="text-center text-sm text-gray-600">
                  {showOutOfRange
                    ? "Sorry, we don't deliver to this location yet"
                    : 'No locations found. Try a different search.'}
                </p>
              </div>
            ) : (
              <div className="flex min-h-80 items-center justify-center bg-white px-4 py-12">
                <p className="text-center text-sm text-gray-500">
                  {!isScriptLoaded ? 'Loading location services...' : 'Search for your delivery location'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
