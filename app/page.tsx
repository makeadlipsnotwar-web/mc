'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [serverData, setServerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const serverIP = "BielefeldErstiServer.aternos.me"; 
  const discordLink = "https://discord.gg/NVa9HTKwQn"; 
  const aternosLink = "https://aternos.org/go/"; 

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
      .then(res => res.json())
      .then(data => {
        setServerData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setServerData({ online: false }); 
      });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="space-y-6">
      
      {/* 1. Header */}
      <div className="mc-panel p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 shrink-0 border-4 border-black bg-black">
          <img src="/logo.jpeg" alt="Server Logo" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
        </div>
        
        <div className="text-center md:text-left flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl mb-4 text-[#333] truncate" style={{ textShadow: "2px 2px 0px #fff" }}>
            Bielefeld Ersti Server
          </h1>
          <p className="text-[#555] leading-loose">
            Tach Freunde!<br/>
            <span className="text-[#00AAAA]">Lwk Sozio bester Studiengang!</span>
          </p>
        </div>
      </div>

      {/* 2. Action-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Copy IP Button - GEFIXT: overflow-hidden, truncate und w-full */}
        <button
          onClick={copyToClipboard}
          className="mc-button py-6 px-2 md:px-4 text-xs md:text-sm text-center leading-loose flex flex-col items-center justify-center overflow-hidden w-full"
        >
          <span className={copied ? "text-[#00AA00] font-bold" : "text-[#333]"}>
            {copied ? "[ IN ZWISCHENABLAGE ]" : "[ IP KOPIEREN ]"}
          </span>
          <span className="text-[#555] mt-2 text-[8px] md:text-[10px] truncate w-full px-2 block">
            {serverIP}
          </span>
        </button>

        {/* Discord Button */}
        <a
          href={discordLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mc-button py-6 px-2 md:px-4 text-xs md:text-sm text-center leading-loose flex flex-col items-center justify-center hover:bg-[#b0b0b0] overflow-hidden w-full"
        >
          <span className="text-[#5555FF] font-bold truncate w-full" style={{ textShadow: "1px 1px 0px #fff" }}>
            [ DISCORD JOINEN ]
          </span>
          <span className="text-[#555] mt-2 text-[8px] md:text-[10px] truncate w-full px-2 block">
            Voicechat & Ankündigungen
          </span>
        </a>

        {/* Aternos Start Button */}
        <a
          href={aternosLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mc-button py-4 px-2 md:px-4 text-xs text-center md:col-span-2 hover:bg-[#b0b0b0] flex flex-col items-center justify-center overflow-hidden w-full"
        >
          <span className="text-[#AA0000] font-bold mb-1 truncate w-full">[ SERVER WECKEN ]</span>
          <span className="text-[#333] text-[8px] md:text-[10px] truncate w-full px-2 block">
            Server offline? Klick hier, um ihn bei Aternos zu starten.
          </span>
        </a>
      </div>

      {/* 3. Server Status & Spielerliste */}
      <div className="mc-panel p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-[#555]">
          <h2 className="text-[#333] truncate pr-4" style={{ textShadow: "2px 2px 0px #fff" }}>Server Status</h2>
          
          {!isLoading && serverData && (
            <div className={`px-2 py-1 text-xs border-2 border-[#000] shrink-0 ${serverData.online ? 'bg-[#00AA00] text-white' : 'bg-[#AA0000] text-white'}`}>
              {serverData.online ? 'ONLINE' : 'OFFLINE'}
            </div>
          )}
        </div>
        
        {isLoading ? (
          <p className="text-[#555] animate-pulse">Pinge Server an...</p>
        ) : (
          <div className="space-y-4 text-xs md:text-sm">
            {serverData?.online ? (
              <>
                <div className="flex justify-between text-[#333]">
                  <span>Spieler online:</span>
                  <span className="text-[#00AAAA] font-bold">{serverData.players?.online || 0} / {serverData.players?.max || 20}</span>
                </div>
                
                {serverData.players?.list && serverData.players.list.length > 0 && (
                  <div className="bg-[#111] p-3 border-2 border-[#000] mt-4">
                    <p className="text-[#555] mb-2 font-bold border-b border-[#333] pb-1">Aktuell spielen:</p>
                    <div className="flex flex-wrap gap-2">
                      {serverData.players.list.map((player: string) => (
                        <span key={player} className="bg-[#222] text-[#DDD] px-2 py-1 border border-[#333]">
                          {player}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-[#555] mt-4 pt-4 border-t-2 border-[#999] border-dashed">
                  <span>Version:</span>
                  <span>{serverData.version}</span>
                </div>
              </>
            ) : (
              <p className="text-[#333] text-center py-4 leading-loose">
                Der Server schläft aktuell. Nutze den Button oben, um ihn aufzuwecken!
              </p>
            )}
          </div>
        )}
      </div>

    </main>
  );
}