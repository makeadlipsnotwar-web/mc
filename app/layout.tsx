import './globals.css'
import Link from 'next/link'
import { Press_Start_2P } from 'next/font/google'

// Lade die Pixel-Font
const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Bielefeld Ersti Server',
  description: 'Minecraft Server',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${pixelFont.className} min-h-screen text-sm`}>
        
        {/* Minecraft Menü-Leiste */}
        <nav className="p-4 flex flex-wrap gap-4 justify-center bg-black/50 border-b-4 border-black">
          <Link className="mc-button px-4 py-2 hover:bg-[#d6d6d6]" href="/">
            Start
          </Link>
          <Link className="mc-button px-4 py-2 hover:bg-[#d6d6d6]" href="/lore">
            Lore
          </Link>
          <Link className="mc-button px-4 py-2 hover:bg-[#d6d6d6]" href="/stats">
            Stats
          </Link>
          <Link className="mc-button px-4 py-2 hover:bg-[#d6d6d6]" href="/regeln">
            Regeln
          </Link>
          {/* Hier ist der neue Mods-Button */}
          <Link className="mc-button px-4 py-2 hover:bg-[#d6d6d6]" href="/mods">
            Mods
          </Link>
        </nav>

        {/* Content-Bereich */}
        <div className="p-4 md:p-8 max-w-4xl mx-auto mt-8">
          {children}
        </div>
        
      </body>
    </html>
  )
}