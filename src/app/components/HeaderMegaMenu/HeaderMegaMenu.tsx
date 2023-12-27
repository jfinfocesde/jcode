import {
  Group,
  Button,
  Box,
  UnstyledButton,
  Overlay,
  Title,
  Text,
  Container,
  Paper,
  Anchor,
  Center,
  PinInput,
  SimpleGrid,
} from '@mantine/core';

import classes from './HeaderMegaMenu.module.css';
import Logo from '@/app/home/components/Logo/Logo';
import { useState } from 'react';
import { ActionToggle } from '@/app/home/components/ActionToggle/ActionToggle';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase/supabase'


export function HeaderMegaMenu() {
  const [mode, setMode] = useState('main')
  const supabase = createClientComponentClient<Database>()

  function handleModeMain() {
    setMode('main')
  }
  function handleModeSignIn() {
    setMode('signin')
  }
  function handleModeSignUp() {
    setMode('signup')
  }


  const [register, setRegister] = useState(false)
  const [code, setCode] = useState('')

  function handleCode(value: string) {
    setCode(value)
  }

  async function handleRegister() {

    let { data: groups, error } = await supabase
      .from('groups')
      .select("*")
      .eq('code', code)
      .eq('register', true)

    if (groups) {
      if (groups.length > 0) {
        setRegister(true)
      }
      else {
        setCode('')
      }
      console.log(groups);
    }
    if (error) {
      setRegister(false)
      setCode('')
      console.log(error);
    }
  }

  return (
    <>
      <Box >
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <UnstyledButton onClick={handleModeMain}>
              <Logo />
            </UnstyledButton>
            <ActionToggle />
          </Group>
        </header>
      </Box>
      {mode == "main" && (
        <>
          <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
              <Title className={classes.title}>
                JCODE{' '}
                <Text component="span" inherit className={classes.highlight}>
                  Documentación
                </Text>
              </Title>

              <Container size={640}>
                <Text size="lg" className={classes.description}>
                  Solución definitiva para la documentación de código, proporcionando una plataforma intuitiva y potente para crear, gestionar y compartir documentación de manera eficiente, transformando la documentación en una experiencia agradable y fluida.
                </Text>
              </Container>

              <div className={classes.controls}>
                <Button className={classes.control} variant="white" size="lg" onClick={handleModeSignIn}>
                  Iniciar Sesión
                </Button>                
              </div>
            </div>
          </div>
        </>
      )}


      {mode == "signin" && (

        <>
          <Container size={500} my={40} p={'md'}>
            <Title className={classes.title_sign} ta="center">
              INICIO DE SESIÓN
            </Title>

            <Paper withBorder shadow="md" p={'md'} mt={30} radius="md">
              <Center m={'md'}>
                <Logo />
              </Center>

              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                showLinks={false}
                onlyThirdPartyProviders={true}
                providers={['github', 'google']}
                redirectTo="https://jcode-khaki.vercel.app/api/auth/callback"
              // redirectTo="http://localhost:3000/api/auth/callback"
              />

              <Text m={'md'} c="dimmed" size="sm" ta="center" mt={5}>
                ¿Aún no tiene cuenta?{' '}
                <Anchor size="sm" component="button">
                  <UnstyledButton onClick={handleModeSignUp}>
                    Crear una cuenta
                  </UnstyledButton>
                </Anchor>
              </Text>
            </Paper>
          </Container>
        </>
      )}


      {mode == "signup" && (
        <>
          <Container size={500} my={30} mt={'xl'}>
            <Title className={classes.title_sign} ta="center">
              REGISTRO
            </Title>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <Text fw={700} size='lg' ta="center">
                CODIGO DEL GRUPO
              </Text>
              <Text c="dimmed" fz="sm" ta="center" m={'md'}>
                Solicitar al Administrador
              </Text>

              <PinInput size="xl" length={6} placeholder="" value={code} onChange={(value) => {
                handleCode(value.toUpperCase())
              }} disabled={register} />

              <SimpleGrid cols={1} verticalSpacing="md">
                <Button fullWidth mt={'md'} onClick={handleRegister} color={register ? 'green' : 'blue'}>{register ? "Validado" : "Validar"} </Button>

                {register && (
                  <>
                    <Text fw={700} size='lg' ta="center" m={0}>
                      Registrarse
                    </Text>

                    <Auth
                      supabaseClient={supabase}
                      appearance={{ theme: ThemeSupa }}
                      theme="dark"
                      showLinks={false}
                      onlyThirdPartyProviders={true}
                      providers={['github', 'google']}
                      redirectTo={`https://jcode-khaki.vercel.app/api/auth/register?code_group=${code}`}
                    // redirectTo={`http://localhost:3000/api/auth/register?code_group=${code}`}
                    />
                  </>
                )}

                <Text m={'md'} c="dimmed" size="sm" ta="center" mt={5}>
                  ¿Ya tienes una cuenta?{' '}
                  <Anchor size="sm" component="button">
                    <UnstyledButton onClick={handleModeSignIn}>
                      Iniciar Sesión
                    </UnstyledButton>
                  </Anchor>
                </Text>

              </SimpleGrid>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}
