import { ActionIcon,  Tooltip } from '@mantine/core';
import { IconArrowBarUp } from '@tabler/icons-react';

export function FabButton() {

    const scrollToTop = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    return (
        <Tooltip
            label={"Ir al inicio"}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}         
        >
            <ActionIcon
                size="sm"
                radius="sm"
                variant="filled"
                color="blue"
                onClick={scrollToTop}
                style={{ position: 'fixed', top: '80px', right: '280px', zIndex: 200 }}
            >
                <IconArrowBarUp size={12} />
            </ActionIcon>
        </Tooltip>
    );
}
