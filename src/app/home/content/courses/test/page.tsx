'use client'

import { MDXProvider } from "@mdx-js/react";
import { ClassAttributes, HTMLAttributes, useEffect } from "react";
import { PAGES, MENU } from './setting '
import { useDispatch, useSelector } from "react-redux";
import { reduxUpdateLinkList } from "@/app/features/links/links";
import { RootState } from "@/app/store";
import { reduxUpdateSelectItem } from "@/app/features/selectItem/selectItem";
import { recoverSession } from "@/app/utilities/recoverSession";
import { Group, Paper } from "@mantine/core";
import { FabButton } from "@/app/home/components/FabButton/FabButton";
import { Text } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
    em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...props} />
    }
}




export default function Page() {
    recoverSession()
    const selectPage = useSelector((state: RootState) => state.selectItem.status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reduxUpdateLinkList(MENU));
        dispatch(reduxUpdateSelectItem(0))
    }, [dispatch]);
    const page = PAGES[selectPage];



    const { width } = useViewportSize();
 


    return (
        <MDXProvider components={components}>
            <Paper m={-20} p={'xs'} bg="gray.2" w={{base:'100%', md:`${width - 560}px`}} style={{ position: 'fixed', zIndex: 1 }}>
                {/* Tus elementos de navegación van aquí */}
                <Group justify="space-between" h="100%">
                    <Group>
                        <Text size="sm">Python</Text>
                    </Group>
                    <Group justify="flex-end">
                        <FabButton />
                    </Group>
                </Group>
            </Paper>
            <Paper pt={50}>
                {page}
            </Paper>          
        </MDXProvider>
    );
}












