'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { MapMarker, X, MapPin, Search, ChevronRight } from '@/components/shared/svg/lucide-icon';
import { IAddressFormData, IAddressMapProps } from '@/interfaces/address.interface';
import { getAddressById } from '@/apis/address.api';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight } from '@/components/shared/svg/svg-icon';

const AddressMap: React.FC<IAddressMapProps> = ({ isOpen, onClose, onSave, addressId }) => {
  const [formData, setFormData] = useState<IAddressFormData>({
    addressId: undefined,
    label: 'HOME',
    labelDescription: '',
    addressLineOne: '',
    addressLineTwo: '',
    landmark: '',
    mapAddress: '',
    addressName: '',
    addressPhone: '',
    latitude: '23.8103',
    longitude: '90.4125',
    isDefault: false,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 23.8103,
    lng: 90.4125,
  });

  const [searchInput, setSearchInput] = useState('');
  const [currentLocationText, setCurrentLocationText] = useState('No location detected');
  const [isLocating, setIsLocating] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [searchResults, setSearchResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showForm, setShowForm] = useState(false); // ✅ NEW: Controls form visibility on mobile

  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  // ✅ Load existing address when addressId is provided
  useEffect(() => {
    const loadAddress = async () => {
      if (addressId && isOpen) {
        try {
          setIsLoadingAddress(true);
          const response = await getAddressById({ addressId });

          if (response.status === 200) {
            const apiAddress = response.payload.address || response.payload;

            const formDataToSet: IAddressFormData = {
              addressId: apiAddress.addressId || apiAddress.addressId,
              label: apiAddress.label || 'HOME',
              labelDescription: apiAddress.labelDescription || '',
              addressLineOne: apiAddress.addressLineOne || '',
              addressLineTwo: apiAddress.addressLineTwo || '',
              landmark: apiAddress.landmark || '',
              mapAddress: apiAddress.mapAddress || '',
              addressName: apiAddress.addressName || '',
              addressPhone: (apiAddress.addressPhone || '').toString(),
              latitude: apiAddress.latitude || '',
              longitude: apiAddress.longitude || '',
              isDefault: apiAddress.isDefault || false,
            };

            setFormData(formDataToSet);

            if (apiAddress.latitude && apiAddress.longitude) {
              const lat = parseFloat(apiAddress.latitude);
              const lng = parseFloat(apiAddress.longitude);
              setCenter({ lat, lng });
              setCurrentLocationText(apiAddress.mapAddress || 'Location loaded');
            }

            // ✅ Auto-show form on edit mode
            setShowForm(true);
          }
        } catch (error) {
          console.error('Failed to load address:', error);
          toast.error('Failed to load address details');
        } finally {
          setIsLoadingAddress(false);
        }
      } else if (!addressId && isOpen) {
        resetForm();
      }
    };

    loadAddress();
  }, [addressId, isOpen]);

  // ✅ Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput.trim().length > 2) {
        performSearch();
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  // ✅ Reset form for new addresses
  const resetForm = () => {
    setFormData({
      addressId: undefined,
      label: 'HOME',
      labelDescription: '',
      addressLineOne: '',
      addressLineTwo: '',
      landmark: '',
      mapAddress: '',
      addressName: '',
      addressPhone: '',
      latitude: '23.8103',
      longitude: '90.4125',
      isDefault: false,
    });
    setCenter({ lat: 23.8103, lng: 90.4125 });
    setCurrentLocationText('No location detected');
    setSearchInput('');
    setSearchResults([]);
    setShowSearchResults(false);
    setShowForm(false); // ✅ Hide form on reset
  };

  // ✅ Perform Google Places search
  const performSearch = useCallback(() => {
    if (!isLoaded || !searchInput.trim()) return;

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: searchInput,
        componentRestrictions: { country: 'in' },
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          const placesService = new google.maps.places.PlacesService(document.createElement('div'));

          const placesPromises = predictions.slice(0, 5).map(
            (prediction) =>
              new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
                placesService.getDetails({ placeId: prediction.place_id }, (place, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    resolve(place);
                  } else {
                    reject(status);
                  }
                });
              })
          );

          Promise.allSettled(placesPromises).then((results) => {
            const validPlaces = results
              .filter(
                (result): result is PromiseFulfilledResult<google.maps.places.PlaceResult> =>
                  result.status === 'fulfilled'
              )
              .map((result) => result.value);

            setSearchResults(validPlaces);
            setShowSearchResults(validPlaces.length > 0);
          });
        } else {
          setSearchResults([]);
          setShowSearchResults(false);
        }
      }
    );
  }, [searchInput, isLoaded]);

  // ✅ Select place from search results - NOW SHOWS FORM ON MOBILE
  const selectPlace = useCallback((place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setCenter({ lat, lng });
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(17);
      }

      setFormData((prev) => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
        mapAddress: place.formatted_address || '',
      }));

      setCurrentLocationText(place.formatted_address || 'Location selected');
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchInput('');

      // ✅ Show form after selecting location (mobile)
      setShowForm(true);
    }
  }, []);

  // ✅ Handle search submit (Enter key)
  const handleSearchSubmit = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchInput.trim()) {
        e.preventDefault();
        performSearch();
      }
    },
    [searchInput, performSearch]
  );

  const getAddressLabels = () => {
    switch (formData.label) {
      case 'HOME':
        return { line1: 'House no, Road, Block', line2: 'Apt, Floor (Optional)' };
      case 'WORK':
        return { line1: 'Office no, Floor, Building', line2: 'Wing, Block (Optional)' };
      case 'HOTEL':
        return { line1: 'Hotel Name, Room no', line2: 'Floor, Wing (Optional)' };
      default:
        return { line1: 'House no, Road, Block', line2: 'Apt, Floor (Optional)' };
    }
  };

  const cleanFormData = (data: IAddressFormData): IAddressFormData => {
    const cleaned = { ...data };

    if (cleaned.addressPhone !== undefined && cleaned.addressPhone !== null) {
      cleaned.addressPhone = cleaned.addressPhone.toString();
    }

    if (!cleaned.landmark?.trim()) delete cleaned.landmark;
    if (!cleaned.addressLineTwo?.trim()) delete cleaned.addressLineTwo;
    if (!cleaned.labelDescription?.trim()) delete cleaned.labelDescription;

    if (addressId) {
      cleaned.addressId = addressId;
    }

    return cleaned as IAddressFormData;
  };

  const updateAddressFromLatLng = useCallback((lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const addr = results[0];
        const formattedAddress = addr.formatted_address || '';
        setFormData((prev) => ({
          ...prev,
          mapAddress: formattedAddress,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
        setCurrentLocationText(formattedAddress);
      }
    });
  }, []);

  // ✅ Handle use current location - NOW SHOWS FORM ON MOBILE
  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    setCurrentLocationText('Locating...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCenter({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(17);
        }

        updateAddressFromLatLng(lat, lng);
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
        setIsLocating(false);

        // ✅ Show form after getting current location (mobile)
        setShowForm(true);
      },
      (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error);
        setIsLocating(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Location permission denied. Please allow it in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location unavailable. Please check GPS or network.');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out. Try again.');
            break;
          default:
            toast.error('Failed to get current location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }, [updateAddressFromLatLng]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      updateAddressFromLatLng(center.lat, center.lng);
    },
    [center, updateAddressFromLatLng]
  );

  const handleCenterChanged = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
        updateAddressFromLatLng(lat, lng);
      }
    }
  }, [updateAddressFromLatLng]);



// ✅ Add this helper function to format coordinates
const formatCoordinate = (value: string | undefined, maxDecimals: number = 10): string => {
  if (!value) return '';
  
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  
  // Convert to string with maximum decimal places
  const formatted = num.toFixed(maxDecimals);
  
  // Remove trailing zeros after decimal point, but keep at least 1 decimal place
  return formatted.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
};

// ✅ Add this validation helper
const validateCoordinates = (lat: string, lng: string): boolean => {
  const latitudeRegex = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/;
  const longitudeRegex = /^-?(([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]{1,10})?|180(\.0{1,10})?)$/;
  
  return latitudeRegex.test(lat) && longitudeRegex.test(lng);
};

// ✅ Update the handleSave function
const handleSave = () => {
  const requiredFields = {
    label: formData.label?.trim(),
    addressLineOne: formData.addressLineOne?.trim(),
    addressName: formData.addressName?.trim(),
    latitude: formData.latitude?.trim(),
    longitude: formData.longitude?.trim(),
    mapAddress: formData.mapAddress?.trim(),
    addressPhone: formData.addressPhone?.trim(),
  };

  const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value);

  if (missingFields.length > 0) {
    toast.error(`Please fill: ${missingFields.map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()).join(', ')}`);
    return;
  }

  if (formData.addressPhone.length !== 10) {
    toast.error('Phone number must be 10 digits');
    return;
  }

  // ✅ Format coordinates to match regex (max 10 decimal places)
  const formattedLatitude = formatCoordinate(formData.latitude, 10);
  const formattedLongitude = formatCoordinate(formData.longitude, 10);

  // ✅ Validate formatted coordinates
  if (!validateCoordinates(formattedLatitude, formattedLongitude)) {
    toast.error('Invalid coordinates format');
    console.error('Invalid coordinates:', { formattedLatitude, formattedLongitude });
    return;
  }

  // ✅ Create cleaned data with formatted coordinates
  const cleanedData = cleanFormData({
    ...formData,
    latitude: formattedLatitude,
    longitude: formattedLongitude,
  });

  console.log('Cleaned formData:', cleanedData);
  onSave(cleanedData);
};


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, addressPhone: value }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ NEW: Handle back to map on mobile
  const handleBackToMap = () => {
    setShowForm(false);
  };

  const isOtherLabel = formData.label === 'OTHER';

  if (!isOpen) return null;

  const addressLabels = getAddressLabels();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="flex h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[85vh] lg:max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 sm:p-6">
          {/* ✅ Back button on mobile when form is shown */}
          {showForm && (
            <button
              onClick={handleBackToMap}
              className="mr-2 rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
              aria-label="Back to map"
            >
              <ArrowLeft className="h-5 w-5 rotate-180 transform" />
            </button>
          )}

          <h2 className="text-lg font-bold sm:text-xl">{addressId ? 'Edit Address' : 'Add New Address'}</h2>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-gray-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          {/* Left: Map Section - Hidden on mobile when form is shown */}
          <div
            className={`relative flex-1 overflow-hidden md:w-1/2 ${showForm ? 'hidden md:block' : 'block'}`}
            ref={mapContainerRef}
          >
            {!isLoaded ? (
              <div className="flex h-full items-center justify-center bg-gray-100">
                {isLoadingAddress ? 'Loading address...' : 'Loading map...'}
              </div>
            ) : (
              <>
                {/* Search Bar with Dropdown */}
                <div className="absolute top-2 right-2 left-2 z-20 sm:top-4 sm:right-4 sm:left-4">
                  <div className="relative">
                    <div className="relative flex w-full">
                      <input
                        ref={searchInputRef}
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm shadow-lg transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none sm:py-3 sm:pl-12"
                        placeholder="Search address, landmark, or area..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                      />
                      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 sm:left-4 sm:h-5 sm:w-5" />
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && searchResults.length > 0 && (
                      <div className="absolute top-full right-0 left-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-xl bg-white shadow-2xl ring-1 ring-gray-200/50">
                        {searchResults.map((place, index) => (
                          <button
                            key={place.place_id || index}
                            onClick={() => selectPlace(place)}
                            className="w-full border-b border-gray-100 px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none sm:px-4"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-900 sm:text-sm">
                                  {place.formatted_address}
                                </p>
                                {place.name && place.name !== place.formatted_address && (
                                  <p className="mt-0.5 text-xs text-gray-500">{place.name}</p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Location Button & Address Info */}
                <div className="absolute right-2 bottom-2 left-2 z-10 sm:right-4 sm:bottom-4 sm:left-4">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <button
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-orange-600 px-3 py-2.5 text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3"
                    >
                      {isLocating ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span className="text-xs font-medium sm:text-sm">Locating...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs font-medium sm:text-sm">Use Current Location</span>
                        </>
                      )}
                    </button>

                    <div className="max-h-20 overflow-hidden rounded-xl bg-white/95 p-3 shadow-xl backdrop-blur-sm sm:max-h-24 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 sm:h-10 sm:w-10">
                          <MapPin className="h-4 w-4 text-orange-600 sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-xs leading-tight font-medium text-gray-900 sm:text-sm">
                            {currentLocationText === 'No location detected'
                              ? 'Search above or tap to use GPS location'
                              : currentLocationText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={center}
                  zoom={17}
                  options={{
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    scaleControl: false,
                    gestureHandling: 'cooperative',
                  }}
                  onLoad={onMapLoad}
                  onCenterChanged={handleCenterChanged}
                >
                  <Marker position={center} />
                </GoogleMap>

                {/* Custom Center Marker */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex -translate-y-1/2 transform flex-col items-center">
                    <MapMarker className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Form Section - Shows on mobile when location selected, always visible on desktop */}
          <div
            className={`flex w-full flex-col gap-3 overflow-y-auto border-l p-4 sm:gap-4 sm:p-6 md:w-1/2 ${
              showForm ? 'block' : 'hidden md:flex'
            }`}
          >
            <div className="flex flex-1 flex-col">
              {/* Label Selection */}
              <label className="mb-3 text-sm font-medium sm:mb-4">
                Label <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'HOME', icon: '🏠', label: 'Home' },
                  { value: 'WORK', icon: '💼', label: 'Work' },
                  { value: 'HOTEL', icon: '🏨', label: 'Hotel' },
                  { value: 'OTHER', icon: '📝', label: 'Other' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        label: option.value,
                        ...(option.value !== 'OTHER' && { labelDescription: '' }),
                      }));
                    }}
                    className={`flex h-14 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border p-2 text-xs transition-all sm:h-16 sm:gap-2 ${
                      formData.label === option.value
                        ? 'border-primary bg-orange-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Conditional Other Description */}
              {isOtherLabel && (
                <div className="mt-3 sm:mt-4">
                  <label className="mb-2 block text-sm font-medium">Description</label>
                  <input
                    name="labelDescription"
                    value={formData.labelDescription}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Enter description for this location"
                  />
                </div>
              )}

              {/* Address Line 1 */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">
                {addressLabels.line1} <span className="text-primary">*</span>
              </label>
              <input
                name="addressLineOne"
                value={formData.addressLineOne}
                onChange={handleInputChange}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder={addressLabels.line1}
                required
              />

              {/* Address Line 2 */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">{addressLabels.line2}</label>
              <input
                name="addressLineTwo"
                value={formData.addressLineTwo}
                onChange={handleInputChange}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder={addressLabels.line2}
              />

              {/* Landmark */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">Landmark (optional)</label>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Near XYZ, Opposite ABC (optional)"
              />

              {/* Map Address */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">Map Address</label>
              <input
                name="mapAddress"
                value={formData.mapAddress}
                className="rounded-lg border bg-gray-50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Auto-filled from map"
                disabled
              />

              {/* Address Name */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">
                Address Name <span className="text-primary">*</span>
              </label>
              <input
                name="addressName"
                value={formData.addressName}
                onChange={handleInputChange}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter receiver name"
                required
              />

              {/* Phone Number */}
              <label className="mt-3 mb-2 text-sm font-medium sm:mt-4">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                name="addressPhone"
                value={formData.addressPhone}
                onChange={handlePhoneChange}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter 10-digit phone number"
                type="tel"
                maxLength={10}
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={
                isLoadingAddress ||
                !formData.label ||
                !formData.addressLineOne ||
                !formData.addressName ||
                !formData.addressPhone ||
                formData.addressPhone.length !== 10
              }
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLoadingAddress ? 'Loading...' : addressId ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressMap;
