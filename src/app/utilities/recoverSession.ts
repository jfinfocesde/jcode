import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"
import { RootState } from "../store"

export function recoverSession() {
    const router = useRouter()
    const currentsession = useSelector((state: RootState) => state.session.currentSession)
     if(!currentsession){
        try {
            router.push('/')
        } catch (error) {
            
        }        
     }
    
}