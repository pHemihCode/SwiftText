import { signUpSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import Logo from "../../assets/SwiftLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useCreateAccount, useSignInAccount } from '@/lib/react-queries/queriesAndMutations'
import { userContext } from '@/context/AuthContextProvider'
const SignUpForm = () => {
  const { toast } = useToast()
  const {checkUserAuth} = userContext()
  const navigate = useNavigate()
  const {mutateAsync:createUser, isPending: creatingUser} = useCreateAccount()
  const {mutateAsync:signInUser, isPending: signingInUser} = useSignInAccount()
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
       const session = await signInUser({
        email: values.email,
        password: values.password
       })
       if(!session) return toast({
        title: "Sign in failed",
       })

       const isLoggedIn = await checkUserAuth()
       if(isLoggedIn){
        form.reset();
        navigate('/')
       }else{
        toast({
          title: "Sign in failed",
         })
       }
      }
  return (
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full px-10 lg:px-0 lg:w-1/2">
        <div>
            <div className='flex flex-col justify-center items-center mb-8 h-5'>
                <img src={Logo} alt="" className='w-52 h-40'/>
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
          <FormItem className='py-1'>
            <FormLabel className='text-white'>Password</FormLabel>
            <FormControl>
              <Input type='password' className='bg-gray-900 focus border-0 text-white' {...field} />
            </FormControl>
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