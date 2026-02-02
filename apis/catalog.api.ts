import { ApiResponse } from '@/interfaces/api.interface';
import { requestAPI } from '@/lib/axios';
import * as ICatalog from '@/interfaces/catalog.interface';

export const fetchAllCategories = async () => {
  return requestAPI<ApiResponse<ICatalog.ICategoryFetchRES>>('get', 'v1', 'category/customer', 'category-nested-list');
};
