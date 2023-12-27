'use client'
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PinInput,
  SimpleGrid,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase/supabase'
import { useState } from 'react';

export function ForgotPassword() {
  const supabase = createClientComponentClient<Database>()
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
    <Container size={500} my={30} mt={'xl'}>
      <Title className={classes.title} ta="center">
        REGISTRO
      </Title>
      {/* <Text c="dimmed" fz="sm" ta="center">
        Jcode
      </Text> */}

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
                REGISTRARSE CON
              </Text>

              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                showLinks={false}
                onlyThirdPartyProviders={true}
                providers={['github', 'google']}
                redirectTo={`https://jcode-khaki.vercel.app/api/auth/register?code_group=${code}`}
              // redirectTo={`http://localhost:3000/api/auth/register?code_group=${code}`}
              />
            </>
          )}

        </SimpleGrid>
      </Paper>
      {code}
    </Container>
  );
}
