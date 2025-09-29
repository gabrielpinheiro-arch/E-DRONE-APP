
import { ProductCategory, Product } from './types';

export const CATEGORIES: ProductCategory[] = [
  ProductCategory.Moda,
  ProductCategory.Celulares,
  ProductCategory.Comida,
  ProductCategory.ProdutosDeBeleza,
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Tênis de Corrida Neon', price: 349.90, category: ProductCategory.Moda, imageUrl: 'https://picsum.photos/seed/fashion1/400/300' },
  { id: 2, name: 'Jaqueta Corta-Vento', price: 199.99, category: ProductCategory.Moda, imageUrl: 'https://picsum.photos/seed/fashion2/400/300' },
  { id: 3, name: 'Calça Jeans Premium', price: 249.50, category: ProductCategory.Moda, imageUrl: 'https://picsum.photos/seed/fashion3/400/300' },
  { id: 4, name: 'Óculos de Sol Aviador', price: 450.00, category: ProductCategory.Moda, imageUrl: 'https://picsum.photos/seed/fashion4/400/300' },
  { id: 5, name: 'Smartphone Pro X', price: 3999.00, category: ProductCategory.Celulares, imageUrl: 'https://picsum.photos/seed/phone1/400/300' },
  { id: 6, name: 'Fone de Ouvido Sem Fio', price: 599.00, category: ProductCategory.Celulares, imageUrl: 'https://picsum.photos/seed/phone2/400/300' },
  { id: 7, name: 'Smartwatch Fitness', price: 899.90, category: ProductCategory.Celulares, imageUrl: 'https://picsum.photos/seed/phone3/400/300' },
  { id: 8, name: 'Carregador Portátil Turbo', price: 159.00, category: ProductCategory.Celulares, imageUrl: 'https://picsum.photos/seed/phone4/400/300' },
  { id: 9, name: 'Pizza Artesanal de Calabresa', price: 59.90, category: ProductCategory.Comida, imageUrl: 'https://picsum.photos/seed/food1/400/300' },
  { id: 10, name: 'Hambúrguer Gourmet Duplo', price: 39.90, category: ProductCategory.Comida, imageUrl: 'https://picsum.photos/seed/food2/400/300' },
  { id: 11, name: 'Combo de Sushi (20 Peças)', price: 79.99, category: ProductCategory.Comida, imageUrl: 'https://picsum.photos/seed/food3/400/300' },
  { id: 12, name: 'Açaí na Tigela 500ml', price: 25.00, category: ProductCategory.Comida, imageUrl: 'https://picsum.photos/seed/food4/400/300' },
  { id: 13, name: 'Sérum Facial Vitamina C', price: 129.90, category: ProductCategory.ProdutosDeBeleza, imageUrl: 'https://picsum.photos/seed/beauty1/400/300' },
  { id: 14, name: 'Kit de Maquiagem Profissional', price: 299.00, category: ProductCategory.ProdutosDeBeleza, imageUrl: 'https://picsum.photos/seed/beauty2/400/300' },
  { id: 15, name: 'Perfume Importado Floral', price: 499.90, category: ProductCategory.ProdutosDeBeleza, imageUrl: 'https://picsum.photos/seed/beauty3/400/300' },
  { id: 16, name: 'Creme Hidratante Corporal', price: 79.50, category: ProductCategory.ProdutosDeBeleza, imageUrl: 'https://picsum.photos/seed/beauty4/400/300' },
];
