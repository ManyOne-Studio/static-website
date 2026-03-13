import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RoundAltArrowLeft, Link, UserId, MentionSquare } from '@solar-icons/react';

// Données de test pour ton équipe
const teamMembers = [
  { id: 1, name: "Nicolas Asri", role: "Production, Sound Direction", img: "https://via.placeholder.com/300x400", rs: { linkedin: "https://www.linkedin.com/in/nicolasasri/"  } },
  { id: 2, name: "Alexandre Leconte", role: "Game Design, Communication", img: "https://via.placeholder.com/300x400", rs: { linkedin: "https://www.linkedin.com/in/alexandre-leconte-0572a6252/", insta: "https://www.instagram.com/le_double_jeu/?hl=fr" } },
  { id: 3, name: "Robin Lejeune", role: "Lead dev", img: "https://via.placeholder.com/300x400", rs: { linkedin: "https://www.linkedin.com/in/robin-lejeune/"  } },
  { id: 4, name: "Clovie Thouvenot Oudart", role: "Tech Art", img: "https://via.placeholder.com/300x400", rs: { linkedin: "https://www.linkedin.com/in/clovie-thouvenot-oudart/"} },
  { id: 5, name: "Bastien Brahic", role: "Assets Direction Artistiques, UI/UX", img: "https://via.placeholder.com/300x400", rs: { linkedin: "https://www.linkedin.com/in/bastien-b-873687200/" } },
];

export default function Team() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      className="fixed md:absolute inset-y-0 md:inset-y-6 left-0 md:left-6 z-40 flex flex-col gap-5 pointer-events-none w-full md:w-[55svw] pt-6 pb-6 px-6 md:p-0"
    >
      {/* BOUTON RETOUR */}
      <button 
        onClick={() => navigate('/')} 
        className="p-3.5 bg-ui-bg rounded-full flex items-center w-fit pointer-events-auto cursor-pointer shadow-lg"
      >
        <RoundAltArrowLeft size={24} weight="BoldDuotone" />
      </button>

      {/* CONTENU DE LA BULLE */}
      <div className="flex-1 bg-ui-bg rounded-3xl p-8 overflow-y-auto pointer-events-auto scrollbar-hide">
        <header className="mb-10">
          <h2 className="text-4xl font-bold mb-2 uppercase italic tracking-tighter">L'Équipe</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full" />
        </header>

        {/* GRILLE DE L'ÉQUIPE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col gap-4 group">
              {/* IMAGE */}
              <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>

              {/* INFOS */}
              <div className="flex flex-col gap-1">
                <h4 className="text-xl uppercase tracking-tighter">{member.name}</h4>
                <p className="text-xs font-sans opacity-40 uppercase tracking-[0.2em]">{member.role}</p>
              </div>

              {/* RÉSEAUX SOCIAUX (Placeholders avec Solar Icons valides) */}
              <div className="flex gap-4">
                {/* LinkedIn : s'affiche seulement si member.rs.linkedin existe */}
                {member.rs.linkedin && (
                  <a href={member.rs.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-30 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"/></svg>
                  </a>
                )}

                {/* Instagram : s'affiche seulement si member.rs.insta existe */}
                {member.rs.insta && (
                  <a href={member.rs.insta} target="_blank" rel="noopener noreferrer" className="opacity-30 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}