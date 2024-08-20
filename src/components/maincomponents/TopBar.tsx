import { useEffect } from 'react'
import { useSignOutAccount } from '@/lib/react-queries/queriesAndMutations'
import { LiaSignOutAltSolid } from "react-icons/lia";
import Logo from "../../assets/swiftLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '@/context/AuthContextProvider';
import { FaUserTie } from "react-icons/fa6";
const TopBar = () => {
    const {mutate:signOut , isSuccess} = useSignOutAccount()
    const {user} = userContext()
    const navigate = useNavigate()
    useEffect(() =>{
       if(isSuccess) navigate(0)
    },[isSuccess])
  return (
    <section className='flex flex-row items-center justify-between lg:hidden p-3 bg-slate-950'>
        <Link to='/'>
        
        <img src={Logo} alt="" className='w-32 rounded-full'/>
        </Link>
        <div className="flex flex-row items-center gap-2">
        <LiaSignOutAltSolid className='text-white w-6 h-6' onClick={() => signOut()}/>
        <Link to={`profile/${user.id}`}>
         {
            user.imageUrl ?  <img src={user.imageUrl } alt="" className='w-7 h-7 rounded-full'/> : <FaUserTie />
         }
        </Link>
        </div>
    </section>
  )
}

export default TopBar