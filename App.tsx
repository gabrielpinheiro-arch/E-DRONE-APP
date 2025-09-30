
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('e-drone-auth');
    if (loggedInStatus === 'true') {
      setCurrentPage(Page.Products);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('e-drone-auth', 'true');
    setCurrentPage(Page.Products);
  };

  const handleSignupSuccess = () => {
    localStorage.setItem('e-drone-auth', 'true');
    setCurrentPage(Page.Products);
  };

  const handleLogout = () => {
    localStorage.removeItem('e-drone-auth');
    setCurrentPage(Page.Login);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.Products:
        return (
          <ProductsPage
            onLogout={handleLogout}
            onNavigateToHistory={() => setCurrentPage(Page.History)}
          />
        );
      case Page.History:
        return (
          <HistoryPage onNavigateBack={() => setCurrentPage(Page.Products)} />
        );
      case Page.Signup:
        return (
          <SignupPage
            onSignupSuccess={handleSignupSuccess}
            onNavigateToLogin={() => setCurrentPage(Page.Login)}
          />
        );
      case Page.Login:
      default:
        return (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignup={() => setCurrentPage(Page.Signup)}
          />
        );
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans antialiased">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>
      </div>
      {renderPage()}
    </div>
  );
};

export default App;
