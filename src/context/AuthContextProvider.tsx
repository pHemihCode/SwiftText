import { getCurrentUser } from '@/lib/appwrite/api'
import { IContext, IUser } from '@/types'
import {createContext, useContext,useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
export const INITIAL_USER ={
   id:'',
   name:'',
   username:'',
   email:'',
   imageUrl:'',
   bio:''
}

export const INITIAL_STATE={
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: ()=>{},
    setIsAuthenticated: ()=>{},
    checkUserAuth: async()=> false as boolean,
}

const AuthContext = createContext<IContext>(INITIAL_STATE)
const AuthContextProvider = ({children}:{children: React.ReactNode}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const checkUserAuth = async() => {
    try {
      const theCurrentUser = await getCurrentUser()
      if(theCurrentUser){
        setUser({
          id:theCurrentUser.$id,
          name: theCurrentUser.name,
          username: theCurrentUser.username,
          email:theCurrentUser.email,
          imageUrl: theCurrentUser.imageUrl,
          bio: theCurrentUser.bio
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false;
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(() =>{
     if(localStorage.getItem('cookieFallback') === '[]')
     navigate('/sign-in')
     checkUserAuth()
  },[])

  const value = {
    user, 
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkUserAuth
  }
  return (
    <AuthContext.Provider value={value}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
export const userContext = () => useContext(AuthContext);
