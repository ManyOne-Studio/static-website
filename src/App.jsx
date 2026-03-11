import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundScene from './components/canva/BackgroundScene';

// Imports des composants
import Navigation from './components/Navigation';
import DevlogList from './components/DevlogList';
import DevlogDetail from './components/DevlogDetail';
import Team from './components/Team';

function MainContent() {
  const location = useLocation();
  const [lang, setLang] = useState('fr');
  const [allDevlogs, setAllDevlogs] = useState([]);

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
      
      {/* 1. LES NAVBARS (Toujours au-dessus) */}
      <Navigation lang={lang} setLang={setLang} />

      <main className="relative flex-1 h-full overflow-hidden">
        
        {/* --- LE FOND FIXE (Ne bouge jamais) --- */}
        <div className="absolute inset-0 z-0">
          {/* SLOT CANVAS THREE.JS */}
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-white/5 uppercase tracking-[2em] pointer-events-none text-xs z-0">
          <BackgroundScene /> 
          <div className="grainOverlay" />
          </div>
          {/* LOGO CENTRAL FIXE */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <h1 className="text-[10rem] font-black italic tracking-tighter leading-none uppercase">MANYONE</h1>
            <p className="text-sm tracking-[1.5em] opacity-40 uppercase">
              Digital Craftsmanship
            </p>
          </div>

          {/* TEXTE FIXE BAS DROITE */}
          <div className="absolute bottom-10 right-10 text-[24px] opacity-20 pointer-events-none uppercase tracking-tighter">
            MANYONE STUDIO 2026
          </div>
        </div>
        {/* --- FIN DU FOND FIXE --- */}

        {/* 2. LES BULLES (Par-dessus le fond, z-index plus haut) */}
        <div className="relative z-10 h-full w-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Correction : Route par défaut pour éviter l'erreur de console */}
              {/* Ici on redirige vers /devlog pour que l'utilisateur voie du contenu direct */}
              <Route path="/" element={<div className="h-full w-full" />} />  
                           
              <Route path="/devlog" element={<DevlogList allLogs={allDevlogs} lang={lang} />} />
              <Route path="/devlog/:date/:slug" element={<DevlogDetail allLogs={allDevlogs} lang={lang} />} />
              
              {/* ROUTE TEAM AJOUTÉE ICI */}
              <Route path="/team" element={<Team lang={lang} />} />
            </Routes>
          </AnimatePresence>
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