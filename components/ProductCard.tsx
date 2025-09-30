import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-sm text-cyan-500 dark:text-cyan-400 mb-2">{product.category}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-auto mb-4">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>

        {/* Seletor de Quantidade */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <button 
            onClick={() => handleQuantityChange(-1)} 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
            aria-label="Diminuir quantidade"
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-center font-bold rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            min="1"
            aria-label="Quantidade do produto"
          />
          <button 
            onClick={() => handleQuantityChange(1)} 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCartClick}
          disabled={isAdded}
          className={`w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 mt-auto ${
            isAdded
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500'
          }`}
        >
          {isAdded ? 'Adicionado!' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
