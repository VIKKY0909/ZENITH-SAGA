import './globals.css';
import { Inter, Exo_2 } from 'next/font/google';
import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import { NavigationLoadingProvider } from "@/components/NavigationLoadingProvider";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const exo = Exo_2({
  subsets: ['latin'],
  variable: '--font-anime',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zenith Saga Store | Anime & Pop Culture Merchandise',
  description: 'Discover unique anime, series, music, and sports merchandise including cards, stickers, posters, and bookmarks at Zenith Saga Store.',
  keywords: ['anime merchandise', 'manga stickers', 'pop culture', 'zenith saga', 'anime posters', 'bookmarks'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${exo.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FF6B00" />
        <style>
          {`
            :root {
              --animate-duration: 0.3s;
            }
            
            html {
              scroll-behavior: smooth;
            }
            
            body {
              overflow-x: hidden;
            }
            
            @media (prefers-reduced-motion: reduce) {
              :root {
                --animate-duration: 0s;
              }
              
              html {
                scroll-behavior: auto;
              }
              
              *, *::before, *::after {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
              }
            }
          `}
        </style>
      </head>
      <body className="font-body bg-zenith-black text-zenith-white min-h-screen">
        <NavigationLoadingProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </NavigationLoadingProvider>
      </body>
    </html>
  );
} 