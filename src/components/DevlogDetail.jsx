import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@solar-icons/react';

export default function DevlogDetail({ allLogs, lang }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const log = allLogs.find(l => l.slug === slug);

  if (!log) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-y-[24px] left-[24px] z-40 flex flex-col gap-[18px] w-[calc(100%-140px)] max-w-[825px] pointer-events-none"
    >
      {/* BOUTON RETOUR */}
      <div className="p-[12px] bg-ui-bg rounded-[24px] flex items-center w-fit pointer-events-auto border border-white/5 shadow-2xl">
        <button onClick={() => navigate('/devlog')} className="flex items-center gap-3 px-4 py-1 hover:text-accent transition-colors font-bold uppercase text-sm tracking-widest">
          <ArrowLeft size={24} weight="BoldDuotone" />
          {lang === 'fr' ? 'RETOUR' : 'BACK'}
        </button>
      </div>

      {/* CONTENU DÉTAILLÉ */}
      <div className="flex-1 bg-ui-bg rounded-[24px] p-[24px] overflow-hidden pointer-events-auto border border-white/5 shadow-2xl flex gap-[24px]">
        {/* VIDEO STICKY */}
        <div className="w-1/4 sticky top-0 h-fit shrink-0">
          <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden border border-white/10">
            <video src={log.video} muted loop autoPlay className="w-full h-full object-cover opacity-80" />
          </div>
        </div>

        {/* TEXTE SCROLLABLE */}
        <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide flex flex-col gap-[24px]">
          <header>
            <h3 className="text-[34px] leading-tight mb-4 uppercase">{log.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {log.tags?.map(tag => <span key={tag} className="bg-white text-ui-bg px-2 py-1 rounded font-sans text-[14px] font-medium uppercase">{tag}</span>)}
            </div>
            <p className="font-sans font-light text-[14px] opacity-60 italic leading-relaxed">{log.desc}</p>
          </header>

          {log.sections?.map((sec, i) => (
            <div key={i} className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[4px] w-full">
                <div className="px-[8px] py-[4px] bg-white/15 rounded-full whitespace-nowrap text-[20px] uppercase">{sec.title}</div>
                <div className="flex-1 h-[2px] bg-white/15" />
              </div>
              <p className="font-sans text-[14px] leading-relaxed opacity-80">{sec.content}</p>
              {sec.images && (
                <div className="grid grid-cols-2 gap-[10px] mt-2">
                  {sec.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="w-full h-auto rounded-lg border border-white/5" />
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