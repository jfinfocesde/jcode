import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  let userblock = false;

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {

    try {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', user?.id)

      if (error) throw error;

      if (profiles && profiles.length > 0) {
        userblock = profiles[0].lock
      }
      else {
        userblock = true
      }
    } catch (error) {
      console.log('Error updating the data!')
    } finally {

    }
  }


  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/') {
  //   if (!userblock) {
  //     return NextResponse.redirect(new URL('/home', req.url))
  //   }    
  //   else{
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  // }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }
  else {
    if (userblock) {
      if (req.nextUrl.pathname != '/')
        return NextResponse.redirect(new URL('/', req.url))      
    }
    else {
      return res
    }
  }


}

export const config = {
  matcher: ['/', '/home'],
}