'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

export default function Lore() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLore() {
      setLoading(true);
      const { data, error } = await supabase
        .from('server_lore')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error("Supabase Fehler:", error);
      } else {
        setEntries(data || []);
      }
      setLoading(false);
    }
    loadLore();
  }, []);

  return (
    <main className="space-y-6">
      <div className="mc-panel p-4 md:p-6">
        <h1 className="text-xl md:text-2xl mb-6 text-[#333]" style={{ textShadow: "2px 2px 0px #fff" }}>
          Server Lore & Chronik
        </h1>

        {loading ? (
          <div className="bg-[#111] border-4 border-[#000] p-6 text-center">
            <p className="text-[#555] animate-pulse text-xs md:text-sm">Lade Chronik aus Supabase...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-[#111] border-4 border-[#000] p-6 text-center">
            <p className="text-[#555] text-xs md:text-sm">Noch keine Lore-Einträge in der Tabelle `server_lore` vorhanden.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((item) => (
              <div key={item.id} className="bg-[#111] border-4 border-[#000] p-4 md:p-6">
                <div className="border-b-2 border-[#333] pb-2 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <h2 className="text-[#FFAA00] text-sm md:text-base font-bold">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <span className="text-[#555] text-[10px] md:text-xs">
                      [ {item.subtitle} ]
                    </span>
                  )}
                </div>
                
                {/* whitespace-pre-wrap sorgt dafür, dass Absätze aus Supabase 1:1 angezeigt werden */}
                <p className="text-[#DDD] text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
