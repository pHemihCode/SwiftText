import { signInSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Logo from "../../assets/swiftLogo.png"
import { useSignInAccount } from '@/lib/react-queries/queriesAndMutations'
import { userContext } from '@/context/AuthContextProvider'
import { FaRegEyeSlash, FaEye} from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

const SignInForm = () => {
  const { toast } = useToast()
  const {mutateAsync:signInUser, isPending: signingInUser} = useSignInAccount()
  const {checkUserAuth, isLoading} = userContext()
  const [hidePassword, setHidePassword] = useState(true)
  const navigate = useNavigate()

  const handlePassword =()=>{
    setHidePassword(prev => !prev)
  }
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email:"",
          password:"",
        },
      })
  const handleSubmit =async(values: z.infer<typeof signInSchema>) => {
        const session = await signInUser({
          email:values.email,
          password:values.password
        })
        if(!session){
          return toast({title:"Sign in failed, Please try again"})
        }
        const isLoggedIn = await checkUserAuth()
        if(isLoggedIn){
          form.reset;
          navigate('/')
        }
      }
  return (
 <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 w-full px-10 lg:px-0 lg:w-1/2">
        <div>
            <div className='flex flex-col justify-center items-center mb-8 h-5'>
                <img src={Logo} alt="" className='w-44'/>
            </div>
<FormField 
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className='py-3'>
            <FormLabel className='text-white'>Email</FormLabel>
            <FormControl>
              <Input className="bg-gray-900 focus border-0 text-white"  {...field} />
            </FormControl>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className='relative'>
            <FormLabel className='text-white'>Password</FormLabel>
            <FormControl>
              <Input type={hidePassword?'password':'text'} className="bg-gray-900 focus border-0 text-white" {...field} /> 
            </FormControl>
            <div className='absolute top-9 right-3'>
            {
              hidePassword ?  <FaRegEyeSlash onClick={handlePassword} className='text-white'/> :  <FaEye onClick={handlePassword} className='text-white'/>
            }
            </div>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />
        </div>
      <Button disabled={signingInUser} type="submit" className='bg-blue-500'>{signingInUser ? "Signing in...": "Log in"}</Button>
    </form>
    <p className='text-sm text-center text-white py-2'>Don't have an account? <Link to='/sign-up' className='text-blue-700 font-semibold'>Sign up</Link></p>
  </Form>
  )
}

export default SignInForm