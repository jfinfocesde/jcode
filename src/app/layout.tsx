import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import "@code-hike/mdx/dist/index.css"
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JDOCode',
  description: 'App doc',
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png"
  }  
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
        <NavigationProgress />
        <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
