import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Pfad evtl. anpassen, falls lib woanders liegt

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Erwartetes Format: { player: "Michel", stat: "deaths", value: 42, secret: "GEHEIM" }
    
    // Kleiner Schutz, damit nicht jeder Fake-Stats hochladen kann
    if (data.secret !== "ERSTI_GEHEIMNIS_2026") {
      return NextResponse.json({ error: "Falsches Passwort!" }, { status: 401 });
    }

    // Ab in die Datenbank damit! (Upsert überschreibt den alten Wert, wenn der Spieler stirbt)
    const { error } = await supabase
      .from('minecraft_stats')
      .upsert({ 
        player_name: data.player, 
        stat_category: data.stat, 
        stat_value: data.value 
      }, { onConflict: 'player_name, stat_category' });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Stats gespeichert!" });
    
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}