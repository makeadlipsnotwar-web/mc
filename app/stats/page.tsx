'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

// ALLE offiziellen Custom Statistics aus dem Minecraft Wiki
const statCategories: Record<string, { label: string; unit: string }> = {
  play_time: { label: "Spielzeit", unit: " min" },
  deaths: { label: "Tode", unit: "" },
  mob_kills: { label: "Mobs getötet", unit: "" },
  player_kills: { label: "Spieler getötet", unit: "" },
  jump: { label: "Gesprungen", unit: " mal" },
  walk_one_cm: { label: "Distanz gelaufen", unit: " cm" },
  sprint_one_cm: { label: "Distanz gesprintet", unit: " cm" },
  crouch_one_cm: { label: "Distanz geschlichen", unit: " cm" },
  swim_one_cm: { label: "Distanz geschwommen", unit: " cm" },
  walk_on_water_one_cm: { label: "Auf Wasser gelaufen", unit: " cm" },
  walk_under_water_one_cm: { label: "Unter Wasser gelaufen", unit: " cm" },
  fall_one_cm: { label: "Distanz gefallen", unit: " cm" },
  climb_one_cm: { label: "Distanz geklettert", unit: " cm" },
  fly_one_cm: { label: "Distanz geflogen", unit: " cm" },
  aviate_one_cm: { label: "Mit Elytra geflogen", unit: " cm" },
  boat_one_cm: { label: "Distanz im Boot", unit: " cm" },
  minecart_one_cm: { label: "Distanz im Minecart", unit: " cm" },
  horse_one_cm: { label: "Distanz auf Pferd", unit: " cm" },
  pig_one_cm: { label: "Distanz auf Schwein", unit: " cm" },
  strider_one_cm: { label: "Distanz auf Schreiter", unit: " cm" },
  damage_dealt: { label: "Schaden ausgeteilt", unit: " HP" },
  damage_dealt_absorbed: { label: "Schaden ausgeteilt (absorbiert)", unit: " HP" },
  damage_dealt_resisted: { label: "Schaden ausgeteilt (widerstanden)", unit: " HP" },
  damage_taken: { label: "Schaden eingesteckt", unit: " HP" },
  damage_blocked_by_shield: { label: "Schaden mit Schild geblockt", unit: " HP" },
  damage_absorbed: { label: "Schaden absorbiert", unit: " HP" },
  damage_resisted: { label: "Schaden widerstanden", unit: " HP" },
  animals_bred: { label: "Tiere vermehrt", unit: "" },
  fish_caught: { label: "Fische gefangen", unit: "" },
  talked_to_villager: { label: "Mit Villagern geredet", unit: " mal" },
  traded_with_villager: { label: "Mit Villagern gehandelt", unit: " mal" },
  raid_trigger: { label: "Überfälle ausgelöst", unit: "" },
  raid_win: { label: "Überfälle gewonnen", unit: "" },
  sleep_in_bed: { label: "Im Bett geschlafen", unit: " mal" },
  time_since_death: { label: "Zeit seit letztem Tod", unit: " min" },
  time_since_rest: { label: "Zeit seit letztem Schlaf", unit: " min" },
  sneak_time: { label: "Zeit geschlichen", unit: " min" },
  total_world_time: { label: "Zeit in der Welt", unit: " min" },
  leave_game: { label: "Spiel verlassen", unit: " mal" },
  drop: { label: "Items gedroppt", unit: "" },
  eat_cake_slice: { label: "Kuchenstücke gegessen", unit: "" },
  enchant_item: { label: "Items verzaubert", unit: "" },
  bell_ring: { label: "Glocke geläutet", unit: " mal" },
  target_hit: { label: "Zielblock getroffen", unit: " mal" },
  open_chest: { label: "Truhen geöffnet", unit: "" },
  open_enderchest: { label: "Endertruhen geöffnet", unit: "" },
  open_barrel: { label: "Fässer geöffnet", unit: "" },
  open_shulker_box: { label: "Shulkerkisten geöffnet", unit: "" },
  trigger_trapped_chest: { label: "Redstone-Truhen ausgelöst", unit: "" },
  interact_with_crafting_table: { label: "Werkbank benutzt", unit: " mal" },
  interact_with_furnace: { label: "Ofen benutzt", unit: " mal" },
  interact_with_blast_furnace: { label: "Schmelzofen benutzt", unit: " mal" },
  interact_with_smoker: { label: "Räucherofen benutzt", unit: " mal" },
  interact_with_anvil: { label: "Amboss benutzt", unit: " mal" },
  interact_with_enchanting_table: { label: "Zaubertisch benutzt", unit: " mal" },
  interact_with_brewingstand: { label: "Braustand benutzt", unit: " mal" },
  interact_with_beacon: { label: "Leuchtfeuer benutzt", unit: " mal" },
  interact_with_campfire: { label: "Lagerfeuer benutzt", unit: " mal" },
  interact_with_cartography_table: { label: "Kartentisch benutzt", unit: " mal" },
  interact_with_grindstone: { label: "Schleifstein benutzt", unit: " mal" },
  interact_with_lectern: { label: "Lesepult benutzt", unit: " mal" },
  interact_with_loom: { label: "Webstuhl benutzt", unit: " mal" },
  interact_with_smithing_table: { label: "Schmiedetisch benutzt", unit: " mal" },
  interact_with_stonecutter: { label: "Steinsäge benutzt", unit: " mal" },
  inspect_dispenser: { label: "Werfer durchsucht", unit: " mal" },
  inspect_dropper: { label: "Spender durchsucht", unit: " mal" },
  inspect_hopper: { label: "Trichter durchsucht", unit: " mal" },
  fill_cauldron: { label: "Kessel gefüllt", unit: " mal" },
  use_cauldron: { label: "Wasser aus Kessel genommen", unit: " mal" },
  clean_armor: { label: "Lederrüstung gewaschen", unit: " mal" },
  clean_banner: { label: "Banner gewaschen", unit: " mal" },
  clean_shulker_box: { label: "Shulkerkiste gewaschen", unit: " mal" },
  pot_flower: { label: "Blumen eingetopft", unit: "" },
  play_noteblock: { label: "Notenblöcke gespielt", unit: "" },
  tune_noteblock: { label: "Notenblöcke gestimmt", unit: "" },
  play_record: { label: "Schallplatten abgespielt", unit: "" }
};

export default function Stats() {
  const [activeTab, setActiveTab] = useState<string>('deaths');
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadStats();
  }, []);

  // Summiert eine Spalte über alle Spieler hinweg (ignoriert null/undefined)
  const getGlobalSum = (column: string) => {
    return players.reduce((sum, player) => sum + Number(player[column] || 0), 0);
  };

  // Sortiert alle Spieler, auch wenn der Wert 0 ist
  const currentLeaderboard = [...players]
    .sort((a, b) => Number(b[activeTab] ?? 0) - Number(a[activeTab] ?? 0))
    .map((player, index) => ({
      rank: index + 1,
      name: player.player_name,
      value: `${Number(player[activeTab] ?? 0).toLocaleString('de-DE')}${statCategories[activeTab]?.unit || ''}`
    }));

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
              <span className="text-[#DDD] font-bold">{getGlobalSum('play_time').toLocaleString('de-DE')} min</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Tode Gesamt</span>
              <span className="text-[#AA0000] font-bold">{getGlobalSum('deaths').toLocaleString('de-DE')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Mobs Getötet</span>
              <span className="text-[#00AA00] font-bold">{getGlobalSum('mob_kills').toLocaleString('de-DE')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Gesprungen</span>
              <span className="text-[#DDD] font-bold">{getGlobalSum('jump').toLocaleString('de-DE')} mal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Distanz Gelaufen</span>
              <span className="text-[#DDD] font-bold">{getGlobalSum('walk_one_cm').toLocaleString('de-DE')} cm</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#555]">Villager-Handel</span>
              <span className="text-[#FFAA00] font-bold">{getGlobalSum('traded_with_villager').toLocaleString('de-DE')}</span>
            </div>
          </div>
        </div>

        {/* 2. Dropdown für alle Kategorien */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-[#8b8b8b] border-2 border-[#555] p-3">
          <label className="text-[#333] font-bold text-xs md:text-sm shrink-0" style={{ textShadow: "1px 1px 0px #fff" }}>
            Statistik wählen ({Object.keys(statCategories).length}):
          </label>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="mc-button w-full px-2 py-2 text-xs outline-none"
          >
            {Object.entries(statCategories).map(([key, info]) => (
              <option key={key} value={key} className="bg-[#222] text-[#DDD]">
                {info.label} ({key})
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