import { Paper, Group, ActionIcon, Grid, Input, rem } from '@mantine/core';
import { IconArrowNarrowDown, IconArrowNarrowUp, IconAt, IconLink, IconTrash } from '@tabler/icons-react';

function Toolbar() {
    const at = <IconLink style={{ width: rem(16), height: rem(16) }} stroke={1.5} />;
    return (
        <Paper withBorder p={{ left: 'md', right: 'md', top: 'xs', bottom: 'xs' }} radius={0} style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <Grid gutter="xs" justify="space-between" m={'xs'}>
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
                        <Input placeholder="url image" size='xs'  leftSection={at} />
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
    );
}

export default Toolbar;
