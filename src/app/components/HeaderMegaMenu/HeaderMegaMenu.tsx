import {
  Group,
  Button,
  Box,
  UnstyledButton,
  Image,
  Title,
  Text,
  Container,
  Paper,
  Anchor,
  Center,
  PinInput,
  SimpleGrid,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';

import classes from './HeaderMegaMenu.module.css';
import Logo from '@/app/home/components/Logo/Logo';
import { useState } from 'react';
import { ActionToggle } from '@/app/home/components/ActionToggle/ActionToggle';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase/supabase'
import { IconCheck } from '@tabler/icons-react';
import image from '../../../../public/banner.png';

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
        <Container fluid>
          <div className={classes.inner}>

            <Center mt={100}>
              <Logo />
            </Center>

            {/* <Title ta={'center'} mt={100}>
              JCODE{' '}
            </Title> */}

            <Container p={0} size={600} mt={'md'}>
              <Text size="lg" c="dimmed" className={classes.description}>
                Solución definitiva para la documentación de código, proporcionando una plataforma intuitiva y potente para crear, gestionar y compartir documentación de manera eficiente, transformando la documentación en una experiencia agradable y fluida.
              </Text>
            </Container>

            <div className={classes.controls}>
              <Button size="md" variant="filled" color="blue" onClick={handleModeSignIn}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </Container>
      )}

      {mode == "signin" && (
        <Container size={500} mx={'auto'} mt={80} >

          <Title ta="center">Inicio de Sesión</Title>
          <Text ta="center">Acceda a su cuenta para continuar</Text>

          <Paper withBorder shadow="md" p={'lg'} mt={30} radius="md">
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
      )}

      {mode == "signup" && (
        <Container size={500} mx={'auto'} mt={80}>
          <Title ta="center">Bienvenido</Title>
          <Text ta="center">Cree su cuenta para continuar</Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <Text fw={700} size='lg' ta="center">
              CODIGO DE REGISTRO
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
      )}
    </>
  );
}
