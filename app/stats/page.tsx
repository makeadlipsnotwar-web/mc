'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

// Genau deine gewünschten Kategorien
const statCategories: Record<string, { label: string; unit: string }> = {
  play_time_minutes: { label: "Spielzeit", unit: "time" },
  player_kills: { label: "Spieler Kills", unit: "" },
  deaths: { label: "Tode", unit: "" },
  kd: { label: "K/D", unit: "kd" },
  
  // Strecken (alle einzeln)
  dist_total: { label: "Strecke: Gesamt", unit: " Blöcke" },
  dist_walked: { label: "Strecke: Gelaufen", unit: " Blöcke" },
  dist_sprinted: { label: "Strecke: Gesprintet", unit: " Blöcke" },
  dist_fallen: { label: "Strecke: Gefallen", unit: " Blöcke" },
  dist_elytra: { label: "Strecke: Mit Elytren geflogen", unit: " Blöcke" },
  dist_walk_on_water: { label: "Strecke: Auf Wasser gelaufen", unit: " Blöcke" },
  dist_swum: { label: "Strecke: Geschwommen", unit: " Blöcke" },
  dist_crouched: { label: "Strecke: Geschlichen", unit: " Blöcke" },
  dist_walk_under_water: { label: "Strecke: Unter Wasser gelaufen", unit: " Blöcke" },
  dist_climbed: { label: "Strecke: Geklettert", unit: " Blöcke" },

  // Verallgemeinerte Stats
  blocks_mined_total: { label: "Blöcke abgebaut (Gesamt)", unit: "" },
  items_used_total: { label: "Items verwendet (Gesamt)", unit: "" },
  entities_killed_total: { label: "Entities getötet (Gesamt)", unit: "" }
};

// Hilfsfunktion: Macht aus 305 Minuten -> "5 Stunden, 5 Minuten"
function formatPlayTime(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs} Stunden, ${mins} Minuten`;
}

// Hilfsfunktion: Berechnet die K/D
function calculateKD(kills: number, deaths: number) {
  if (deaths === 0) return kills > 0 ? kills : 0;
  return Number((kills / deaths).toFixed(2));
}

export default function Stats() {
  const [activeTab, setActiveTab] = useState<string>('play_time_minutes');
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const { data, error } = await supabase
        .from('player_stats')
        .select('*');

      if (error) {
        console.error("Supabase Fehler:", error);
      } else {
        setPlayers(data || []);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  // Globale Server-Summen berechnen
  const getGlobalSum = (column: string) => {
    return players.reduce((sum, player) => sum + Number(player[column] ?? 0), 0);
  };

  // Wert eines Spielers für die gewählte Kategorie holen (inkl. K/D-Sonderfall)
  const getPlayerRawValue = (player: any, category: string) => {
    if (category === 'kd') {
      return calculateKD(Number(player.player_kills ?? 0), Number(player.deaths ?? 0));
    }
    return Number(player[category] ?? 0);
  };

  // Wert für die Anzeige hübsch formatieren
  const formatDisplayValue = (rawValue: number, category: string) => {
    const unit = statCategories[category]?.unit || '';
    if (unit === 'time') return formatPlayTime(rawValue);
    if (unit === 'kd') return rawValue.toLocaleString('de-DE');
    return `${rawValue.toLocaleString('de-DE')}${unit}`;
  };

  // Rangliste sortieren (auch Spieler mit 0 werden sauber aufgelistet)
  const currentLeaderboard = [...players]
    .sort((a, b) => getPlayerRawValue(b, activeTab) - getPlayerRawValue(a, activeTab))
    .map((player, index) => {
      const rawVal = getPlayerRawValue(player, activeTab);
      return {
        rank: index + 1,
        name: player.player_name,
        value: formatDisplayValue(rawVal, activeTab)
      };
    });

  return (
    <main className="space-y-6">
      <div className="mc-panel p-4 md:p-6">
        <h1 className="text-xl md:text-2xl mb-6 text-[#333]" style={{ textShadow: "2px 2px 0px #fff" }}>
          Server Statistiken
        </h1>

        {/* 1. Globale Welt-Daten */}
        <div className="bg-[#111] border-4 border-[#000] p-4 mb-8">
          <h2 className="text-[#00AAAA] text-sm md:text-base mb-4 border-b-2 border-[#333] pb-2 font-bold">
            [ Globale Welt-Daten ]
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="flex flex-col">
              <span className="text-[#555]">Spielzeit Gesamt</span>
              <span className="text-[#DDD] font-bold">{formatPlayTime(getGlobalSum('play_time_minutes'))}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Strecke Gesamt</span>
              <span className="text-[#00AAAA] font-bold">{getGlobalSum('dist_total').toLocaleString('de-DE')} Blöcke</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Blöcke abgebaut</span>
              <span className="text-[#DDD] font-bold">{getGlobalSum('blocks_mined_total').toLocaleString('de-DE')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Items verwendet</span>
              <span className="text-[#FFAA00] font-bold">{getGlobalSum('items_used_total').toLocaleString('de-DE')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Entities getötet</span>
              <span className="text-[#00AA00] font-bold">{getGlobalSum('entities_killed_total').toLocaleString('de-DE')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Tode Gesamt</span>
              <span className="text-[#AA0000] font-bold">{getGlobalSum('deaths').toLocaleString('de-DE')}</span>
            </div>
          </div>
        </div>

        {/* 2. Dropdown für die Kategorien */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-[#8b8b8b] border-2 border-[#555] p-3">
          <label className="text-[#333] font-bold text-xs md:text-sm shrink-0" style={{ textShadow: "1px 1px 0px #fff" }}>
            Statistik wählen:
          </label>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="mc-button w-full px-2 py-2 text-xs outline-none"
          >
            {Object.entries(statCategories).map(([key, info]) => (
              <option key={key} value={key} className="bg-[#222] text-[#DDD]">
                {info.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Die Rangliste */}
        <div className="space-y-2 bg-[#111] p-4 border-4 border-[#000]">
          <div className="flex text-[#555] text-[10px] md:text-xs font-bold mb-4 pb-2 border-b-2 border-[#333] px-2">
            <div className="w-12">Rang</div>
            <div className="flex-1">Spieler</div>
            <div className="text-right">Wert</div>
          </div>

          {loading ? (
            <p className="text-[#555] text-center py-4 animate-pulse">Lade Spieler-Tabelle...</p>
          ) : currentLeaderboard.length === 0 ? (
            <p className="text-[#555] text-center py-4 text-xs">
              Noch keine Spieler in der Tabelle `player_stats` angelegt.
            </p>
          ) : (
            currentLeaderboard.map((player) => (
              <div 
                key={player.name} 
                className="flex items-center bg-[#222] border-2 border-[#333] p-2 hover:bg-[#333]"
              >
                <div className="w-12 text-[#FFAA00] font-bold text-xs md:text-sm">
                  #{player.rank}
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  <img 
                    src={`https://mc-heads.net/avatar/${player.name}/32`} 
                    alt={player.name}
                    className="w-6 h-6 md:w-8 md:h-8 border-2 border-black bg-black"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-[#DDD] text-xs md:text-sm">{player.name}</span>
                </div>
                
                <div className="text-right text-[#00AAAA] font-bold text-xs md:text-sm">
                  {player.value}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
