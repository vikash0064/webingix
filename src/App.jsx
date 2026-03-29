
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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const [isPreloading, setIsPreloading] = React.useState(true);
  
  const showHeader = location.pathname !== '/admin' && !isPreloading;
  const showFooter = location.pathname !== '/admin' && location.pathname !== '/contact' && !isPreloading;

  useEffect(() => {
    if (isPreloading) return;

    const locomotiveScroll = new LocomotiveScroll();
    window.scrollTo(0, 0);

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
              end: "bottom 15%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    });

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);

    return () => {
      locomotiveScroll.destroy();
      ctx.revert();
    };
  }, [location.pathname, isPreloading]);

  return (
    <div className="min-h-screen bg-[#151515] text-white font-sans relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Preloader completion={() => {
        // Delay mounting the home page slightly to allow the curtain to clear
        setTimeout(() => setIsPreloading(false), 500);
      }} />
      {showHeader && <Header />}
      <main className={`relative z-10 w-full overflow-x-hidden ${isPreloading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
        <div className="mx-[10px] md:mx-0 bg-transparent min-h-screen md:min-h-0">
          {!isPreloading && (
            <Routes>
              <Route path="/" element={<Home />} />
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
