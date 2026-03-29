
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminAccessPage from './pages/AdminAccessPage';
import Preloader from './components/Preloader';
import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = React.useState(true);
  const [isPreloading, setIsPreloading] = React.useState(true);
  const queryClient = useQueryClient();
  
  const showHeader = location.pathname !== '/admin' && !isPreloading;
  const showFooter = location.pathname !== '/admin' && location.pathname !== '/contact' && !isPreloading;

  useEffect(() => {
    // Prefetch ALL critical data in parallel - PRIORITIZING TEAM FOR ABOUT PAGE
    const prefetchData = async () => {
      await Promise.allSettled([
        queryClient.prefetchQuery({ queryKey:['projects'], queryFn: async () => (await fetch('/api/projects')).json(), staleTime: 1000 * 60 * 10 }),
        queryClient.prefetchQuery({ queryKey:['team'], queryFn: async () => (await fetch('/api/team')).json(), staleTime: 1000 * 60 * 30 }),
        queryClient.prefetchQuery({ queryKey:['socials'], queryFn: async () => (await fetch('/api/socials')).json(), staleTime: 1000 * 60 * 60 }),
      ]);
    };
    prefetchData();
  }, [queryClient]);

  useEffect(() => {
    if (isPreloading) return;

    let locomotiveScroll;
    const ctx = gsap.context(() => {});

    // Ensure DOM is fully rendered after preloader has exited
    const timer = setTimeout(() => {
      locomotiveScroll = new LocomotiveScroll();
      window.scrollTo(0, 0);

      ctx.add(() => {
        const revealElements = gsap.utils.toArray('.reveal');
        revealElements.forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      });

      setTimeout(() => { ScrollTrigger.refresh(); }, 500);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (locomotiveScroll) locomotiveScroll.destroy();
      ctx.revert();
    };
  }, [location.pathname, isPreloading]);

  return (
    <div className="min-h-screen bg-[#151515] text-white font-sans relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AnimatePresence>
        {showPreloader && (
          <Preloader onReady={() => {
            setShowPreloader(false);
            // Wait for preloader slide animation (0.9s) before mounting content
            setTimeout(() => {
              setIsPreloading(false);
            }, 900);
          }} />
        )}
      </AnimatePresence>

      {showHeader && <Header />}
      <main className={`relative z-10 w-full ${isPreloading ? 'h-screen overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
        <div className="mx-[10px] md:mx-0 bg-transparent min-h-screen md:min-h-0">
          {!isPreloading && (
            <Routes>
              {/* PRIMARY LANDING SUCCESS: Swapping Home for AboutPage as your main entrance */}
              <Route path="/" element={<AboutPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminAccessPage />} />
            </Routes>
          )}
        </div>
      </main>
      {showFooter && (
        <div className="mx-[10px] md:mx-0 bg-transparent">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
