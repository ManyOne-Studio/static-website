import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RoundAltArrowDown, RoundAltArrowLeft } from '@solar-icons/react';


export default function DevlogDetail({ allLogs, lang }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const log = allLogs.find(l => l.slug === slug);

  if (!log) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      /* MODIFS STRUCTURE : 
         - fixed md:absolute + inset-y-0 md:inset-y-6
         - w-full md:w-[55svw] + left-0 md:left-6
         - pt-28 md:pt-0 + px-6 md:px-0
      */
      className="fixed md:absolute inset-y-0 md:inset-y-6 left-0 md:left-6 z-40 flex flex-col gap-5 pointer-events-none w-full md:w-[55svw] pt-6 pb-6 px-6 md:p-0"
    >
      {/* BOUTON RETOUR */}
        <button onClick={() => navigate('/devlog')} className="p-3.5 bg-ui-bg rounded-full flex items-center w-fit pointer-events-auto cursor-pointer">
          <RoundAltArrowLeft size={24} weight="BoldDuotone" />
        </button>

      {/* CONTENU DÉTAILLÉ */}
      <div className="flex-1 bg-ui-bg rounded-3xl p-6 overflow-y-auto md:overflow-hidden pointer-events-auto flex flex-col md:flex-row gap-6 scrollbar-hide">
        
        {/* VIDEO STICKY 
            - w-full sur mobile / w-1/3 sur desktop
            - On retire le sticky sur mobile pour que le texte suive naturellement
        */}
        <div className="w-full md:w-1/3 md:sticky md:top-0 h-fit shrink-0">
          <div className="video-player-wrapper aspect-[9/16] bg-black rounded-xl overflow-hidden border border-white/10">
            <video src={log.video} controls className="w-full h-full object-cover " />
          </div>
        </div>

        {/* TEXTE SCROLLABLE */}
        <div className="flex-1 md:overflow-y-auto md:pr-4 scrollbar-hide flex flex-col gap-[24px]">
          <header>
            <h3 className="text-3xl leading-tight mb-4">{log.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {log.tags?.map(tag => <span key={tag} className="bg-white text-ui-bg px-2 py-1 rounded-full font-sans text-sm font-medium ">{tag}</span>)}
                </div>
            <p className="font-sans font-light text-sm opacity-60 leading-relaxed">{log.desc}</p>
          </header>

          {log.sections?.map((sec, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 w-full">
                <div className="px-4 py-1 bg-white/15 rounded-full whitespace-nowrap text-sm font-sans font-semibold">{sec.title}</div>
                <div className="flex-1 h-1 bg-white/15 rounded-full" />
              </div>
              <p className="font-sans text-sm leading-relaxed ">{sec.content}</p>
              {sec.images && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {sec.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="w-full h-auto rounded-lg" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}