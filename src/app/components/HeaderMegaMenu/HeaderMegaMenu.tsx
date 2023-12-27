import {
  Group,
  Button,
  Box,
  UnstyledButton,
} from '@mantine/core';

import classes from './HeaderMegaMenu.module.css';
import Logo from '@/app/home/components/Logo/Logo';
import { HeroImageRight } from '../HeroImageRight/HeroImageRight';
import { useState } from 'react';
import { AuthenticationTitle } from '../AuthenticationTitle/AuthenticationTitle';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

export function HeaderMegaMenu() {
  const [mode, setMode] = useState('main')


  function handleModeMain() {
    setMode('main')
  }
  function handleModeSignIn() {
    setMode('signin')
  }
  function handleModeSignUp() {
    setMode('signup')
  }

  return (
    <>
      <Box >
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <UnstyledButton onClick={handleModeMain}>
              <Logo />
            </UnstyledButton>;
            <Group >
              <Button
                variant="gradient"
                gradient={{ from: 'black', to: 'blue' }}
                size='xs'
                className={classes.control}
                onClick={handleModeSignIn}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
                size="xs"
                className={classes.control}
                onClick={handleModeSignUp}
              >
                Registrarse
              </Button>
            </Group>
          </Group>
        </header>
      </Box>
      {mode == "main" && (<HeroImageRight />)}
      {mode == "signin" && (<AuthenticationTitle />)}
      {mode == "signup" && (<ForgotPassword />)}
    </>
  );
}
