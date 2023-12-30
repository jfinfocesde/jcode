'use client'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useDispatch, useSelector } from 'react-redux';
import { reduxUpdateSession } from '../features/session/session';
import { HeroBullets } from './components/HeroBullets/HeroBullets';
import { reduxSetLeftSidebarLink } from '../features/leftSidebarLink/leftSidebarLink';

import { useEffect } from 'react';
import { Database } from '@/types/supabase/supabase';
import { RootState } from '../store';
import { reduxSetProfile } from '../features/profile/profile';


type Course = {
  name: string;
  datetime: boolean;
  sessions: { title: string; datetime: string }[];
};

export default function Account({ session }: { session: Session | null }) {

  const dispatch = useDispatch()
  dispatch(reduxUpdateSession(session))
  dispatch(reduxSetLeftSidebarLink({ name: "Inicio", links: [] }))

  const supabase = createClientComponentClient<Database>()
  const currentsession = useSelector((state: RootState) => state.Session.currentSession)
  const profile = useSelector((state: RootState) => state.Profile.value)

  // useEffect(() => {
  //   async function getInitialdata() {
  //     if (currentsession) {
  //       try {
  //         let { data: profiles, error } = await supabase
  //           .from('profiles')
  //           .select("*")
  //           .eq('id', currentsession.user?.id)

  //         if (error) throw error;

  //         if (profiles && profiles.length > 0) {
  //           const data = JSON.stringify(profiles[0])
  //           if (data) {
  //             // console.log(data);
  //             dispatch(reduxSetProfile(data))
  //           }
  //         }
  //         else {

  //         }
  //       } catch (error) {

  //       } finally {

  //       }
  //     }
  //   }
  //   getInitialdata()
  // }, [])


  // useEffect(() => {
  //   async function getCourses() {
  //     if (profile) {
  //       const json = JSON.parse(profile)        
  //       const listcourses = json.courses
  //       const listcourses2:Course = JSON.parse(json.courses)

  //       console.log("jf---------------");
        
  //       const coursesArray = listcourses2.map((item: { name: any; }) => {
  //         return item.name;
  //       });

  //       console.log(coursesArray);
  //       // try {
  //       //   let { data: courses, error } = await supabase
  //       //     .from('courses')
  //       //     .select("*")
  //       //     .in("route", coursesArray)
  //       //   if (error) throw error;
  //       //   if (courses && courses.length > 0) {
  //       //     // const listOfCourses = courses.map((item) => {
  //       //     //   const temp: typeArticleCard = {
  //       //     //     title: item.name,
  //       //     //     description: item.description,
  //       //     //     folder_name: item.folder_name,
  //       //     //     image_url: item.image_url
  //       //     //   }
  //       //     //   return temp
  //       //     // })
  //       //     console.log("jf---------------");
  //       //     console.log(courses);
  //       //     // setCourses(data)
  //       //   }
  //       //   else {

  //       //   }
  //       // } catch (error) {

  //       // }
  //     }
  //   }
  //   getCourses();

  // }, [profile])

  return (
    <>
      {profile}
      <HeroBullets />
    </>
  )
}