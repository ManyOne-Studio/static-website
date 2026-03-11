import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MinimalisticMagnifier, AltArrowDown, CheckSquare, RoundAltArrowLeft } from '@solar-icons/react';
import { translations } from '../constants/translations';

export default function DevlogList({ allLogs, lang }) {
  const t = translations[lang] || translations.fr;
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
      initial={{ x: -50, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -50, opacity: 0 }}
      className="fixed md:absolute inset-y-0 md:inset-y-6 left-0 md:left-6 z-40 flex flex-col gap-5 pointer-events-none w-full md:w-[55svw] md:pt-6 pt-24 pb-6 px-6 md:p-0 overflow-hidden"
    >
      {/* HEADER AVEC BOUTON RETOUR ET RECHERCHE */}
      <div className="flex items-center gap-4 w-full shrink-0">
        <button onClick={() => navigate('/')} className="p-3.5 bg-ui-bg rounded-full hidden md:flex items-center w-fit pointer-events-auto cursor-pointer">
          <RoundAltArrowLeft size={24} weight="BoldDuotone" />
        </button>

        <div className="flex-1 p-3 bg-ui-bg rounded-3xl flex items-center gap-2 pointer-events-auto shrink-0 shadow-lg">
          <MinimalisticMagnifier size={24} color="#ffffff" weight="BoldDuotone" className="ml-2" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder={t.search}
            className="bg-white/20 text-white rounded-full outline-none flex-1 font-sans text-sm px-4 py-1" 
          />
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="bg-white text-ui-bg px-2.5 py-1 rounded-full flex items-center gap-1 text-sm outline-none font-sans font-medium">
              Filtres {selectedTags.length > 0 && `(${selectedTags.length})`}
              <AltArrowDown size={18} weight="Bold" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-[100] bg-white rounded-xl p-2 shadow-2xl min-w-[150px] font-sans my-2">
                {availableTags.map(tag => (
                  <DropdownMenu.CheckboxItem 
                    key={tag} 
                    className="flex items-center gap-3 px-3 py-2 text-sm text-ui-bg hover:bg-neutral-100 rounded-lg cursor-pointer outline-none"
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                  >
                    <div className={`w-4 h-4 border border-ui-bg/20 rounded flex items-center justify-center ${selectedTags.includes(tag) ? 'bg-ui-bg' : ''}`}>
                      {selectedTags.includes(tag) && <CheckSquare size={14} color="white" />}
                    </div>
                    {tag}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="flex-1 bg-ui-bg rounded-3xl overflow-hidden pointer-events-auto flex flex-col shadow-xl p-6">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
          {filteredLogs.map(log => (
            <div 
              key={log.id} 
              onClick={() => navigate(`/devlog/${log.date}/${log.slug}`)} 
              className="flex flex-col lg:flex-row gap-6 items-start hover:bg-white/5 p-4 rounded-2xl transition-all group cursor-pointer"
            >
              <div className="w-auto h-[270px] aspect-[9/16] bg-black rounded-xl overflow-hidden shrink-0 border border-white/10">
                <video src={log.video} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col md:min-h-[270px] justify-between py-2">
                <div>
                  <h3 className="text-3xl leading-tight mb-2">{log.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {log.tags?.map(tag => (
                      <span key={tag} className="bg-white text-ui-bg px-2 py-1 rounded-full font-sans text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans font-light text-sm opacity-60">{log.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}