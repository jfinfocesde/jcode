import { Paper, Group, ActionIcon, Grid, Input, rem, Box, AspectRatio } from '@mantine/core';
import { IconArrowNarrowDown, IconArrowNarrowUp, IconAt, IconLink, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function EditorImage() {
    const at = <IconLink style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;

    const [url, serUrl] = useState('')

    function handleUrl(value: string) {
        serUrl(value)
    }

    return (
        <Box m={0} p={0}  >
            <Paper withBorder m={0} p={{ left: 'md', right: 'md', top: 'xs', bottom: 'xs' }} radius={0} style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Grid gutter={"xs"} justify="space-between" m={'xs'}>
                    <Grid.Col span={6}>
                        <Group>
                            <ActionIcon.Group>
                                <ActionIcon variant="default" size="md" aria-label="Gallery">
                                    <IconArrowNarrowUp style={{ width: 20 }} stroke={1.5} />
                                </ActionIcon>

                                <ActionIcon variant="default" size="md" aria-label="Settings">
                                    <IconArrowNarrowDown style={{ width: 20 }} stroke={1.5} />
                                </ActionIcon>
                            </ActionIcon.Group>
                            <ActionIcon.Group>
                                <Input placeholder="url image" size='xs' leftSection={at} onChange={(e) => {
                                    handleUrl(e.target.value)
                                }} />
                                {/* <ActionIcon variant="default" size="md" aria-label="Gallery">
                                <IconLink style={{ width: 20 }} stroke={1.5} />
                            </ActionIcon>                           */}
                            </ActionIcon.Group>
                        </Group>

                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group justify="flex-end">
                            <ActionIcon variant="default" size="md" aria-label="Likes">
                                <IconTrash style={{ width: 20 }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Paper>
            <Paper withBorder m={0} p={'md'} radius={0} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <AspectRatio ratio={1} maw={400} mx="auto">
                    <img
                        src={url}
                        alt="Panda"
                    />
                </AspectRatio>
            </Paper>
        </Box>
    );
}


