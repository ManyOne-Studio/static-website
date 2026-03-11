import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from '@solar-icons/react';

const translations = {
  fr: { home: "ACCUEIL", devlog: "DEVLOG", team: "L'ÉQUIPE" },
  en: { home: "HOME", devlog: "DEVLOG", team: "THE TEAM" }
};

export default function Navigation({ lang, setLang }) {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour fermer le menu quand on clique sur un lien
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* BOUTON BURGER (Visible uniquement sur mobile) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] md:hidden bg-ui-bg p-3 rounded-xl border border-white/5 text-white"
      >
        {isOpen ? (
          /* ICÔNE CROIX */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          /* ICÔNE BURGER */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* NAV MOBILE OVERLAY */}
      <div className={`fixed inset-0 bg-ui-bg z-[80] flex flex-col transition-transform duration-500 md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center flex-1 gap-12">
          
          {/* SÉLECTEUR LANGUE MOBILE */}
          <div className="flex gap-4 font-sans text-sm font-bold">
            <button onClick={() => setLang('fr')} className={`w-10 h-10 flex items-center justify-center rounded-full ${lang === 'fr' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>Fr</button>
            <button onClick={() => setLang('en')} className={`w-10 h-10 flex items-center justify-center rounded-full ${lang === 'en' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>En</button>
          </div>

          {/* LIENS MOBILE */}
          <nav className="flex flex-col items-center gap-8 text-3xl font-widdershins uppercase tracking-widest">
            <Link to="/" onClick={closeMenu} className="hover:text-accent">{t.home}</Link>
            <Link to="/devlog" onClick={closeMenu} className="hover:text-accent">{t.devlog}</Link>
            <button onClick={closeMenu} className="opacity-20">{t.team}</button>
          </nav>

          {/* RÉSEAUX SOCIAUX MOBILE */}
          <div className="flex gap-6 mt-8">
             <a href="" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"/></svg>
             </a>
          </div>
        </div>
      </div>

      {/* NAV GAUCHE (Cachée sur mobile) */}
      <aside className="hidden md:flex w-[4svw] h-full bg-ui-bg flex-col items-center py-8 z-50">
        <div className="bg-white/5 rounded-xl flex items-center justify-center shrink-0 mb-3">
          <Ghost size={32} color="#4ade80" weight="BoldDuotone" />
        </div>

        <div className="flex flex-col gap-4">
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"/></svg>
          </a>
        </div>

        <div className="flex-1" />

        <nav className="flex gap-6 items-center text-xl font-widdershins [writing-mode:vertical-lr] rotate-180">
          <Link to="/" className="hover:text-accent transition-all">{t.home}</Link>
          <span className="opacity-20 py-2 text-center select-none">
            <svg width="20" height="3" viewBox="0 0 20 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1C1.69882 1 3.68941 1 7.26647 1.11C11.4259 1.44001 14.4047 1.66667 15.9877 1.72167C16.8718 1.77667 17.92 1.88667 19 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <Link to="/devlog" className="hover:text-accent transition-all text-accent">{t.devlog}</Link>
          <span className="opacity-20 py-2 text-center select-none">
            <svg width="20" height="3" viewBox="0 0 20 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2C1.97791 2 4.12716 1.78001 10.8234 1.335C12.3669 1.22333 12.9875 1.11333 14.1937 1.05667C15.4 1 17.1731 1 19 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <button className="opacity-20 cursor-default">{t.team}</button>
        </nav>
      </aside>

      {/* NAV HAUT DROITE (Cachée sur mobile) */}
      <header className="hidden md:flex absolute top-0 right-[3svw] bg-ui-bg px-6 py-4 items-center gap-4 rounded-b-[24px] z-[60]">
        <Link to="/" className="hover:text-accent transition-all tracking-widest text-xs uppercase font-bold">{t.home}</Link>
        <span className="opacity-20 py-2 text-center select-none">
          <svg width="3" height="20" viewBox="0 0 3 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1C1 1.97791 1.21999 4.12716 1.665 10.8234C1.77667 12.3669 1.88667 12.9875 1.94333 14.1937C2 15.4 2 17.1731 2 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <Link to="/devlog" className="hover:text-accent transition-all tracking-widest text-xs uppercase font-bold">{t.devlog}</Link>
        <span className="opacity-20 py-2 text-center select-none">
          <svg width="3" height="20" viewBox="0 0 3 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00012 1C2.00012 1.69882 2.00012 3.68941 1.89012 7.26647C1.56011 11.4259 1.33344 14.4047 1.27845 15.9877C1.22345 16.8718 1.11345 17.92 1.00012 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <button className="opacity-20 cursor-default">{t.team}</button>
        <span className="opacity-20 py-2 text-center select-none">
          <svg width="3" height="20" viewBox="0 0 3 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00012 1C2.00012 1.69882 2.00012 3.68941 1.89012 7.26647C1.56011 11.4259 1.33344 14.4047 1.27845 15.9877C1.22345 16.8718 1.11345 17.92 1.00012 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <div className="flex gap-2 font-sans text-xs font-bold">
          <button onClick={() => setLang('fr')} className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${lang === 'fr' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>Fr</button>
          <button onClick={() => setLang('en')} className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${lang === 'en' ? 'bg-white text-[#2A2A2A]' : 'text-white opacity-30'}`}>En</button>
        </div>
      </header>
    </>
  );
}