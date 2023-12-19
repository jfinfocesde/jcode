import { useEffect, useState } from 'react';
import cx from 'clsx';
import { Box, Text, Group, rem, Tooltip } from '@mantine/core';
import {  IconCircleCheck, IconCircleDashed, IconListSearch } from '@tabler/icons-react';
import classes from './TableOfContentsFloating.module.css';
import Link from 'next/link';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';


export function TableOfContentsFloating() {
  const [active, setActive] = useState(0);
  const [links, setLinks] = useState<Link[]>([]);  

  const selectPage = useSelector((state: RootState) => state.selectItem.status)

  const headerStatus = [
    { label: 'Test', status: 'done' },
    { label: 'Encabezado 2', status: 'todo' },   
  ];

  type Link = {
    label: string;
    link: string;
    order: number;
  };

  useEffect(() => {
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const newLinks = headers.map((header, index) => ({
      label: (header as HTMLElement).innerText,
      link: `#header${index}`,
      order: parseInt(header.tagName[1]),
    }));

    headers.forEach((header, index) => {
      (header as HTMLElement).id = `header${index}`;
    });

    setLinks(newLinks);
  }, [selectPage]);

  useEffect(() => {
    const handleScroll = () => {
      const index = links.findIndex((link) => {
        const element = document.querySelector(link.link);
        return element && element.getBoundingClientRect().top >= 0;
      });
      setActive(index === -1 ? links.length - 1 : index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);
 

  const items = links.map((item, index) => {
    const status = headerStatus.find(status => status.label === item.label)?.status;  
    return (
      <Link key={item.label} href={item.link} style={{ textDecoration: 'none'}}>
        
        <Box className={cx(classes.link, { [classes.linkActive]: active === index })} style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }} >
          {item.label.length > 30 ? (
            <Tooltip label={item.label} position="right">
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                {item.order === 1 ? (status === 'done' ? <IconCircleCheck color="green" size={16} style={{ marginRight: '8px' }} /> : <IconCircleDashed color="lightgray" size={16} style={{ marginRight: '8px' }} />) : ''}
                {item.order > 1 ? '• ' : ''}
                {item.label.substring(0, 20)}...
              </Box>
            </Tooltip>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', fontWeight: item.order === 1 ? 500 : 'normal' }}>
              {item.order === 1 ? (status === 'done' ? <IconCircleCheck color="green" size={16} style={{ marginRight: '8px' }} /> : <IconCircleDashed color="lightgray" size={16} style={{ marginRight: '8px' }} />) : ''}
              {item.order > 1 ? '• ' : ''}
              {item.label}
            </Box>
          )}
        </Box>
      </Link>
    );
  });

  return (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text fw={500}>Contenido</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{ transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))` }}
        />
        {items}
      </div>
    </div>
  );
}
