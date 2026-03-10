import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from '@solar-icons/react';

const translations = {
  fr: { home: "ACCUEIL", devlog: "DEVLOG", team: "L'ÉQUIPE" },
  en: { home: "HOME", devlog: "DEVLOG", team: "THE TEAM" }
};

export default function Navigation({ lang, setLang }) {
  const t = translations[lang];

  return (
    <>
      {/* NAV GAUCHE */}
      <aside className="w-[100px] h-full bg-ui-bg flex flex-col items-center py-4 pb-[58px] z-50 border-r border-white/5 shrink-0">
        <div className="w-[62px] h-[62px] bg-white/5 rounded-xl flex items-center justify-center">
          <Ghost size={32} color="#4ade80" weight="BoldDuotone" />
        </div>
        <div className="flex-1" />
        <nav className="flex flex-col gap-32 mb-10 origin-center rotate-[-90deg] whitespace-nowrap uppercase text-[24px]">
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-accent transition-all">{t.home}</Link>
            <span className="opacity-20">/</span>
            <Link to="/devlog" className="hover:text-accent transition-all">{t.devlog}</Link>
            <span className="opacity-20">/</span>
            <button className="opacity-20 cursor-default uppercase">{t.team}</button>
          </div>
        </nav>
      </aside>

      {/* NAV HAUT DROITE */}
      <header className="absolute top-0 right-[55px] bg-ui-bg px-6 py-4 flex items-center gap-[24px] rounded-b-[16px] z-[60] border-x border-b border-white/5 shadow-xl">
        <Link to="/" className="hover:text-accent transition-all tracking-widest text-xs uppercase font-bold">{t.home}</Link>
        <span className="opacity-10">|</span>
        <Link to="/devlog" className="hover:text-accent transition-all tracking-widest text-xs uppercase font-bold">{t.devlog}</Link>
        
        <div className="flex gap-4 ml-4 border-l border-white/10 pl-6 uppercase text-[12px] font-bold">
          <button onClick={() => setLang('fr')} className={lang === 'fr' ? 'text-accent' : 'opacity-30'}>FR</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-accent' : 'opacity-30'}>EN</button>
        </div>
      </header>
    </>
  );
}