import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import "@code-hike/mdx/dist/index.css"
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })




export const metadata: Metadata = {
  // title: 'Create Next App',
  // description: 'Generated by create next app',
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Rajesh Prajapati" },
    {
      name: "Rajesh Prajapati",
      url: "https://www.linkedin.com/in/raazeshp96/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
