'use client'

import { MDXProvider } from "@mdx-js/react";
import { ClassAttributes, HTMLAttributes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxUpdateLinkList, typeLink } from "@/app/features/links/links";
import { RootState } from "@/app/store";
import { reduxUpdateSelectItem } from "@/app/features/selectItem/selectItem";
import { ActionIcon, Box, Group, Paper, Tooltip } from "@mantine/core";
import { Text } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import classes from './render.module.css';
import { IconArrowBarUp, IconCaretUpFilled, IconSquareArrowUp } from "@tabler/icons-react";

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
    em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...props} />
    }
}

export default function RenderMdx({ PAGES, MENU }: { PAGES: JSX.Element[], MENU: typeLink }) {

    const selectPage = useSelector((state: RootState) => state.selectItem.status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reduxUpdateLinkList(MENU));
        dispatch(reduxUpdateSelectItem(0))
    }, [dispatch]);
    const page = PAGES[selectPage];
    const { width } = useViewportSize();

    const scrollToTop = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    return (
        <MDXProvider components={components}>
            <Paper w={{ base: '100%', md: `${width - 564}px` }} className={classes.toolBar} >
                {/* Tus elementos de navegación van aquí */}
                <Group justify="space-between" h="100%">
                    <Group justify="center" ml={'lg'}>
                        <Text size="md" fw={700} variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {MENU.name}
                        </Text>
                    </Group>
                    <Group justify="flex-end" pr={'md'}>
                        <Tooltip
                            label={"Ir al inicio"}
                            position="right"
                            withArrow
                            transitionProps={{ duration: 0 }}
                        >
                            <ActionIcon
                                size="sm"
                                radius="sm"
                                variant="default"
                                color="blue"
                                onClick={scrollToTop}
                            // style={{ position: 'fixed', top: '80px', right: '280px', zIndex: 200 }}
                            >
                                <IconCaretUpFilled size={12} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </Paper>
            <Paper pl={'md'} pr={'md'} pb={'md'} pt={'xl'}>
                {page}
            </Paper>
        </MDXProvider>
    );
}












