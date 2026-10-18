import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Webhook-Plugins schicken die Daten als JSON
    const body = await request.json();
    
    // Discord-Webhooks packen den Text immer in "content" oder "embeds"
    const message = body.content || JSON.stringify(body);
    
    // Hier können wir im Terminal (Codespaces) sehen, was Minecraft uns funkt!
    console.log("🔔 INCOMING MINECRAFT EVENT:", message);

    // TODO für gleich: Hier filtern wir den Text (z.B. "Michel died") 
    // und schicken das an Supabase für die Stats & Lore!

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Empfangen" }, { status: 500 });
  }
}