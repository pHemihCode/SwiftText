import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { createPost, createUserAccount, getRecentPosts, likePost, signInUser, signOutUser, updatePost, savePost, deleteSavedPost } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost } from '@/types';
import { QUERY_KEYS } from "./queryKeys";
import { getCurrentUser } from '@/lib/appwrite/api';
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

export const likedPost =()=> {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:({postId,likeArrays}:{postId:string; likeArrays:string[]}) => likePost(postId,likeArrays),
      onSuccess:(data)=>{
      queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       })
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       })
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
   }
   })
}

export const savedPost=()=>{
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:({postId,userId}:{postId:string; userId:string}) => savePost(postId,userId),
      onSuccess:()=>{
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       });queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
   }
   })
}

export const deletedPost=()=>{
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:(savedRecordId:string) => deleteSavedPost(savedRecordId),
      onSuccess:()=>{
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       });queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
   }
   })
}

export const useGetCurrentUser=()=>{
   return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn:getCurrentUser
   })
}