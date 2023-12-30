import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'




export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const code_group = searchParams.get('code_group')
  console.log(code_group);
  console.log(code_group);

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  try {
    let { data: groups, error } = await supabase
      .from('groups')
      .select("*")
      .eq('code', code_group)
      .eq('block_registration', true)
    if (error) throw error;

    if (groups && groups.length > 0) {
      console.log('El code_group existe');

      let { data: profiles, error } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', user?.id)

      if (error) throw error;

      if (profiles && profiles.length > 0) {
        console.log('Usuario registrado');
      }
      else {
        try {
          const { error } = await supabase.from('profiles').upsert({
            id: user?.id,
            full_name: user?.user_metadata.full_name,
            avatar_url: user?.user_metadata.avatar_url,
            block: false,           
            group_id: groups[0].id,
            updated_at: new Date().toISOString(),
          })
          if (error) {
            console.log(error);
          }
          console.log('Profile updated!')
        } catch (error) {
          console.log('Error updating the data!')
        } finally {

        }
      }
    } else {
      console.log('El code_group no existe');
    }
  } catch (error) {
    console.error('Ocurrió un error al realizar la consulta:', error);
  }

  return NextResponse.redirect(new URL('/home', req.url))
}