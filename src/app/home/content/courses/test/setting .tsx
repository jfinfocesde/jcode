// posts.ts
import { typeLink } from '@/app/features/links/links'
import Page1 from './content/post1.mdx'
import Page2 from './content/post2.mdx'

export const PAGES = [
    <Page1 />,
    <Page2 />
]

export const MENU: typeLink[] = [
    { label: "Introducción", path: "/home" },
    { label: "Sesión 1", path: "/home" },
    { label: "Sesión 2", path: "/home" }
]

