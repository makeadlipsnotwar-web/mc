export default function Lore() {
  return (
    <main className="space-y-6">
      
      <div className="mc-panel p-6">
        <h1 className="text-xl md:text-2xl mb-6 text-[#333]" style={{ textShadow: "2px 2px 0px #fff" }}>
          Welten-Chronik
        </h1>
        
        <p className="text-[#555] mb-8 text-sm leading-loose">
          Die historischen Aufzeichnungen unserer Zivilisation. 
          (Sobald die KI angebunden ist, wird das hier automatisch geschrieben).
        </p>
        
        <div className="space-y-4">
          
          {/* Eintrag 1 */}
          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <p className="text-xs text-[#00AAAA] mb-2 font-bold">[ TAG 3 - Das große Sterben ]</p>
            <p className="text-[#333] text-sm leading-loose">
              Eine scheinbar harmlose Expedition in den Nether endete in einer absoluten 
              Katastrophe. Drei volle Sets Eisenrüstung gingen in der Lava verloren, 
              als ein Ghast die Brücke wegsprengte. Die Moral ist an einem Tiefpunkt.
            </p>
          </div>

          {/* Eintrag 2 */}
          <div className="border-4 border-[#000] p-4 bg-[#a0a0a0]">
            <p className="text-xs text-[#00AAAA] mb-2 font-bold">[ TAG 1 - Die Gründung ]</p>
            <p className="text-[#333] text-sm leading-loose">
              Die ersten Erstis sind gespawnt. Während einige sofort begannen, 
              Bäume mit bloßen Händen zu fällen, baute eine andere Gruppe einen extrem 
              hässlichen Turm aus Erde, um sich vor Zombies zu verstecken. Der Grundstein ist gelegt.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}