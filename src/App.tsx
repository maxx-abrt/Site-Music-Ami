import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import VideoDetail from './pages/VideoDetail';
import ErrorBoundary from './components/ErrorBoundary';
import { register as registerServiceWorker } from './serviceWorker';
import reportWebVitals from './utils/webVitals';
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

function App() {
  // Optimisations de performance
  usePerformanceOptimization({
    preconnectUrls: [
      'https://www.youtube.com',
      'https://i.ytimg.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.podcastindex.org'
    ],
    preloadImages: [
      '/images/hero-background.jpg',
      '/images/musicami-logo.jpg'
    ],
    prefetchUrls: [
      '/episodes',
      '/about',
      '/contact',
      '/support'
    ]
  });

  useEffect(() => {
    // Enregistrer le service worker pour le mode hors ligne
    registerServiceWorker();
    
    // Rapporter les métriques web vitals
    reportWebVitals(console.log);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/episodes" element={<Episodes />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/video/:videoId" element={<VideoDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;