'use client'
import React from 'react'
import RenderMdx from '../../render'
import { typeLeftSidebarLink } from '@/app/features/leftSidebarLink/leftSidebarLink'

import Intro from './content/intro.mdx'
import Page1 from './content/sesion1.mdx'

const PAGES: JSX.Element[] = [
    <Intro />,
    <Page1 />
]

const MENU: typeLeftSidebarLink = {
    name: "Introducción a la Programación",
    links: ["Introducción", "Sesión 1"]
}

export default function page() {
  return (   
    <RenderMdx PAGES={PAGES} MENU={MENU}/>
  )
}











