import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { useRouter } from 'next/navigation'

import { UserButton } from '../../UserButton/UserButton';
import { User } from '@supabase/supabase-js';
import { reduxSetLeftSidebarLink } from '@/app/features/leftSidebarLink/leftSidebarLink';
import { reduxSetSelectLink } from '@/app/features/selectLink/selectLink';
import { reduxSetRightSidebar } from '@/app/features/rightSidebar/rightSidebar';

const linksLeftSidebarIcon = [
  { icon: IconHome2, label: 'Inicio', route: '/home' },
  { icon: IconCertificate, label: 'Cursos', route: '/home/content/courses' },
  { icon: IconSettings, label: 'Administrador', route: '/home/pages/admin' },
];

export function DoubleNavbar({ onToggle, setAside }: { onToggle: () => void, setAside: Dispatch<SetStateAction<boolean>> }) {
  const [activeIcon, setActive] = useState('Inicio');
  const [activeLink, setActiveLink] = useState('Inicio');
  const router = useRouter()
  const dispatch = useDispatch()

  const [user, setUser] = useState<User | undefined>(undefined);
  const currentsession = useSelector((state: RootState) => state.Session.currentSession)
  const linksLeftSidebar = useSelector((state: RootState) => state.LeftSidebarLink.links)
  const selectSidebar = useSelector((state: RootState) => state.RightSidebar.value)

  useEffect(() => {
    if (currentsession) {
      setUser(currentsession?.user)
    }
    else {
      router.push('/home')
    }    
  }, [currentsession])

  useEffect(() => {
    if (selectSidebar == "none") {
      setAside(false)
    }
    if (selectSidebar == "courses") {
      setAside(true)
    }
  }, [selectSidebar])

  const linksIcon = linksLeftSidebarIcon.map((link) => (
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
            onToggle()
            dispatch(reduxSetRightSidebar('none'))
            switch (link.label) {
              case 'Incio':
                dispatch(reduxSetLeftSidebarLink({ name: "Inicio", links: [] }))                
                break;
              case 'Cursos':
                dispatch(reduxSetLeftSidebarLink({ name: "Cursos", links: [] }))
                break;
              case 'Administrador':
                dispatch(reduxSetLeftSidebarLink({ name: "Administrador", links: ["Grupos","Usuarios"] }))
                break;
            }
            setActive(link.label)
            router.push(link.route)
          } catch (error) {

          }
        }}
        className={classes.mainLink}
        data-active={link.label === activeIcon || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));


  const linksLS = linksLeftSidebar.links.map((link, index) => (
    <Link passHref
      className={classes.link}
      data-active={activeLink === link || undefined}
      href={'#'}
      onClick={async (event) => {
        event.preventDefault();
        onToggle()
        dispatch(reduxSetSelectLink(index))
        setActiveLink(link);
      }}
      key={link}
      >
      {link}
    </Link>
  ));


  useEffect(() => {
    if (linksLeftSidebar.name.length > 0) {
      setActiveLink(linksLeftSidebar.links[0]);
    } 
  }, [linksLeftSidebar]);

  return (
    <nav className={classes.navbar} >
      <Center maw={400} h={40} className={classes.title}>
      <Text fw={500} size="xl">{activeIcon}</Text>
        {/* <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          {activeIcon}
        </Text> */}
      </Center>
      <div className={classes.footer}>
        <UnstyledButton className={classes.user}
          onClick={() => {
            onToggle()
            router.push('/home/pages/profile')
          }}
          
          style={{borderBottom:'1px solid', borderColor:'var(--mantine-color-gray-2)', borderWidth:'2px'} } mb={2}
        >
          <UserButton 
            name={user ? user.user_metadata.name : ""}
            email={user ? user.email : ""}
            avatar={user ? user.user_metadata.avatar_url : ""} />
        </UnstyledButton>


      </div>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          {linksIcon}
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
          {linksLS}
        </div>
      </div>
    </nav>
  );
}
