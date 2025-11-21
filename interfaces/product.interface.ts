export interface IProductVariant {
  id: number;
  name: string;
  weight: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  category: string;
}

export interface IProduct {
  id: number;
  name: string;
  weight: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  deliveryTime?: string;
  label?: string;
  labelValue?: number;
  category: string;
  variants?: IProductVariant[];
  isFavorite?: boolean;
  onAdd?: () => void;
  onShare?: () => void;
}

export interface IModalProduct {
  id: number;
  name: string;
  weight: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
}
