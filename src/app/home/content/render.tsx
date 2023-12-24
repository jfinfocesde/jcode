'use client'

import { MDXProvider } from "@mdx-js/react";
import { ClassAttributes, HTMLAttributes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxUpdateLinkList, typeLink } from "@/app/features/links/links";
import { RootState } from "@/app/store";
import { reduxUpdateSelectItem } from "@/app/features/selectItem/selectItem";
import { recoverSession } from "@/app/utilities/recoverSession";
import { Group, Paper } from "@mantine/core";
import { FabButton } from "@/app/home/components/FabButton/FabButton";
import { Text } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import classes from './render.module.css';

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
    em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...props} />
    }
}

export default function RenderMdx({ PAGES, MENU }: { PAGES: JSX.Element[], MENU: typeLink }) {
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
            <Paper  w={{ base: '100%', md: `${width - 564}px` }}  className={classes.toolBar}>
                {/* Tus elementos de navegación van aquí */}
                <Group justify="space-between" h="100%">
                    <Group justify="center" ml={'lg'}>
                        <Text size="md" fw={700} variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>{MENU.name}</Text>
                    </Group>
                    <Group justify="flex-end" pr={'md'}>
                        <FabButton />
                    </Group>
                </Group>
            </Paper>
            <Paper pl={'md'} pr={'md'} pb={'md'} pt={'xl'}>
                {page}
            </Paper>
        </MDXProvider>
    );
}












