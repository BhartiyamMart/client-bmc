export interface ProductCardProps {
  id: string | number;
  label?: string;
  value?: number | string; // e.g. "Save Rs.10"
  image: string; // product image
  title: string; // product title
  unit: string; // e.g. "1 KG"
  magnitude?: number; // optional quantity value
  price: number; // discounted price
  oldPrice?: number; // strikethrough price
  deliveryTime?: string; // e.g. "15 MINS"
  variants?: number; // number of variants (e.g. 3 Variants)
  isFavorite?: boolean; // wishlist/heart icon
  onAdd?: () => void; // add button action
  onShare?: () => void; // share button action
}
