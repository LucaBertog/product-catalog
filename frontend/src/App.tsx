import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Topbar from './components/Topbar';
import { useCallback } from 'react';
import Footer from './components/Footer';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // centraliza o termo via querystring (?q=...)
  const onSearch = useCallback((term: string) => {
    if (location.pathname.startsWith('/products')) {
      const url = new URL(window.location.href);
      if (term) url.searchParams.set('q', term); else url.searchParams.delete('q');
      navigate(url.pathname + url.search, { replace: false });
    } else 
      {
      navigate('/products?q=' + encodeURIComponent(term));
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Topbar onSearch={onSearch} />
      <main className="container" style={{paddingTop: 24}}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsList/>} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
