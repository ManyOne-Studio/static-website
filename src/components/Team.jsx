import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RoundAltArrowLeft, Link, UserId, MentionSquare } from '@solar-icons/react';

// Données de test pour ton équipe
const teamMembers = [
  { id: 1, name: "Prénom Nom", role: "Creative Director", img: "https://via.placeholder.com/300x400", rs: { twitter: "#", insta: "#" } },
  { id: 2, name: "Prénom Nom", role: "Developer", img: "https://via.placeholder.com/300x400", rs: { twitter: "#", insta: "#" } },
  { id: 3, name: "Prénom Nom", role: "3D Artist", img: "https://via.placeholder.com/300x400", rs: { twitter: "#", insta: "#" } },
  { id: 4, name: "Prénom Nom", role: "Sound Designer", img: "https://via.placeholder.com/300x400", rs: { twitter: "#", insta: "#" } },
  { id: 5, name: "Prénom Nom", role: "UI/UX Designer", img: "https://via.placeholder.com/300x400", rs: { twitter: "#", insta: "#" } },
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
                <h4 className="text-xl font-semibold uppercase italic tracking-tighter">{member.name}</h4>
                <p className="text-xs font-sans opacity-40 uppercase tracking-[0.2em] font-bold">{member.role}</p>
              </div>

              {/* RÉSEAUX SOCIAUX (Placeholders avec Solar Icons valides) */}
              <div className="flex gap-4">
                <a href={member.rs.twitter} className="opacity-30 hover:opacity-100 transition-opacity">
                  <MentionSquare size={20} weight="BoldDuotone" />
                </a>
                <a href={member.rs.insta} className="opacity-30 hover:opacity-100 transition-opacity">
                  <UserId size={20} weight="BoldDuotone" />
                </a>
                <a href="#" className="opacity-30 hover:opacity-100 transition-opacity">
                  <Link size={20} weight="BoldDuotone" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}