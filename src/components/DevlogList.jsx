import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MinimalisticMagnifier, AltArrowDown, ArrowRight, CheckRead } from '@solar-icons/react';

export default function DevlogList({ allLogs, lang }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = useMemo(() => {
    const tags = new Set();
    allLogs.forEach(log => log.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allLogs]);

  const filteredLogs = allLogs.filter(log => {
    const matchesSearch = log.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => log.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
      className="absolute inset-y-[24px] left-[24px] z-40 flex flex-col gap-[18px] w-[calc(100%-140px)] max-w-[825px] pointer-events-none"
    >
      {/* BARRE DE RECHERCHE */}
      <div className="p-[12px] bg-ui-bg rounded-[24px] flex items-center gap-[10px] pointer-events-auto border border-white/5 shadow-2xl">
        <MinimalisticMagnifier size={24} color="#ffffff" weight="BoldDuotone" className="ml-2" />
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Rechercher..." 
          className="bg-transparent border-none outline-none flex-1 text-white font-sans text-sm" 
        />
        
        {/* TAGS SELECTOR (RADIX) */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="bg-white text-ui-bg px-4 py-2 rounded-full flex items-center gap-2 text-[14px] font-bold outline-none uppercase">
            TAGS {selectedTags.length > 0 && `(${selectedTags.length})`}
            <AltArrowDown size={18} weight="BoldDuotone" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="z-[100] bg-white rounded-xl p-2 shadow-2xl min-w-[150px] font-sans">
              {availableTags.map(tag => (
                <DropdownMenu.CheckboxItem 
                  key={tag} 
                  className="flex items-center gap-3 px-3 py-2 text-sm text-ui-bg hover:bg-neutral-100 rounded-lg cursor-pointer outline-none uppercase font-bold"
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                >
                  <div className={`w-4 h-4 border border-ui-bg/20 rounded flex items-center justify-center ${selectedTags.includes(tag) ? 'bg-ui-bg' : ''}`}>
                    {selectedTags.includes(tag) && <CheckRead size={12} color="white" />}
                  </div>
                  {tag}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* LISTE DES PREVIEWS */}
      <div className="flex-1 bg-ui-bg rounded-[24px] p-[24px] overflow-y-auto pointer-events-auto border border-white/5 flex flex-col gap-[16px] scrollbar-hide">
        {filteredLogs.map(log => (
          <div key={log.id} onClick={() => navigate(`/devlog/${log.date}/${log.slug}`)} className="flex flex-col lg:flex-row gap-[24px] items-start hover:bg-white/5 p-4 rounded-2xl transition-all group cursor-pointer">
            <div className="h-[270px] aspect-[9/16] bg-black rounded-xl overflow-hidden shrink-0 border border-white/10">
              <video src={log.video} muted loop autoPlay className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="flex flex-col min-h-[270px] justify-between py-2">
              <div>
                <h3 className="text-[34px] leading-tight mb-4 uppercase">{log.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {log.tags?.map(tag => <span key={tag} className="bg-white text-ui-bg px-[8px] py-[4px] rounded font-sans text-[16px] font-medium uppercase">{tag}</span>)}
                </div>
                <p className="font-sans font-light text-[14px] opacity-60 italic">{log.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-accent border border-accent/30 px-6 py-3 rounded-full uppercase text-[12px] font-bold w-fit group-hover:bg-accent group-hover:text-black transition-all">
                LIRE LE DEVLOG <ArrowRight size={20} weight="BoldDuotone" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}