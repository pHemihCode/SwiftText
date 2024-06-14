import { signInSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Logo from "../../assets/SwiftLogo.png"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
const SignInForm = () => {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email:"",
          password:"",
        },
      })
      function onSubmit(values: z.infer<typeof signInSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
 <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full px-10 lg:px-0 lg:w-1/2">
        <div>
            <div className='flex flex-col justify-center items-center mb-8 h-5'>
                <img src={Logo} alt="" className='w-52 h-40'/>
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
          <FormItem>
            <FormLabel className='text-white'>Password</FormLabel>
            <FormControl>
              <Input className="bg-gray-900 focus border-0 text-white" {...field} />
            </FormControl>
            <FormMessage className='text-[12px]'/>
          </FormItem>
        )}
      />
        </div>
      <Button type="submit" className='bg-blue-500'>Log in</Button>
    </form>
    <p className='text-sm text-center text-white py-2'>Don't have an account? <Link to='/sign-up' className='text-blue-700 font-semibold'>Sign up</Link></p>
  </Form>
  )
}

export default SignInForm