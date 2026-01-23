import { requestAPI } from '@/lib/axios';
import { ApiResponse } from '@/interfaces/api.interface';
import * as ISTORE from '@/interfaces/location.interface';

export const storeList = async (data: ISTORE.IStoreListREQ) => {
  return requestAPI<ApiResponse<ISTORE.IStoreListRES>>('post', 'v1', 'location/customer', 'nearby-store-list', data);
};

export const getSuggestion = async (data: ISTORE.IGetSuggestionREQ) => {
  const params: Record<string, string | number | boolean> = { input: data.input, limit: data.limit || 5 };
  return requestAPI<ApiResponse<ISTORE.IGetSuggestionRES>>('get', 'v1', 'location', 'autocomplete', undefined, params);
};
