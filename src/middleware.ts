import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type Course = {
  name: string;
  datetime: boolean;
  sessions: { title: string; datetime: string }[];
};

type typeProfile = {
  avatar_url: string | null
  block: boolean | null
  full_name: string | null
  group_id: string | null
  id: string
  updated_at: string | null
}

type typeUserCourses = {
  check_date: boolean | null
  course_id: string | null
  created_at: string
  id: string
  profile_id: string | null
  sessions_date: string | null
}


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  let userblock = false;

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
    } catch (error) {
      return false
    }
    return false
  }

  async function statusUserBlock(): Promise<boolean> {
    try {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', user?.id)
      if (error) throw error;
      if (profiles && profiles.length > 0) {
        if (profiles[0].block) {
          return true
        }
      }
    } catch (error) {
      return false
    }
    return false
  }

  async function getIdCourses(): Promise<string[]> {
    try {
      let { data: user_courses, error } = await supabase
        .from('user_courses')
        .select("*")
        .eq('profile_id', user?.id)
      if (error) throw error;
      if (user_courses && user_courses.length > 0) {
        const data: typeUserCourses[] = user_courses
        let idCourses: string[] = []
        data.map((course) => {
          if (course.course_id) {
            idCourses.push(course.course_id)
          }
        })
        return idCourses
      }
    } catch (error) {
      return []
    }
    return []
  }


  async function getNamesCourses(idCourses: string[]) {
    try {
      let { data: courses, error } = await supabase
        .from('courses')
        .select("*")
        .in('id', idCourses)
      if (error) throw error;
      if (courses && courses.length > 0) {
        const data: typeUserCourses[] = courses
        console.log(data);
      }
    } catch (error) {
      return []
    }
  }

  if (user) {
    // const admin: boolean = await adminCheck()
    // userblock = await statusUserBlock()
    // const idCourses = await getIdCourses()
    // console.log(idCourses);
    // getNamesCourses()

    // if (!admin) {
      // userblock = await statusUserBlock()

      // getCourses()


      // try {
      //   let { data: profiles, error } = await supabase
      //     .from('profiles')
      //     .select("*")
      //     .eq('id', user?.id)
      //   if (error) throw error;
      //   if (profiles && profiles.length > 0) {
      //     const userLock: boolean = profiles[0].block
      //     const colCourses = JSON.parse(profiles[0].courses)
      //     const listcourses: Course[] = colCourses.courses
      //     const courses = listcourses.map((item) => {
      //       return item.name;
      //     });
      //     if (!userLock) {
      //       const path = req.nextUrl.pathname;
      //       if (path.includes('/home/content/courses/')) {
      //         const segments = path.split('/');
      //         const lastSegment = segments[segments.length - 1];
      //         if (!courses.includes(lastSegment))
      //           userblock = true
      //       }
      //     }
      //   }
      //   else {
      //     userblock = true
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    // }
  }

  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/') {
  //   if (!userblock) {
  //     return NextResponse.redirect(new URL('/home', req.url))
  //   }    
  //   else{
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }


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