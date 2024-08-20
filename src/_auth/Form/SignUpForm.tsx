import { useState } from 'react'
import { signUpSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaRegEyeSlash, FaEye} from "react-icons/fa";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Logo from "../../assets/swiftLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useCreateAccount} from '@/lib/react-queries/queriesAndMutations'

const SignUpForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [hidePassword, setHidePassword] = useState(true)
  const handlePassword =()=>{
    setHidePassword(prev => !prev)
  }
  const {mutateAsync:createUser, isPending: creatingUser} = useCreateAccount() 
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          name:"",
          username: "",
          email:"",
          password:"",
        },
      })
      async function onSubmit(values: z.infer<typeof signUpSchema>) {
        const newUser = await createUser(values)
        if(!newUser) return toast({
          title: "Sign up failed",
        });
        navigate('/sign-in')
      }
  return (
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full px-10 lg:px-0 lg:w-1/2">
        <div>
            <div className='flex flex-col justify-center items-center mb-8 h-5'>
                <img src={Logo} alt="" className='w-44'/>
            </div>
        <h1 className='text-white text-base text-center font-bold'>Create a new account</h1>
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='py-1'>
            <FormLabel className='text-white'>Full Name</FormLabel>
            <FormControl>
              <Input type='text' className='bg-gray-900 focus border-0 text-white' {...field} />
            </FormControl>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className='py-1'>
            <FormLabel className='text-white'>Username</FormLabel>
            <FormControl>
              <Input type='text' className='bg-gray-900 focus border-0 text-white' {...field} />
            </FormControl>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className='py-1'>
            <FormLabel className='text-white'>Email</FormLabel>
            <FormControl>
              <Input type='email' className='bg-gray-900 focus border-0 text-white'  {...field} />
            </FormControl>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className='py-1 relative'>
            <FormLabel className='text-white'>Password</FormLabel>
            <FormControl>
              <Input  type={hidePassword?'password':'text'} className='bg-gray-900 focus border-0 text-white' {...field} />
            </FormControl>
            <div className='absolute top-10 right-3'>
            {
              hidePassword ?  <FaRegEyeSlash onClick={handlePassword} className='text-white'/> :  <FaEye onClick={handlePassword} className='text-white'/>
            }
            </div>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />
        </div>
      <Button type="submit" className='bg-blue-500'>
        {
          creatingUser ? (
            <div>
              Loading
            </div>
          ): 
          (
            <div>
              Sign up
            </div>
          )
        }
      </Button>
    </form>
    <p className='text-sm text-center text-white py-2'>Already have an account? <Link to='/sign-in' className='text-blue-700 font-semibold'>Log in</Link></p>
  </Form>
  )
}

export default SignUpForm