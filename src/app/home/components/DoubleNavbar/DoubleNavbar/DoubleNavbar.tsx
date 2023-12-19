import { useEffect, useState } from 'react';
import { UnstyledButton, Tooltip, rem, Center } from '@mantine/core';
import {
  IconHome2,
  IconSettings,
  IconCertificate,
  IconLogout,
} from '@tabler/icons-react';
import classes from './DoubleNavbar.module.css';
import { Text } from '@mantine/core';

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store'
import {  useRouter } from 'next/navigation'
import { reduxUpdateSelectItem } from '@/app/features/selectItem/selectItem';
import { reduxChangeSidebar } from '@/app/features/sidebar/sidebar';
import { UserButton } from '../../UserButton/UserButton';


const mainLinksMockdata = [
  { icon: IconHome2, label: 'Incio', route: '/home', sisdebar: "home" },
  { icon: IconCertificate, label: 'Cursos', route: '/home/content/courses', sisdebar: "courses" },
  { icon: IconSettings, label: 'Settings', route: '/home/test2', sisdebar: "courses" },
];


export function DoubleNavbar() {
  const [active, setActive] = useState('Home');
  const [activeLink, setActiveLink] = useState('Home');
  const router = useRouter()

  const currentsession = useSelector((state: RootState) => state.session.currentSession)
  const linksMockdata = useSelector((state: RootState) => state.links.linkList)
  const dispatch = useDispatch()

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
          try {
            dispatch(reduxChangeSidebar(link.sisdebar))
            setActive(link.label)
            router.push(link.route)
          } catch (error) {
            
          }         
        }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));
    

  const links = linksMockdata.map((link, index) => (    
    <Link passHref
      className={classes.link}
      data-active={activeLink === link.label || undefined}
      href={link.path}
      onClick={async (event) => {
        event.preventDefault();
        dispatch(reduxUpdateSelectItem(index))
        setActiveLink(link.label);
      }}
      key={link.label}
    >
      {link.label}
    </Link>    
  ));


  useEffect(() => {    
    if (linksMockdata.length > 0) {
      setActiveLink(linksMockdata[0].label);
    }
  }, [linksMockdata]);


  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          {mainLinks}
          <Tooltip
            label={"Cerrar sesión"}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={''}
          >
            <form action="/api/auth/signout" method="post">
              <UnstyledButton type='submit' mt={'md'}
                className={classes.mainLink}
              >
                <IconLogout style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
              </UnstyledButton>
            </form>
          </Tooltip>
        </div>
        <div className={classes.main}>
          <Center maw={400} h={40} bg="var(--mantine-color-gray-light)">
            <Text size="lg"> {active}</Text>
          </Center>
          {links}
        </div>
      </div>
      <div className={classes.footer}>
        <UserButton
          name={currentsession?.user.user_metadata.name}
          email={currentsession?.user.email}
          avatar={currentsession?.user.user_metadata.avatar_url} />
      </div>
    </nav>
  );
}
