
import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  onLogout: () => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');

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
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        {category}
      </button>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-white">E-DRONE</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sair
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Catálogo de Produtos</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Explore nossa seleção de produtos entregues por drones.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-10">
          <FilterButton category="All" />
          {CATEGORIES.map(cat => <FilterButton key={cat} category={cat} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
