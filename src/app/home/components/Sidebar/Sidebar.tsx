import { Box, ScrollArea } from '@mantine/core';
import { TableOfContentsFloating } from '../TableOfContentsFloating/TableOfContentsFloating';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

export default function Sidebar({ onToggle }: { onToggle: () => void }) {
  const selectSidebar = useSelector((state: RootState) => state.sidebar.status)
  return (
    <ScrollArea w={'auto'} scrollbars="y">
      <Box h="100%" >
        {selectSidebar === 'courses' && <TableOfContentsFloating onToggle={onToggle}/>}
        {selectSidebar === 'home' && <></>}
      </Box>
    </ScrollArea>
  );
}
