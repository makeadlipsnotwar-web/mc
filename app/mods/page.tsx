export default function Mods() {
  return (
    <main className="space-y-6">
      
      <div className="mc-panel p-6">
        <h1 className="text-xl md:text-2xl mb-6 text-[#333]" style={{ textShadow: "2px 2px 0px #fff" }}>
          Empfohlene Mods
        </h1>
        
        <p className="text-[#555] mb-8 text-sm leading-loose">
          Ihr könnt komplett Vanilla spielen, aber mit diesen Client-Mods wird das Leben auf dem Server deutlich entspannter und lustiger. 
        </p>
        
        <div className="space-y-4 text-sm">
          
          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <h2 className="text-[#0000AA] font-bold mb-2">Simple Voice Chat</h2>
            <p className="text-[#333] leading-loose">
              Absolutes Must-Have für gutes Roleplay! Ihr könnt direkt im Spiel miteinander reden, je nachdem wie nah ihr beieinander steht (Proximity Chat).
            </p>
          </div>

          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <h2 className="text-[#00AA00] font-bold mb-2">Sodium / OptiFine</h2>
            <p className="text-[#333] leading-loose">
              Für mehr FPS und flüssigeres Spielen. Besonders zu empfehlen, wenn euer Uni-Laptop eigentlich nur für Word und Excel gedacht war.
            </p>
          </div>

          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <h2 className="text-[#AA0000] font-bold mb-2">Xaero's Minimap</h2>
            <p className="text-[#333] leading-loose">
              Eine kleine Karte in der Bildschirmecke, auf der ihr auch Wegpunkte setzen könnt. So findet ihr immer den Weg zurück zu eurer Basis.
            </p>
          </div>

          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <h2 className="text-[#AA00AA] font-bold mb-2">REI (Roughly Enough Items)</h2>
            <p className="text-[#333] leading-loose">
              Zeigt euch alle Crafting-Rezepte direkt im Inventar an. Spart euch das ständige Googeln im Minecraft Wiki.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}