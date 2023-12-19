import { Box, ScrollArea } from '@mantine/core';
import { TableOfContentsFloating } from '../TableOfContentsFloating/TableOfContentsFloating';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const selectSidebar = useSelector((state: RootState) => state.sidebar.status)
  return (
    <ScrollArea w={300} scrollbars="y">
      <Box h="100%" p={'sm'}>
        {selectSidebar === 'courses' && <TableOfContentsFloating />}
        {selectSidebar === 'home' && <h1>Prueba</h1>}
      </Box>
    </ScrollArea>
  );
}
