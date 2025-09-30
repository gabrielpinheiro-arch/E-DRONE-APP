
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateCart: (newCart: CartItem[]) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateCart, onCheckout }) => {
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
    } else {
      const newCart = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      onUpdateCart(newCart);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    const newCart = items.filter(item => item.id !== itemId);
    onUpdateCart(newCart);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 id="cart-heading" className="text-xl font-semibold text-white">Seu Carrinho</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar carrinho"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <p>Seu carrinho está vazio.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-center space-x-4 bg-gray-700/50 p-3 rounded-lg">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-white">{item.name}</h3>
                      <p className="text-xs text-gray-400">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                       <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="bg-gray-600 hover:bg-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-white">-</button>
                       <span className="w-8 text-center font-bold">{item.quantity}</span>
                       <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="bg-gray-600 hover:bg-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-white">+</button>
                    </div>
                     <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-300" aria-label={`Remover ${item.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                     </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <footer className="p-4 border-t border-gray-700">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-medium text-gray-300">Subtotal:</span>
                <span className="font-bold text-cyan-400">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Finalizar Compra
              </button>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
