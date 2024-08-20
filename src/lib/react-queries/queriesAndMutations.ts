import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { createPost, createUserAccount, getRecentPosts, signInUser, signOutUser, updatePost } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost } from '@/types';
import { QUERY_KEYS } from "./queryKeys";
export const useCreateAccount=()=>{
     return useMutation({
        mutationFn: (user:INewUser)=> createUserAccount(user) 
     })
}

export const useSignInAccount =()=>{
   return useMutation({
      mutationFn: (user:{email:string, password:string}) => signInUser(user) 
   })
}

export const useSignOutAccount =()=>{
   return useMutation({
      mutationFn:signOutUser 
   })
}

export const useCreatePost =()=>{
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess:() => {
         queryClient.invalidateQueries({
            queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
         });
      },
   });
};

export const useGetRecentPOsts =()=>{
   return useQuery({
      queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
   })
}

export const useUpdatePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (post: IUpdatePost) => updatePost(post),
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
       });
     },
   });
 };