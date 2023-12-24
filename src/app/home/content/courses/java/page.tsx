// 'use client'

// import { MDXProvider } from "@mdx-js/react";
// import { ClassAttributes, HTMLAttributes, useEffect } from "react";
// import { PAGES, MENU } from './setting '
// import { useDispatch, useSelector } from "react-redux";
// import { reduxUpdateLinkList } from "@/app/features/links/links";
// import { RootState } from "@/app/store";
// import { reduxUpdateSelectItem } from "@/app/features/selectItem/selectItem";
// import { recoverSession } from "@/app/utilities/recoverSession";
// import { Group, Paper } from "@mantine/core";
// import { FabButton } from "@/app/home/components/FabButton/FabButton";
// import { Text } from '@mantine/core';
// import { useViewportSize } from "@mantine/hooks";

// /** @type {import('mdx/types.js').MDXComponents} */
// const components = {
//     em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
//         return <i {...props} />
//     }
// }

// export default function Page() {
//     recoverSession()   
//     const selectPage = useSelector((state: RootState) => state.selectItem.status)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(reduxUpdateLinkList(MENU));
//         dispatch(reduxUpdateSelectItem(0))
//     }, [dispatch]);
//     const page = PAGES[selectPage];

//     const { width } = useViewportSize();

//     return (
//         <MDXProvider components={components}>
//             <Paper  withBorder w={{base:'100%', md:`${width - 566}px`}} h={40} style={{ position: 'fixed', zIndex: 1 }}>
//                 {/* Tus elementos de navegación van aquí */}
//                 <Group justify="space-between" h="100%">
//                     <Group justify="center" ml={'lg'}>
//                         <Text size="md" >{MENU.name}</Text>
//                     </Group>
//                     <Group justify="flex-end" pr={'md'}>
//                         <FabButton />
//                     </Group>
//                 </Group>
//             </Paper>
//             <Paper pl={'md'} pr={'md'} pb={'md'} pt={'xl'}>
//                 {page}
//             </Paper>          
//         </MDXProvider>
//     );
// }

'use client'
import React from 'react'
import RenderMdx from '../../render'
import { typeLink } from '@/app/features/links/links'

import Intro from './content/intro.mdx'
import Page1 from './content/sesion1.mdx'

const PAGES: JSX.Element[] = [
    <Intro />,
    <Page1 />
]

const MENU: typeLink = {
    name: "Introducción a la Programación",
    links: ["Introducción", "Sesión 1"]
}

export default function page() {
  return (
   
    <RenderMdx PAGES={PAGES} MENU={MENU}/>
  )
}











