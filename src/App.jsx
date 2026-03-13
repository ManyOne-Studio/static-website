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
                <div className="grainOverlay" />

      {/* 1. LES NAVBARS (Toujours au-dessus) */}
      <Navigation lang={lang} setLang={setLang} />

      <main className="relative flex-1 h-full overflow-hidden">
        
        {/* --- LE FOND FIXE (Ne bouge jamais) --- */}
        <div className="absolute inset-0 z-0">
          {/* SLOT CANVAS THREE.JS */}
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-white/5 uppercase tracking-[2em] pointer-events-none text-xs z-0">
          <BackgroundScene /> 
          </div>
          {/* LOGO CENTRAL FIXE */}
          <div className="absolute inset-0 flex items-center justify-center text-[80px]">
            MANYONE STUDIO
            {/*
            <video
              src="/test.mp4" // Mets ta vidéo dans le dossier public
              autoPlay
              loop
              muted
              playsInline
              className="w-[700px] h-auto" // Ajuste la taille (w-)
              style={{ mixBlendMode: 'screen' }} // Le mode de fusion pour "éclaircir"
            />
            <img 
                src="/logo_v3.png" // Assure-toi que ton logo est dans le dossier public
                alt="MANYONE Logo"
                className="w-[900px] h-auto opacity-90" // Ajuste la taille (w-) selon tes besoins
                style={{ mixBlendMode: 'screen' }} // Le mode de fusion "Éclaircir"
              />
              */}
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