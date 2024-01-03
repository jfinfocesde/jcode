import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@mantine/core/styles.css';
import "@code-hike/mdx/dist/index.css"
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { ColorSchemeScript, MantineProvider, createTheme, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';

import 'mantine-datatable/styles.css';
import './layout.css';

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  colors: {
    // Add your color
    deepBlue: [
      "#edf0fd",
      "#d7ddf4",
      "#aab7eb",
      "#7c90e3",
      "#566fde",
      "#405ada",
      "#344fda",
      "#2741c2",
      "#2039ad",
      "#153199"
    ],
    // or replace default theme color
    blue: [
      "#edf0fd",
      "#d7ddf4",
      "#aab7eb",
      "#7c90e3",
      "#566fde",
      "#405ada",
      "#344fda",
      "#2741c2",
      "#2039ad",
      "#153199"
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});


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
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>         
            <NavigationProgress />
            <Notifications />
            {children}         
        </MantineProvider>
      </body>
    </html>
  )
}
