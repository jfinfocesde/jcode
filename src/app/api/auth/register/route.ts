import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const code_group = searchParams.get('code_group')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()


  async function validateUser(): Promise<Boolean> {
    try {
      let { data: user_group, error } = await supabase
        .from('user_group')
        .select('*')
        .eq('user_id', user?.id)
      if (error) throw error;
      if (user_group && user_group.length > 0)
        return true
    } catch (error) {
      return false
    }
    return false
  }

  async function addUser() {
    try {
      const { data: groups, error } = await supabase
        .from('groups')
        .select("*")
        .eq('code', code_group)
        .eq('block_registration', true)
      if (error) throw error;
      if (groups && groups.length > 0) {
        await supabase
          .from('user_group')
          .insert([
            { user_id: user?.id, group_id: groups[0].id },
          ])
          .select()

        await supabase
          .from('roles')
          .insert([
            { id: user?.id, role: 'user' },
          ])

        //Agregar perfil
        if (error) throw error;
      } else {

      }
    } catch (error) {

    }
  }

  const result = await validateUser()
  if (!result) {
    addUser()
  }  

  return NextResponse.redirect(new URL('/home', req.url))
}