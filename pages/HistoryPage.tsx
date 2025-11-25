import React, { useState, useEffect, useMemo } from 'react';
import { Order } from '../types';
import ThemeToggleButton from '../components/ThemeToggleButton';

interface HistoryPageProps {
  onNavigateBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigateBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const storedOrders = localStorage.getItem('e-drone-orders');
    if (storedOrders) {
      // Sort orders from newest to oldest
      setOrders(JSON.parse(storedOrders).reverse());
    }
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Extract YYYY-MM-DD from the ISO string
      const orderDate = new Date(order.date).toISOString().split('T')[0];
      
      if (startDate && orderDate < startDate) {
        return false;
      }
      if (endDate && orderDate > endDate) {
        return false;
      }
      return true;
    });
  }, [orders, startDate, endDate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="min-h-screen bg-transparent">
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Histórico de Pedidos</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            <button
              onClick={onNavigateBack}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Voltar
            </button>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Nenhum pedido encontrado</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Você ainda não fez nenhuma compra. Que tal explorar nossos produtos?</p>
          </div>
        ) : (
          <>
            {/* Date Filters */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-6 items-end">
                <div className="w-full sm:w-auto flex-1 max-w-xs">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Inicial</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="w-full sm:w-auto flex-1 max-w-xs">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Final</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
                {(startDate || endDate) && (
                  <div className="w-full sm:w-auto pb-1">
                     <button
                        onClick={handleClearFilters}
                        className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-medium text-sm flex items-center transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Limpar filtros
                      </button>
                  </div>
                )}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
               <div className="text-center py-12 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Nenhum pedido encontrado neste período.</p>
                  <button onClick={handleClearFilters} className="mt-2 text-cyan-500 hover:underline">Limpar filtros</button>
               </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl">
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="text-sm font-semibold text-cyan-500 dark:text-cyan-400">PEDIDO REALIZADO</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(order.date)}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">TOTAL: R$ {order.total.toFixed(2).replace('.', ',')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {order.id}</p>
                        </div>
                    </div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {order.items.map(item => (
                        <li key={item.id} className="p-4 flex items-center space-x-4">
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">R$ {item.price.toFixed(2).replace('.', ',')} x {item.quantity}</p>
                          </div>
                          <p className="text-md font-bold text-gray-800 dark:text-gray-200">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;