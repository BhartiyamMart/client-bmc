import { requestAPI } from '@/lib/axios';
import { ApiResponse } from '@/interfaces/api.interface';
import { IBannerPayload } from '@/interfaces/banner.interface';

export const getBanners = async (): Promise<ApiResponse<IBannerPayload>> => {
  return requestAPI<ApiResponse<IBannerPayload>>('get', 'v1', 'banner', 'get-all-banners');
};
