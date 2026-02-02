export interface ISubCategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  priority: number;
  depth: number;
  parentId: string | null;
  hasParent: boolean;
  hasChildren: boolean;
  childrenCount: number;
  subcategories: ISubCategoryData[];
}

export interface ICategoriesData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  priority: number;
  depth: number;
  parentId: string | null;
  hasParent: boolean;
  hasChildren: boolean;
  childrenCount: number;
  subcategories: ISubCategoryData[]; // recursive children
}

export interface ICategoryFetchRES {
  total: number;
  categories: ICategoriesData[];
}
