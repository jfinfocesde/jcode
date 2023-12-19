'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase/supabase'


export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}      
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      onlyThirdPartyProviders={true}
      providers={['github','google']}
      redirectTo="http://localhost:3000/api/auth/callback"
    />
  )
}