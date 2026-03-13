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
        className="fixed top-6 right-6 z-[100] md:hidden   text-white"
      >
        {isOpen ? (
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.86865 1.86868C3.10954 2.81446 4.29354 3.87757 5.56732 5.00557C6.88996 6.17685 9.7922 8.43046 13.3086 11.8278C17.1234 15.5133 19.2286 18.0429 20.1424 19.2216C23.0627 22.9884 24.2046 24.0873 25.4491 24.9176C25.7477 25.0971 25.9824 25.2144 26.2206 25.3335L27.2909 25.8687M29.2464 2.40201C27.8295 2.81446 26.4642 3.4669 23.4384 5.93357C20.6748 8.18652 15.5433 12.6242 12.7371 14.9789C8.86387 18.2289 7.3833 19.6998 6.34686 20.7682C5.20121 21.9493 4.71664 23.3158 3.85708 24.2358C3.47219 24.6207 3.05619 24.8607 2.61263 25.0376C2.40374 25.1558 2.22775 25.3318 2.04642 25.5131" stroke="white" stroke-width="3.73715" stroke-linecap="round"/>
        </svg>
        ) : (
          <svg width="39" height="28" viewBox="0 0 39 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.00043 5.68865C2.2965 5.0935 3.68718 4.0976 5.78067 2.85196C6.60876 2.35926 7.57809 2.30018 11.7307 2.15065C22.193 1.77389 29.6107 2.1985 30.4062 2.39738C32.1019 2.79664 33.4986 3.09571 34.3435 3.34394C34.7936 3.49347 35.287 3.69086 36.3936 4.1933M4.0939 14.9599C7.65286 14.9599 14.355 15.0586 18.4613 15.2081C21.8767 15.2589 27.9957 15.2589 31.3453 15.3576C34.6949 15.4563 35.0896 15.6537 35.7954 15.8571M4.69207 23.3338C5.38591 23.4325 6.97696 24.0277 8.87157 24.7769C10.8642 25.5648 13.3532 25.4273 15.2029 25.6756C16.1465 25.7264 17.1484 25.8251 20.314 25.9746C22.9862 26.0255 27.8222 26.0255 33.702 25.7264" stroke="white" stroke-width="4" stroke-linecap="round"/>
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
        <div className="bg-white/5 rounded-xl flex items-center justify-center shrink-0 mb-3 p-2">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.08993 7.27249C1.16025 8.1163 0.80866 9.06559 0.703183 9.94456C0.457071 12.5112 5.72806e-06 15.0074 5.72806e-06 17.6444C5.72806e-06 18.5233 1.54693 20 2.49622 20C3.34003 20 3.83225 19.1913 3.83225 18.3827C3.83225 18.1717 3.79709 18.0663 3.76194 17.8905C3.79709 16.2732 4.07837 14.5152 4.39479 12.9331V12.687L5.06281 7.44829H5.13313C5.23861 7.44829 5.30893 7.44828 5.34408 7.58892C5.44956 7.97567 5.90663 10.1204 6.0121 10.5774C6.04726 10.6126 6.08242 10.8235 6.11758 10.8587C6.22306 11.0696 6.39885 11.2103 6.46917 11.4916C6.64496 11.9486 6.6098 12.6166 6.92623 13.0034L7.31298 14.6207C7.52393 14.902 7.45362 15.3239 7.55909 15.6755C7.94584 16.9763 8.71934 18.664 10.2663 18.664C10.6179 18.664 10.5124 18.4179 10.6882 18.2069C10.9343 17.9959 11.3211 17.9959 11.4266 17.6444C12.1649 15.0778 13.0556 13.1205 14.2158 10.6946C14.9542 9.14759 15.8208 6.42864 15.8683 6.42864L16.1417 6.20967C16.2367 6.60251 16.5218 8.43574 16.6168 8.79584C16.9969 9.12321 17.0444 11.1529 17.1869 11.6112C17.2344 11.6439 17.377 11.8076 17.377 11.8076C17.7096 13.3789 16.9969 16.3907 19.0399 17.5037H19.1349C19.1824 17.471 19.3725 17.4382 19.3725 17.4055L20.3569 17.3982C20.5327 17.3982 21.0249 17.0818 21.0249 16.906V16.8357C20.8843 16.7654 20.5679 16.7654 20.5679 16.5544C20.5679 16.2732 20.814 16.027 20.814 15.7458V15.6755C20.814 15.6403 20.6382 15.3942 20.5679 15.3239C20.4624 13.9527 20.2163 13.1089 20.2866 11.7377L20.2163 11.5619C19.935 7.97567 19.5131 4.5301 19.056 0.979053C19.056 0.943894 18.9857 0.908735 18.9506 0.873577C18.9154 0.873577 18.4935 0.803259 18.4232 0.803259C18.2825 0.908735 17.5091 -0.603096 16.6301 0.275876C16.4543 0.416511 15.8917 0.979053 15.7863 1.04937C15.716 1.19001 15.2237 1.99866 15.0831 2.24477C14.8721 2.70184 13.0087 6.28804 12.7274 6.74511C12.7274 6.78027 12.5165 7.0967 12.4813 7.16701C12.4462 7.27249 12.2352 7.62408 12.2001 7.72956C11.9891 8.25694 10.7234 12.1596 10.4773 12.687C10.4773 12.7573 10.3366 13.0034 10.3366 13.0737H10.2663C9.91474 13.0737 9.9499 12.3705 9.87958 12.1244C9.56315 10.5071 8.82481 8.81948 8.75449 7.16701C8.68418 6.11225 8.68418 5.37391 8.36775 4.31915C8.33259 4.17851 7.94584 3.08859 7.8052 2.80731C7.8052 2.70184 7.66457 2.45573 7.66457 2.42057C7.24266 1.89318 6.57464 1.15485 5.97694 0.908735C5.90663 0.908735 5.80115 0.873577 5.76599 0.873577C5.51988 0.873577 4.67607 0.521988 4.39479 0.521988C4.14868 0.521988 3.90257 0.416511 3.65646 0.416511C3.19939 0.416511 2.74233 0.697782 2.4259 1.04937C2.46106 1.26032 1.72279 1.68223 1.68763 1.85802C1.68763 1.92834 1.65247 2.17445 1.61731 2.24477L1.08993 7.27249Z" fill="white"/>
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          {/* youtube*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.244 4c.534.003 1.87.016 3.29.073l.504.022c1.429.067 2.857.183 3.566.38c.945.266 1.687 1.04 1.938 2.022c.4 1.56.45 4.602.456 5.339l.001.152v.174c-.007.737-.057 3.78-.457 5.339c-.254.985-.997 1.76-1.938 2.022c-.709.197-2.137.313-3.566.38l-.504.023c-1.42.056-2.756.07-3.29.072l-.235.001h-.255c-1.13-.007-5.856-.058-7.36-.476c-.944-.266-1.687-1.04-1.938-2.022c-.4-1.56-.45-4.602-.456-5.339v-.326c.006-.737.056-3.78.456-5.339c.254-.985.997-1.76 1.939-2.021c1.503-.419 6.23-.47 7.36-.476zM9.999 8.5v7l6-3.5z"/></svg>
          </a>
          {/* discord*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.303 5.337A17.3 17.3 0 0 0 14.963 4c-.191.329-.403.775-.552 1.125a16.6 16.6 0 0 0-4.808 0C9.454 4.775 9.23 4.329 9.05 4a17 17 0 0 0-4.342 1.337C1.961 9.391 1.218 13.35 1.59 17.255a17.7 17.7 0 0 0 5.318 2.664a13 13 0 0 0 1.136-1.836c-.627-.234-1.22-.52-1.794-.86c.149-.106.297-.223.435-.34c3.46 1.582 7.207 1.582 10.624 0c.149.117.287.234.435.34c-.573.34-1.167.626-1.793.86a13 13 0 0 0 1.135 1.836a17.6 17.6 0 0 0 5.318-2.664c.457-4.52-.722-8.448-3.1-11.918M8.52 14.846c-1.04 0-1.889-.945-1.889-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.888 2.102c0 1.156-.838 2.1-1.889 2.1m6.974 0c-1.04 0-1.89-.945-1.89-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.889 2.102c0 1.156-.828 2.1-1.89 2.1"/></svg>          </a>
          {/* insta*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
          </a>
          {/* tiktok*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.97 7.97 0 0 1-5-1.755"/></svg>
          </a>          
          {/* bluesky*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"/></svg>
          </a>          
          {/* reddit*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 22c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m6.67-10a1.46 1.46 0 0 0-2.47-1a7.1 7.1 0 0 0-3.85-1.23l.65-3.12l2.14.45a1 1 0 1 0 .13-.61L12.821 6a.31.31 0 0 0-.37.24l-.74 3.47a7.14 7.14 0 0 0-3.9 1.23a1.46 1.46 0 1 0-1.61 2.39a3 3 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a3 3 0 0 0 0-.44a1.46 1.46 0 0 0 .81-1.33m-10 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0m5.81 2.75a3.84 3.84 0 0 1-2.47.77a3.84 3.84 0 0 1-2.47-.77a.27.27 0 0 1 .38-.38a3.27 3.27 0 0 0 2.08.63a3.28 3.28 0 0 0 2.09-.61a.28.28 0 1 1 .39.4zm-.18-1.71a1 1 0 1 1 1-1a1 1 0 0 1-1.01 1.04z"/></svg>
          </a>          
          {/* linkedin*/}
          <a href="" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-accent hover:bg-white/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"/></svg>
          </a>          
        </div>


        <div className="flex-1" />
{/*
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
      */}
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