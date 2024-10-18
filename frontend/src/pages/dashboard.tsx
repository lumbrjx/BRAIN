import Stats from "@/components/stats"
import Machines from "../components/machines"
import { useAuth } from "@/auth/authWrapper"
export default function dashboard() {
  const { username } = useAuth();

  return (
    <div>
        <h1 className='text-3xl font-bold'>Hello {username}</h1>
  
    </div>
  )
}
