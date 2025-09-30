
export enum Page {
  Login = 'LOGIN',
  Signup = 'SIGNUP',
  Products = 'PRODUCTS',
  History = 'HISTORY',
}

export enum ProductCategory {
  Moda = 'Moda',
  Celulares = 'Celulares',
  Comida = 'Comida',
  ProdutosDeBeleza = 'Produtos de Beleza',
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface OrderItem extends CartItem {}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}
