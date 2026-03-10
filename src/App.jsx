import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Imports des composants
import Navigation from './components/Navigation';
import DevlogList from './components/DevlogList';
import DevlogDetail from './components/DevlogDetail';

function MainContent() {
  const location = useLocation();
  const [lang, setLang] = useState('fr');
  const [allDevlogs, setAllDevlogs] = useState([]);

  // Chargement auto des fichiers devlogs
  useEffect(() => {
    const modules = import.meta.glob('./content/devlogs/*.js', { eager: true });
    const loadedLogs = Object.keys(modules).map((key) => ({
      id: key.replace('./content/devlogs/', '').replace('.js', ''),
      ...modules[key].data
    }));
    setAllDevlogs(loadedLogs);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black flex text-ui-text font-widdershins overflow-hidden">
      
      {/* 1. LES NAVBARS (Gauche + Haut) */}
      <Navigation lang={lang} setLang={setLang} />

      <main className="relative flex-1 h-full overflow-hidden">
        
        {/* 2. LE FOND (Canvas Three.js Placeholder) */}
        <div className="absolute inset-0 bg-neutral-900 pointer-events-none" />

        {/* 3. LOGO CENTRAL (Uniquement sur Home) */}
        {location.pathname === "/" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-[10rem] font-black italic tracking-tighter leading-none uppercase">MANYONE</h1>
            <p className="text-sm tracking-[1.5em] opacity-40 uppercase">Digital Craftsmanship</p>
          </motion.div>
        )}

        {/* 4. GESTION DES BULLES (Routes) */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/devlog" element={<DevlogList allLogs={allDevlogs} lang={lang} />} />
            <Route path="/devlog/:date/:slug" element={<DevlogDetail allLogs={allDevlogs} lang={lang} />} />
          </Routes>
        </AnimatePresence>

        {/* TEXTE FIXE BAS DROITE */}
        <div className="absolute bottom-10 right-10 text-[24px] opacity-20 pointer-events-none uppercase tracking-tighter">
          MANYONE STUDIO 2026
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}