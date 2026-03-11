import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Ajout de useLocation pour gérer l'état actif
import { Ghost } from '@solar-icons/react';

const translations = {
  fr: { home: "ACCUEIL", devlog: "DEVLOG", team: "L'ÉQUIPE" },
  en: { home: "HOME", devlog: "DEVLOG", team: "THE TEAM" }
};

export default function Navigation({ lang, setLang }) {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // On récupère l'URL actuelle

  const closeMenu = () => setIsOpen(false);

  // Petite fonction pour vérifier si un lien est actif
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* BOUTON BURGER (Mobile) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] md:hidden bg-ui-bg p-3 rounded-xl border border-white/5 text-white"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* NAV MOBILE OVERLAY */}
      <div className={`fixed inset-0 bg-ui-bg z-[80] flex flex-col transition-transform duration-500 md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center flex-1 gap-12">
          
          <div className="flex gap-4 font-sans text-sm font-bold">
            <button onClick={() => setLang('fr')} className={`w-10 h-10 flex items-center justify-center rounded-full ${lang === 'fr' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>Fr</button>
            <button onClick={() => setLang('en')} className={`w-10 h-10 flex items-center justify-center rounded-full ${lang === 'en' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>En</button>
          </div>

          <nav className="flex flex-col items-center gap-8 text-3xl font-widdershins uppercase tracking-widest">
            <Link to="/" onClick={closeMenu} className={`transition-all ${isActive('/') ? 'text-accent' : 'hover:text-accent'}`}>{t.home}</Link>
            <Link to="/devlog" onClick={closeMenu} className={`transition-all ${isActive('/devlog') ? 'text-accent' : 'hover:text-accent'}`}>{t.devlog}</Link>
            <Link to="/team" onClick={closeMenu} className={`transition-all ${isActive('/team') ? 'text-accent' : 'hover:text-accent'}`}>{t.team}</Link>
          </nav>
        </div>
      </div>

      {/* NAV GAUCHE (Desktop) */}
      <aside className="hidden md:flex w-[60px] h-full bg-ui-bg flex-col items-center py-8 z-50">
        <div className="bg-white/5 rounded-xl flex items-center justify-center shrink-0 mb-3">
          <Ghost size={32} color="#4ade80" weight="BoldDuotone" />
        </div>

        <div className="flex flex-col gap-1">
          {/* youtube*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
          </a>
          {/* insta*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>
          {/* tiktok*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>          
          {/* bluesky*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>          
          {/* reddit*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>          
          {/* linkedin*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>          
        </div>


        <div className="flex-1" />

        <nav className="flex gap-6 items-center text-xl font-widdershins [writing-mode:vertical-lr] rotate-180">
          <Link to="/" className={`transition-all ${isActive('/') ? 'text-accent' : 'hover:text-accent opacity-60'}`}>{t.home}</Link>
          <span className="opacity-20 py-2">
            <svg width="20" height="3" viewBox="0 0 20 3" fill="none"><path d="M1 1C1.69882 1 3.68941 1 7.26647 1.11C11.4259 1.44001 14.4047 1.66667 15.9877 1.72167C16.8718 1.77667 17.92 1.88667 19 2" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <Link to="/devlog" className={`transition-all ${isActive('/devlog') ? 'text-accent' : 'hover:text-accent opacity-60'}`}>{t.devlog}</Link>
          <span className="opacity-20 py-2">
            <svg width="20" height="3" viewBox="0 0 20 3" fill="none"><path d="M1 2C1.97791 2 4.12716 1.78001 10.8234 1.335C12.3669 1.22333 12.9875 1.11333 14.1937 1.05667C15.4 1 17.1731 1 19 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <Link to="/team" className={`transition-all ${isActive('/team') ? 'text-accent' : 'hover:text-accent opacity-60'}`}>{t.team}</Link>
        </nav>
      </aside>

      {/* NAV HAUT DROITE (Desktop) */}
      <header className="hidden md:flex absolute top-0 right-[3svw] bg-ui-bg px-6 py-4 items-center gap-4 rounded-b-[24px] z-[60] shadow-2xl">
        <Link to="/" className={`transition-all tracking-widest text-xs uppercase font-bold ${isActive('/') ? 'text-accent' : 'hover:text-accent'}`}>{t.home}</Link>
        <span className="opacity-20 select-none">
          <svg width="3" height="20" viewBox="0 0 3 20" fill="none"><path d="M1 1C1 1.97791 1.21999 4.12716 1.665 10.8234C1.77667 12.3669 1.88667 12.9875 1.94333 14.1937C2 15.4 2 17.1731 2 19" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </span>
        <Link to="/devlog" className={`transition-all tracking-widest text-xs uppercase font-bold ${isActive('/devlog') ? 'text-accent' : 'hover:text-accent'}`}>{t.devlog}</Link>
        <span className="opacity-20 select-none">
          <svg width="3" height="20" viewBox="0 0 3 20" fill="none"><path d="M2.00012 1C2.00012 1.69882 2.00012 3.68941 1.89012 7.26647C1.56011 11.4259 1.33344 14.4047 1.27845 15.9877C1.22345 16.8718 1.11345 17.92 1.00012 19" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </span>
        {/* Correction ici : Lien vers /team */}
        <Link to="/team" className={`transition-all tracking-widest text-xs uppercase font-bold ${isActive('/team') ? 'text-accent' : 'hover:text-accent'}`}>{t.team}</Link>
        
        <span className="opacity-20 select-none mx-2">|</span>
        
        <div className="flex gap-2 font-sans text-xs font-bold">
          <button onClick={() => setLang('fr')} className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${lang === 'fr' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30 hover:opacity-100'}`}>Fr</button>
          <button onClick={() => setLang('en')} className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${lang === 'en' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30 hover:opacity-100'}`}>En</button>
        </div>
      </header>
    </>
  );
}