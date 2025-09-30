
import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface HistoryPageProps {
  onNavigateBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigateBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('e-drone-orders');
    if (storedOrders) {
      // Sort orders from newest to oldest
      setOrders(JSON.parse(storedOrders).reverse());
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-white">Histórico de Pedidos</h1>
          <button
            onClick={onNavigateBack}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Voltar
          </button>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h2 className="text-2xl font-semibold text-white">Nenhum pedido encontrado</h2>
            <p className="mt-2 text-gray-400">Você ainda não fez nenhuma compra. Que tal explorar nossos produtos?</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700/50 border-b border-gray-700">
                    <div>
                        <p className="text-sm font-semibold text-cyan-400">PEDIDO REALIZADO</p>
                        <p className="text-xs text-gray-400">{formatDate(order.date)}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:text-right">
                        <p className="text-sm font-semibold text-white">TOTAL: R$ {order.total.toFixed(2).replace('.', ',')}</p>
                        <p className="text-xs text-gray-400">ID: {order.id}</p>
                    </div>
                </div>
                <ul className="divide-y divide-gray-700">
                  {order.items.map(item => (
                    <li key={item.id} className="p-4 flex items-center space-x-4">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400">R$ {item.price.toFixed(2).replace('.', ',')} x {item.quantity}</p>
                      </div>
                      <p className="text-md font-bold text-gray-200">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
