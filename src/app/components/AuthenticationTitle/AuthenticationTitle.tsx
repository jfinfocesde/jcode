'use client'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase/supabase'

export function AuthenticationTitle() {

  const supabase = createClientComponentClient<Database>()

  return (
    <Container size={420} my={40}>


      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title ta="center" className={classes.title}>
          INICIAR SESIÓN
        </Title>
        
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
      </Paper>
    </Container>
  );
}
