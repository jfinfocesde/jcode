'use client'
import React from 'react'
import EditorMDX from './components/editor'
import { Group, Paper, SimpleGrid ,Text} from '@mantine/core'
import { FabButton } from '../components/FabButton/FabButton'
import { useViewportSize } from "@mantine/hooks";


export default function page() {

    const { width } = useViewportSize();
    return (
        <>
            <Paper withBorder m={-1} w={{ base: '100%', md: `${width - 564}px` }} h={40} style={{ position: 'fixed', zIndex: 500 }}>
                {/* Tus elementos de navegación van aquí */}
                <Group justify="space-between" h="100%">
                    <Group justify="center" ml={'lg'}>
                        <Text size="md" ></Text>
                    </Group>
                    <Group justify="flex-end" pr={'md'}>
                        <FabButton />
                    </Group>
                </Group>
            </Paper>
            <SimpleGrid cols={1} spacing="sm" verticalSpacing="sm" pl={'sm'} pr={'sm'} pb={'sm'} pt={50}>
                <EditorMDX />
                <EditorMDX />
                <EditorMDX />
                <EditorMDX />
                <EditorMDX />
                <EditorMDX />
            </SimpleGrid>
        </>
    )
}
