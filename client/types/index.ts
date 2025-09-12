export type Coordinates = { lat: number; long: number };

export type RestaurantSummary = {
  id: number | string;
  name: string;
  category?: string;
  place?: string;
  star?: number;
  averageRating?: number;
  logo?: string;
};

export type MenuItem = {
  id: number | string;
  foodName: string;
  price: number;
  type?: string;
  image?: string;
  restaurantId?: number | string;
};

export type RestaurantDetail = RestaurantSummary & {
  coordinates?: Coordinates;
  images?: string[];
  totalMenus?: number;
  totalReviews?: number;
  menus?: MenuItem[];
};

export type CartItem = {
  id: string | number; // menu id
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
  restaurantId?: string | number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  createdAt: string; // ISO
};
