import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../ui/FileUploader"
import { PostSchema } from "@/lib/validation"
import { Models } from "appwrite"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast";
import { userContext } from "@/context/AuthContextProvider"
import { useCreatePost, useUpdatePost } from "@/lib/react-queries/queriesAndMutations"
type PostProps ={
    post?:Models.Document;
    action: "Create" | "Update";
}

const PostForm = ({post, action} : PostProps) => {
    const navigate = useNavigate()
    const { toast } = useToast();
    const {user} = userContext()
    const [submitting, setSubmitting] = useState(true)
console.log(`This is the response from Post form ${post}`)
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
          caption: post ? post?.caption: '',
          file:[],
          location:post ? post?.location: '',
          tags:post ? post.tags.join(',') : ''
        }})
    
    const handleSubmit = async(values: z.infer<typeof PostSchema>)=>{
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)
            if (post && action === "Update") {
              const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
              });
              if (!updatedPost) {
                toast({
                  title: `${action} post failed. Please try again.`,
                });
              }
              return navigate(`/posts/${post.$id}`);
            }
        
            // ACTION = CREATE
            const newPost = await createPost({
              ...values,
              userId: user.id,
            });
            
            if (newPost) {
              navigate("/");
            }else{
              toast({
                title: `${action} post failed. Please try again.`,
              });
            }
           
          }

  return (
    <Form {...form} >
    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-5xl flex flex-col gap-9">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caption</FormLabel>
            <FormControl>
             <Textarea className='bg-gray-900 focus border-0 text-white w-full outline-none' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Photos</FormLabel>
            <FormControl>
             <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Location</FormLabel>
            <FormControl>
             <Input className='bg-gray-900 focus border-0 text-white w-full outline-none ' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Tags (Separated by ",")</FormLabel>
            <FormControl>
             <Input className='bg-gray-900 focus border-0 text-white w-full outline-none' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex flex-row items-center gap-6 justify-end mb-5'>
      <Button type="submit" className='bg-red-600'>Cancel</Button>  
      <Button type="submit" disabled={!submitting} className='bg-blue-500'>Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default PostForm