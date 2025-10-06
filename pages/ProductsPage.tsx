import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from '../constants';
import { ProductCategory, Product, CartItem, Order } from '../types';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import ThemeToggleButton from '../components/ThemeToggleButton';
import Notification from '../components/Notification';

interface ProductsPageProps {
  onLogout: () => void;
  onNavigateToHistory: () => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onLogout, onNavigateToHistory }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        imageUrl: product.imageUrl, 
        quantity 
      }];
    });
    setNotification(`${product.name} adicionado ao carrinho!`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    const existingOrdersString = localStorage.getItem('e-drone-orders');
    const existingOrders: Order[] = existingOrdersString ? JSON.parse(existingOrdersString) : [];
    
    localStorage.setItem('e-drone-orders', JSON.stringify([...existingOrders, newOrder]));

    setCart([]);
    setIsCartOpen(false);
    setNotification('Compra realizada com sucesso! Você pode ver seus pedidos no histórico.');
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const FilterButton: React.FC<{ category: ProductCategory | 'All' }> = ({ category }) => {
    const isActive = selectedCategory === category;
    return (
      <button
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          isActive
            ? 'bg-cyan-500 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        {category}
      </button>
    );
  };
  
  return (
    <div className="min-h-screen bg-transparent">
      {notification && (
        <Notification 
          message={notification} 
          type="success" 
          onClose={() => setNotification(null)} 
        />
      )}
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-DRONE</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
             <button
              onClick={onNavigateToHistory}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Ver histórico de compras"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={`Ver carrinho, ${cartItemCount} itens`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Catálogo de Produtos</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Explore nossa seleção de produtos entregues por drones.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-10">
          <FilterButton category="All" />
          {CATEGORIES.map(cat => <FilterButton key={cat} category={cat} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateCart={setCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default ProductsPage;
