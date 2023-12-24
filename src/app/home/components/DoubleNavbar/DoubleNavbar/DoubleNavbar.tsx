import { useEffect, useState } from 'react';
import { UnstyledButton, Tooltip, rem, Center} from '@mantine/core';
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
import { reduxUpdateSelectItem } from '@/app/features/selectItem/selectItem';
import { reduxChangeSidebar } from '@/app/features/sidebar/sidebar';
import { UserButton } from '../../UserButton/UserButton';
import { reduxUpdateLinkList } from '@/app/features/links/links';


const mainLinksMockdata = [
  { icon: IconHome2, label: 'Incio', route: '/home', sisdebar: "home" },
  { icon: IconCertificate, label: 'Cursos', route: '/home/content/courses', sisdebar: "courses" },
  { icon: IconSettings, label: 'Settings', route: '/home/pages/settings', sisdebar: "courses" },
];
// { onToggle }: { onToggle: () => void }

export function DoubleNavbar({ onToggle }: { onToggle: () => void }) {
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
            onToggle()
            dispatch(reduxChangeSidebar(link.sisdebar))
            switch (link.label) {
              case 'Incio':
                dispatch(reduxUpdateLinkList({ name: "Inicio", links: [""] }))
                break;
              case 'Cursos':
                dispatch(reduxUpdateLinkList({ name: "Cursos", links: ["Java", "Python", "Javascript"] }))
                break;
              case 'Settings':
                dispatch(reduxUpdateLinkList({ name: "Settings", links: [""] }))
                break;
            }
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


  const links = linksMockdata.links.map((link, index) => (
    <Link passHref
      className={classes.link}
      data-active={activeLink === link || undefined}
      href={'#'}
      onClick={async (event) => {
        event.preventDefault();
        onToggle()
        dispatch(reduxUpdateSelectItem(index))
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </Link>
  ));


  useEffect(() => {
    if (linksMockdata.name.length > 0) {
      setActiveLink(linksMockdata.links[0]);
    }
  }, [linksMockdata]);

  return (
    <nav className={classes.navbar} >
      <Center maw={400} h={40} className={classes.title}>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          {active}
        </Text>
        {/* <Text size="sm"> {active}</Text>            */}
      </Center>
      {/* <div className={classes.footer}>
        <UnstyledButton className={classes.user}
          onClick={() => {
            // onToggle()
            router.push('/home/pages/profile')
          }}
        >
          <UserButton
            name={currentsession?.user.user_metadata.name}
            email={currentsession?.user.email}
            avatar={currentsession?.user.user_metadata.avatar_url} />
        </UnstyledButton>
      </div> */}
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

          {links}
        </div>
      </div>

    </nav>
  );
}
