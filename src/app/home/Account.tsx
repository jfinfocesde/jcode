'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { useDispatch } from 'react-redux';
import { reduxUpdateSession } from '../features/session/session';
import { HeroBullets } from './components/HeroBullets/HeroBullets';



export default function Account({ session }: { session: Session | null }) {

  const dispatch = useDispatch()
  dispatch(reduxUpdateSession(session))
console.log("");



  // const links: typeLink = {
  //   name: "test",
  //   links: ["Introducción", "Sesión 1", "Sesión 2"]
  // }
  // dispatch(reduxUpdateLinkList(links));
  // window.scrollTo(0, 0);

  return (
    <>
    <h1>Main</h1>
      {/* <HeroBullets /> */}
    </>
  )
}