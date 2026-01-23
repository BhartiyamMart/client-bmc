import { requestAPI } from '@/lib/axios';
import { ApiResponse } from '@/interfaces/api.interface';
import * as IContent from '@/interfaces/content.interface';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';


export const getBanners = async (tag: string) => {
  return requestAPI<ApiResponse<IContent.IBannerRES>>(
    'get',
    'v1',
    'banner/customer',
    'banners-by-tag',
    undefined,  // data parameter (not needed for GET)
    { tag }     // params parameter
  );
};


export const fetchAllCategories = async() => {
    return requestAPI<ApiResponse<IContent.ICategoryFetchRES>>(
      'get',
      'v1',
      'category/customer',
      'category-nested-list'
    )
}