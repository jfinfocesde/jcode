import React from 'react'
import RenderMdx from '../../render'
import { typeLeftSidebarLink } from '@/app/features/leftSidebarLink/leftSidebarLink'

import Page1 from './content/post1.mdx'
import Page2 from './content/post2.mdx'
import Page3 from './content/post3.mdx'

const PAGES = [
  <Page1 />,
  <Page2 />,
  <Page3 />
]

const MENU: typeLeftSidebarLink = {
  name: "Python",
  links: ["Introducción", "Sesión 1", "Sesión 2"]
}

export default function page() {
  return (
    <RenderMdx PAGES={PAGES}  />
  )
}










