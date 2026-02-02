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
  imageUrl?: string;
  description?: string | null;
  priority?: number;
  parentId?: string | null;
  productCount?: number;

  // Nested structure
  depth?: number;
  hasChildren?: boolean;
  hasParent?: boolean;
  childrenCount?: number;

  subcategories?: ICategoriesData[];
  children?: ICategoriesData[];

  createdAt?: string;
  updatedAt?: string;
}

export interface ICategoryTree extends ICategoriesData {
  children: ICategoryTree[];
  level: number;
}
export interface ICategoryFetchRES {
  total: number;
  categories: ICategoriesData[];
}
