export interface ILocation {
  lattitude: string;
  longitude: string;
  display_address: string;
}

export interface ISuggestion {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
  types: string[];
}

export interface IStoreListREQ {
  latitude: string;
  longitude: string;
  radiusKm: number;
}

export interface IStoreListRES {
  stores: Array<{
    id: string;
    name: string;
    distance: number;
    lat: string;
    lng: string;
  }>;
  radius: number;
  userLocation: {
    lat: number;
    lng: number;
  };
  total: number;
}

export interface IGetSuggestionREQ {
  input: string;
  limit: number;
}

export interface IGetSuggestionRES {
  predictions: [];
  lat: string;
  long: string;
}
