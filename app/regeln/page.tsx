export default function Regeln() {
  return (
    <main className="space-y-6">
      
      <div className="mc-panel p-6">
        <h1 className="text-xl md:text-2xl mb-6 text-[#333]" style={{ textShadow: "2px 2px 0px #fff" }}>
          Server Regeln
        </h1>
        
        <div className="space-y-6 text-[#333] leading-loose text-sm">
          
          <div className="border-2 border-[#555] p-4 bg-[#b5b5b5]">
            <h2 className="font-bold text-[#AA0000] mb-2">§1 Kein Griefing</h2>
            <p>
              Wir sind hier, um der Uni zu entkommen, nicht um uns gegenseitig abzufucken. 
              Wer Gebäude von anderen zerstört oder Kisten klaut, fliegt ohne Vorwarnung vom Server.
            </p>
          </div>

          <div className="border-2 border-[#555] p-4 bg-[#b5b5b5]">
            <h2 className="font-bold text-[#0000AA] mb-2">§2 PvP nur nach Absprache</h2>
            <p>
              Zufälliges Umklatschen am Spawn ist uncool. Wenn ihr euch auf die Mappe hauen wollt, 
              macht das in einer Arena oder klärt das vorher im Chat.
            </p>
          </div>

          <div className="border-2 border-[#555] p-4 bg-[#b5b5b5]">
            <h2 className="font-bold text-[#00AA00] mb-2">§3 Creeper-Löcher stopfen</h2>
            <p>
              Wenn euch ein Creeper hochgeht, macht das verdammte Loch wieder zu. 
              Wir wollen hier keine Schweizer-Käse-Landschaft am Spawn. Erde reicht!
            </p>
          </div>

          <div className="border-2 border-[#555] p-4 bg-[#b5b5b5]">
            <h2 className="font-bold text-[#AA00AA] mb-2">§4 Real-Life geht vor</h2>
            <p>
              Ja, Hausarbeiten nerven, aber vergesst eure Abgaben nicht komplett. 
              Der Server läuft nicht weg (es sei denn, Aternos stoppt ihn).
            </p>
          </div>

          {/* Der neue Roleplay Paragraph */}
          <div className="border-2 border-[#555] p-4 bg-[#b5b5b5]">
            <h2 className="font-bold text-[#FFAA00] mb-2">§5 Roleplay ist erwünscht!</h2>
            <p>
              Spielt gerne eure Rollen aus! Ob ihr ein gieriger Händler seid, der überteuerte Diamanten verkauft, oder ein verrückter Eremit, der im Sumpf lebt – RP macht die Welt lebendiger. Baut Shops, verhandelt und bleibt (wenn ihr Bock habt) im Chat in eurer Rolle.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}