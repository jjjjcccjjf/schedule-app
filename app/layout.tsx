import './globals.css'
import '../node_modules/nes.css/css/nes.min.css'
import { Press_Start_2P } from 'next/font/google'
import Nav from '@/components/Nav'

const pressStart2p = Press_Start_2P({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Schedule App -- BSBA-HRM 3-4N',
  description: 'Made with ❤️ by endan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${pressStart2p.className} bg-black`}>
        <div className="container bg-[#222529] max-w-xl mx-auto px-6 py-6">
          <Nav></Nav>
          {children}
        </div>
      </body>
    </html>
  )
}
