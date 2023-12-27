'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { useDispatch } from 'react-redux';
import { reduxUpdateSession } from '../features/session/session';
import { HeroBullets } from './components/HeroBullets/HeroBullets';

export default function Account({ session }: { session: Session | null }) {

  const dispatch = useDispatch()
  dispatch(reduxUpdateSession(session))
  
  return (
    <>      
      <HeroBullets />
    </>
  )
}