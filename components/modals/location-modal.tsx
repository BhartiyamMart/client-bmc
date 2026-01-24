'use client';

import toast from 'react-hot-toast';
import { storeList } from '@/apis/location.api';
import { useLocationStore } from '@/stores/useLocation.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon, LocateFixed, MapPin, OopsIcon } from '@/components/shared/svg/svg-icon';

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
  const showEmptyState = (search && !isSearching && suggestions.length === 0) || showOutOfRange;

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
      console.error('Failed to load Google Maps script');
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
        const latitude = Number(lat).toFixed(8);
        const longitude = Number(lng).toFixed(8);
        const radiusKm = 5;
        const response = await storeList({ latitude, longitude, radiusKm });

        if (response?.status === 200 && response?.payload?.stores?.length > 0) {
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
          toast.error("Sorry, we don't deliver to this location yet");
          return false;
        }
      } catch (error) {
        console.error('Store availability check failed:', error);
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
          console.error('Google Places service not initialized');
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
          console.error('Search failed:', error);
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
        console.error('Geocode failed:', error);
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
          console.error('Reverse geocode failed:', error);
          toast.error('Failed to get address');
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        console.error('Geolocation error:', error);

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

  if (!showLocationModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleBackdropClick}>
      <div
        className="relative w-full max-w-xl overflow-hidden rounded bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Overlay */}
        {isCheckingStore && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
              <p className="text-sm font-medium text-gray-700">Checking availability...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white px-4 py-4 sm:px-6">
          {hasValidLocation && (
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 cursor-pointer rounded-full p-1.5 text-gray-600 transition-colors hover:bg-gray-100"
              aria-label="Close"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}

          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {hasValidLocation ? 'Change Location' : 'Select Location'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Choose your location to see available products</p>

          {/* Search and Detect */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search delivery location"
                value={search}
                onChange={handleSearch}
                disabled={isCheckingStore || !isScriptLoaded}
                className="focus:border-primary focus:ring-primary w-full rounded border border-gray-300 px-3 py-2.5 pr-10 text-sm transition-colors outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100"
              />

              <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                {search && !isSearching && (
                  <button
                    onClick={handleClearSearch}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                    aria-label="Clear"
                  >
                    <CloseIcon className="h-3 w-3" />
                  </button>
                )}

                {isSearching && (
                  <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                )}
              </div>
            </div>

            <button
              onClick={handleDetectLocation}
              disabled={isDetecting || isCheckingStore || !isScriptLoaded}
              className="bg-primary border-primary hover:bg-primary/90 flex cursor-pointer items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            >
              <LocateFixed className={`h-4 w-4 ${isDetecting ? 'animate-pulse' : ''}`} />
              <span>{isDetecting ? 'Detecting...' : 'Detect'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto bg-gray-50">
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
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
