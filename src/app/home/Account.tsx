'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { useDispatch } from 'react-redux';
import { reduxUpdateSession } from '../features/session/session';
import { HeroBullets } from './components/HeroBullets/HeroBullets';
import { reduxSetLeftSidebarLink } from '../features/leftSidebarLink/leftSidebarLink';

export default function Account({ session }: { session: Session | null }) {

  const dispatch = useDispatch()
  dispatch(reduxUpdateSession(session))
  dispatch(reduxSetLeftSidebarLink({ name: "Inicio", links: [] }))

  return (
    <>
      <HeroBullets />
    </>
  )
}