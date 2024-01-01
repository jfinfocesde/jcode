import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { Database } from './types/supabase/supabase'
//  type typeCourses = Database['public']['Tables']['groups']['Row']
// type typeUserCourses = Database['public']['Tables']['user_group']['Row']


type typeCourses = {
  check_date: boolean | null;
  course_id: string | null;
  created_at: string;
  group_id: string | null;
  id: string;
  sessions_date: string | null;
  courses: {
    created_at: string;
    description: string | null;
    folder_name: string | null;
    id: string;
    image_url: string | null;
    name: string | null;
    sessions: string | null;
  }
}

type typeGroups = {
  created_at: string;
  group_id: string | null;
  id: string;
  user_id: string | null;
  groups: {
    block_registration: boolean | null;
    code: string | null;
    created_at: string;
    description: string | null;
    id: string;
    name: string | null;
  }
}


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  let userblock = false;

  /* The code `const { data: { user } } = await supabase.auth.getUser()` is retrieving the currently
  authenticated user from the Supabase authentication service. It is using the `getUser()` method
  provided by the `supabase.auth` object to fetch the user data. The `data` property of the response
  contains the user object, and the destructuring assignment is used to extract the `user` property
  from the `data` object. */
  const {
    data: { user },
  } = await supabase.auth.getUser()


  async function adminCheck(): Promise<boolean> {
    try {
      let { data: roles, error } = await supabase
        .from('roles')
        .select("*")
        .eq('id', user?.id)
      if (error) throw error;
      if (roles && roles.length > 0) {
        if (roles[0].role == "admin")
          return true
      }
      else{
        userblock = true
      }
    } catch (error) {
      return false
    }
    return false
  }

  async function getFolderName() {
    try {
      let { data: groups, error } = await supabase
        .from('user_group')
        .select(`*,groups(*)`)
        .eq('user_id', user?.id)
      if (error) throw error;
      if (groups && groups.length > 0) {     
        const jsonGropus: typeGroups[] = groups
        let { data: courses, error } = await supabase
          .from('group_course')
          .select(`*,courses(*)`)
          .eq('group_id', jsonGropus[0].groups.id)
        if (error) throw error;
        if (courses && courses.length > 0) {
          const jsonCourses: typeCourses[] = courses        
          let folderNameCourses: string[] = []
          jsonCourses.map((course) => {
            if (course.courses.folder_name) {
              folderNameCourses.push(course.courses.folder_name)
            }
          })
          const path = req.nextUrl.pathname;
          if (path.includes('/home/content/courses/')) {
            const segments = path.split('/');
            const lastSegment = segments[segments.length - 1];
            if (!folderNameCourses.includes(lastSegment))
              userblock = true
          }
        }       
      }
    } catch (error) {
      
    }   
  }
 
  if (user) {
    const admin: boolean = await adminCheck()
    if (!admin) {
       await getFolderName()     
    }
  }

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
  matcher: ['/', '/home/:path*'],
}