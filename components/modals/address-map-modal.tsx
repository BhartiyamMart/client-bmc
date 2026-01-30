// src/components/address/address-map-modal.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapMarker, X, MapPin, Search, Home, Briefcase, Hotel } from '@/components/shared/svg/lucide-icon';
import { IAddressFormData, IAddressMapProps } from '@/interfaces/address.interface';
import { getAddressById } from '@/apis/address.api';
import toast from 'react-hot-toast';
import { useGoogleMaps } from '@/components/providers/google-maps-provider';
import { Button } from '@/components/ui/button';
import { usePhone, useUserProfile } from '@/stores/useAuth.store';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const AddressMapModal: React.FC<IAddressMapProps> = ({ isOpen, onClose, onSave, addressId }) => {
  const { isLoaded, loadError } = useGoogleMaps();

  const userProfile = useUserProfile();
  const storePhone = usePhone();
  const { handleError } = useErrorHandler();

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
    latitude: '28.7041',
    longitude: '77.1025',
    isDefault: false,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 28.7041,
    lng: 77.1025,
  });

  const [searchInput, setSearchInput] = useState('');
  const [currentLocationText, setCurrentLocationText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [searchResults, setSearchResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Prefill name and phone when label changes
  useEffect(() => {
    if (!addressId && isOpen) {
      const isPrefilledLabel = ['HOME', 'WORK', 'HOTEL'].includes(formData.label);

      if (isPrefilledLabel) {
        setFormData((prev) => ({
          ...prev,
          addressName: userProfile?.name || '',
          addressPhone: storePhone?.replace(/^\+91/, '') || '',
        }));
      }
    }
  }, [formData.label, isOpen, addressId, userProfile, storePhone]);

  useEffect(() => {
    const loadAddress = async () => {
      if (addressId && isOpen) {
        try {
          setIsLoadingAddress(true);
          const response = await getAddressById({ addressId });

          if (response.status === 200) {
            const apiAddress = response.payload.address || response.payload;

            const formDataToSet: IAddressFormData = {
              addressId: apiAddress.addressId,
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
              setCurrentLocationText(apiAddress.mapAddress || '');
            }
          }
        } catch (error) {
          handleError(error, {
            component: 'Address Map Modal',
            action: 'get Address by Id',
            showToast: true,
            fallbackMessage: 'Failed to load address details',
          });
        } finally {
          setIsLoadingAddress(false);
        }
      } else if (!addressId && isOpen) {
        resetForm();
        setMapLoaded(false);
      }
    };

    loadAddress();
  }, [addressId, isOpen]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput.trim().length > 2 && isLoaded) {
        performSearch();
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, isLoaded]);

  useEffect(() => {
    if (loadError) {
      toast.error('Failed to load Google Maps');
      console.error('Google Maps load error:', loadError);
    }
  }, [loadError]);

  const resetForm = () => {
    const isPrefilledLabel = ['HOME', 'WORK', 'HOTEL'].includes('HOME');

    setFormData({
      addressId: undefined,
      label: 'HOME',
      labelDescription: '',
      addressLineOne: '',
      addressLineTwo: '',
      landmark: '',
      mapAddress: '',
      addressName: isPrefilledLabel ? userProfile?.name || '' : '',
      addressPhone: isPrefilledLabel ? storePhone?.replace(/^\+91/, '') || '' : '',
      latitude: '28.7041',
      longitude: '77.1025',
      isDefault: false,
    });
    setCenter({ lat: 28.7041, lng: 77.1025 });
    setCurrentLocationText('');
    setSearchInput('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

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

      setCurrentLocationText(place.formatted_address || '');
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchInput('');
    }
  }, []);

  const getAddressLabels = () => {
    switch (formData.label) {
      case 'HOME':
        return { line1: 'House no / Road / Block', line2: 'Apt / Floor (Optional)' };
      case 'WORK':
        return { line1: 'Office no / Floor / Building', line2: 'Wing / Block (Optional)' };
      case 'HOTEL':
        return { line1: 'Hotel Name / Room no', line2: 'Floor / Wing (Optional)' };
      default:
        return { line1: 'House no / Road / Block', line2: 'Apt / Floor (Optional)' };
    }
  };

  const updateAddressFromLatLng = useCallback((lat: number, lng: number) => {
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const formattedAddress = results[0].formatted_address || '';
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

  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);

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
      },
      (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error);
        setIsLocating(false);
        toast.error('Failed to get your location');
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
      setMapLoaded(true);

      if (!addressId && !currentLocationText) {
        updateAddressFromLatLng(center.lat, center.lng);
      }
    },
    [center, updateAddressFromLatLng, addressId, currentLocationText]
  );

  const handleCenterChanged = useCallback(() => {
    if (mapRef.current && mapLoaded) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        updateAddressFromLatLng(lat, lng);
      }
    }
  }, [updateAddressFromLatLng, mapLoaded]);

  const formatCoordinate = (value: string | undefined, maxDecimals: number = 8): string => {
    if (!value) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return num
      .toFixed(maxDecimals)
      .replace(/(\.\d*?)0+$/, '$1')
      .replace(/\.$/, '');
  };

  const validateCoordinates = (lat: string, lng: string): boolean => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    return !isNaN(latNum) && !isNaN(lngNum) && latNum >= -90 && latNum <= 90 && lngNum >= -180 && lngNum <= 180;
  };

  const handleSave = () => {
    if (!formData.label || !formData.addressLineOne || !formData.addressName) {
      toast.error('Please fill all required fields');
      return;
    }

    const isOtherLabel = formData.label === 'OTHER';

    // Phone validation
    if (isOtherLabel) {
      if (!formData.addressPhone || !formData.addressPhone.trim()) {
        toast.error('Phone number is required for Other address type');
        return;
      }
      if (formData.addressPhone.length !== 10) {
        toast.error('Phone number must be 10 digits');
        return;
      }
    } else {
      if (formData.addressPhone && formData.addressPhone.trim() && formData.addressPhone.length !== 10) {
        toast.error('Phone number must be 10 digits');
        return;
      }
    }

    const formattedLatitude = formatCoordinate(formData.latitude, 8);
    const formattedLongitude = formatCoordinate(formData.longitude, 8);

    if (!validateCoordinates(formattedLatitude, formattedLongitude)) {
      toast.error('Invalid coordinates');
      return;
    }

    const cleanedData: Partial<IAddressFormData> = {
      label: formData.label,
      addressLineOne: formData.addressLineOne,
      addressName: formData.addressName,
      latitude: formattedLatitude,
      longitude: formattedLongitude,
      mapAddress: formData.mapAddress,
      isDefault: formData.isDefault,
    };

    if (formData.labelDescription?.trim()) {
      cleanedData.labelDescription = formData.labelDescription;
    }

    if (formData.addressLineTwo?.trim()) {
      cleanedData.addressLineTwo = formData.addressLineTwo;
    }

    if (formData.landmark?.trim()) {
      cleanedData.landmark = formData.landmark;
    }

    if (formData.addressPhone?.trim()) {
      cleanedData.addressPhone = formData.addressPhone.toString();
    }

    if (addressId) {
      cleanedData.addressId = addressId;
    }

    onSave(cleanedData as IAddressFormData);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, addressPhone: value }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  if (loadError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded bg-white p-6 text-center shadow-xl">
          <p className="text-red-600">Failed to load Google Maps</p>
          <Button onClick={onClose} variant="outline" className="mt-4">
            Close
          </Button>
        </div>
      </div>
    );
  }

  const addressLabels = getAddressLabels();
  const isOtherLabel = formData.label === 'OTHER';

  const addressLabelOptions = [
    { value: 'HOME', icon: Home, label: 'Home' },
    { value: 'WORK', icon: Briefcase, label: 'Work' },
    { value: 'HOTEL', icon: Hotel, label: 'Hotel' },
    { value: 'OTHER', icon: MapPin, label: 'Other' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 sm:p-4" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-7xl flex-col overflow-hidden bg-white sm:h-[90vh] sm:rounded sm:shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side - Full Map */}
        <div className="relative h-1/2 w-full md:h-full md:w-3/5">
          {!isLoaded || isLoadingAddress ? (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="border-primary mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
                <p className="text-sm text-gray-600">{isLoadingAddress ? 'Loading address...' : 'Loading map...'}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="absolute top-3 right-3 left-3 z-20 sm:top-4 sm:right-4 sm:left-4">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    className="focus:border-primary w-full rounded border bg-white py-2.5 pr-4 pl-10 text-sm shadow transition-colors outline-none sm:py-3 sm:pl-11"
                    placeholder="Search for area, street name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5" />

                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full right-0 left-0 z-30 mt-2 max-h-60 overflow-y-auto rounded bg-white shadow-2xl">
                      {searchResults.map((place, index) => (
                        <button
                          key={place.place_id || index}
                          onClick={() => selectPlace(place)}
                          className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-orange-50"
                        >
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                          <p className="text-sm text-gray-700">{place.formatted_address}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="absolute right-3 bottom-3 left-3 z-10 sm:right-4 sm:bottom-4 sm:left-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-start">
                    <Button
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating}
                      className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-100"
                      title="Use Current Location"
                    >
                      {isLocating ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Locating...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4" />
                          <span>Current Location</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {currentLocationText && (
                    <div className="rounded bg-white p-3 shadow-xl sm:p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                          <MapPin className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-xs font-semibold text-gray-900 sm:text-sm">
                            Delivering your order to
                          </p>
                          <p className="line-clamp-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
                            {currentLocationText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
                  gestureHandling: 'greedy',
                  disableDefaultUI: false,
                }}
                onLoad={onMapLoad}
                onDragEnd={handleCenterChanged}
              >
                <Marker position={center} />
              </GoogleMap>

              {/* Center Pin Marker */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <MapMarker className="text-primary h-10 w-10 -translate-y-1/2 transform sm:h-12 sm:w-12" />
              </div>
            </>
          )}
        </div>

        {/* Right Side - Form */}
        <div className="flex h-1/2 w-full flex-col md:h-full md:w-2/5">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-white px-4 py-3 sm:px-3 sm:py-3">
            <h2 className="text-base font-semibold text-gray-900 sm:ml-3 sm:text-lg">
              {addressId ? 'Edit delivery address' : 'Enter complete address'}
            </h2>
            <Button onClick={onClose} variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form Content */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5">
            {/* Save Address As */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Save address as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {addressLabelOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          label: option.value,
                          ...(option.value !== 'OTHER' && { labelDescription: '' }),
                        }));
                      }}
                      className={`flex items-center justify-center gap-1.5 rounded border py-2.5 text-xs font-medium transition-all ${
                        formData.label === option.value
                          ? 'border-primary hover:bg-primary-light bg-primary-light text-primary-dark hover:text-primary-dark border-2'
                          : 'hover:border-primary bg-white text-gray-700 hover:bg-orange-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Other Label Description */}
            {isOtherLabel && (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Label name</label>
                <input
                  name="labelDescription"
                  value={formData.labelDescription}
                  onChange={handleInputChange}
                  className="focus:border-primary w-full rounded border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none"
                  placeholder="e.g., Friend's place, Office 2"
                />
              </div>
            )}

            {/* House no / Road / Block */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {addressLabels.line1} <span className="text-red-500">*</span>
              </label>
              <input
                name="addressLineOne"
                value={formData.addressLineOne}
                onChange={handleInputChange}
                className="focus:border-primary w-full rounded border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none"
                placeholder={addressLabels.line1}
              />
            </div>

            {/* Apt / Floor (Optional) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">{addressLabels.line2}</label>
              <input
                name="addressLineTwo"
                value={formData.addressLineTwo}
                onChange={handleInputChange}
                className="focus:border-primary w-full rounded border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none"
                placeholder={addressLabels.line2}
              />
            </div>

            {/* Nearby Landmark */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Nearby landmark (optional)</label>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="focus:border-primary w-full rounded border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none"
                placeholder="e.g., Near Apollo Hospital"
              />
            </div>

            {/* Area / Sector / Locality */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Area / Sector / Locality</label>
              <input
                name="mapAddress"
                value={formData.mapAddress}
                className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-600"
                placeholder="Auto-filled from map"
                disabled
              />
            </div>

            {/* Divider */}
            <div className="border-t pt-4">
              <p className="mb-4 text-sm text-gray-500">Enter your details for seamless delivery experience</p>
            </div>

            {/* Your Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                name="addressName"
                value={formData.addressName}
                onChange={handleInputChange}
                className="focus:border-primary w-full rounded border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none"
                placeholder="Enter receiver name"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Your phone number {isOtherLabel && <span className="text-red-500">*</span>}
                {!isOtherLabel && <span className="text-sm text-gray-500"> (optional)</span>}
              </label>
              <div className="focus-within:border-primary flex overflow-hidden rounded border border-gray-300 transition-colors">
                <span className="flex items-center border-r border-gray-300 bg-gray-50 px-3 text-sm font-medium text-gray-700">
                  +91
                </span>
                <input
                  name="addressPhone"
                  value={formData.addressPhone}
                  onChange={handlePhoneChange}
                  className="w-full flex-1 px-3 py-2.5 text-sm outline-none"
                  placeholder="Enter mobile number"
                  type="tel"
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t bg-white px-4 py-3 sm:px-6 sm:py-4">
            <Button
              onClick={handleSave}
              disabled={
                isLoadingAddress ||
                !formData.label ||
                !formData.addressLineOne ||
                !formData.addressName ||
                (isOtherLabel && (!formData.addressPhone || formData.addressPhone.length !== 10))
              }
              className="w-full py-3 text-sm font-semibold"
            >
              {isLoadingAddress ? 'Saving...' : addressId ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressMapModal;
