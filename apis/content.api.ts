import { requestAPI } from '@/lib/axios';
import { ApiResponse } from '@/interfaces/api.interface';
import { IBannerRES } from '@/interfaces/shared.interface';

export const getBanners = async () => {
  return requestAPI<ApiResponse<IBannerRES>>('get', 'v1', 'banner', 'get-all-banners');
};
