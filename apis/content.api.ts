import { requestAPI } from '@/lib/axios';
import { ApiResponse } from '@/interfaces/api.interface';
import * as IContent from '@/interfaces/content.interface';

export const getBanners = async (params?: IContent.IBannerRequest) => {
  return requestAPI<ApiResponse<IContent.IBannerResponse>>('get', 'v1', 'banner/customer', 'banner-list', undefined, {
    ...(params?.format && { format: params.format }),
    ...(params?.tag && { tag: params.tag }),
  });
};
