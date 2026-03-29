
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
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
        queryClient.prefetchQuery({ queryKey:['about_data'], queryFn: async () => (await fetch('/api/about')).json(), staleTime: 1000 * 60 * 60 }),
      ]);
    };
    prefetchData();
  }, [queryClient]);

  useEffect(() => {
    if (isPreloading) return;

    // ELITE SMOOTH SCROLL: Initialize Lenis for that premium 'expensive' feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GLOBAL HASH INTERCEPT: Use Lenis for all smooth scrolls to anchors
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.pathname === window.location.pathname) {
        e.preventDefault();
        lenis.scrollTo(target.hash, { offset: 0, duration: 1.2 });
      }
    };
    window.addEventListener('click', handleAnchorClick);

    const ctx = gsap.context(() => {
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
              toggleActions: "play none none none",
            }
          }
        );
      });
    });

    // Wait for the DOM to settle after preloader fade-out
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
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
              {/* HOME-FIRST RESTORED: Your stunning Home landing is the primary entrance again */}
              <Route path="/" element={<Home />} />
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
