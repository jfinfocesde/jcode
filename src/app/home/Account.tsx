'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { useDispatch } from 'react-redux';
import { reduxUpdateSession } from '../features/session/session';
import { HeroBullets } from './components/HeroBullets/HeroBullets';

export default function Account({ session }: { session: Session | null }) {

  const dispatch = useDispatch()
  dispatch(reduxUpdateSession(session))



  // const supabase = createClientComponentClient<Database>()

  // const [fullname, setFullname] = useState<string | null>(null)
  // const [username, setUsername] = useState<string | null>(null)
  // const [website, setWebsite] = useState<string | null>(null)
  // const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  // const user = session?.user

  // const getProfile = useCallback(async () => {
  //   try {
  //     if (user) {


  //       const { data, error, status } = await supabase
  //         .from('profiles')
  //         .select(`full_name, username, website, avatar_url`)
  //         .eq('id', user?.id)
  //         .single()

  //       if (error && status !== 406) {
  //         console.log(error);

  //         throw error
  //       }

  //       if (data) {
  //         setFullname(data.full_name)
  //         setUsername(data.username)
  //         setWebsite(data.website)
  //         setAvatarUrl(data.avatar_url)
  //       }
  //       else {
  //         try {
  //           const { error } = await supabase.from('profiles').upsert({
  //             id: user?.id as string,
  //             full_name: "",
  //             username,
  //             website,
  //             avatar_url:user.user_metadata.avatar_url,
  //             updated_at: new Date().toISOString(),
  //           })
  //           if (error) throw error
  //           alert('Profile updated!')
  //         } catch (error) {
  //           alert('Error updating the data!')
  //         } finally {

  //         }
  //       }
  //     }
  //   } catch (error) {
  //     alert('Error loading user data!')
  //   } finally {

  //   }
  // }, [user, supabase])

  // useEffect(() => {
  //   getProfile()
  // }, [user, getProfile])


  // async function updateProfile({
  //   username,
  //   website,
  //   avatar_url,
  // }: {
  //   username: string | null
  //   fullname: string | null
  //   website: string | null
  //   avatar_url: string | null
  // }) {
  //   try {

  //     const { error } = await supabase.from('profiles').upsert({
  //       id: user?.id as string,
  //       full_name: fullname,
  //       username,
  //       website,
  //       avatar_url,
  //       updated_at: new Date().toISOString(),
  //     })
  //     if (error) throw error
  //     alert('Profile updated!')
  //   } catch (error) {
  //     alert('Error updating the data!')
  //   } finally {

  //   }
  // }



  // const links: typeLink = {
  //   name: "test",
  //   links: ["Introducción", "Sesión 1", "Sesión 2"]
  // }
  // dispatch(reduxUpdateLinkList(links));
  // window.scrollTo(0, 0);

  return (
    <>      
      <HeroBullets />
    </>
  )
}