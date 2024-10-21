import React, {useState, useEffect} from "react";
import { Models } from "appwrite";
import { deletedPost, likedPost, savedPost, useGetCurrentUser } from "@/lib/react-queries/queriesAndMutations";
import { checkIsLiked } from './../../lib/utils';
import likeIcon from "../../assets/like.svg";
import likedIcon from "../../assets/liked.svg"
import saveIcon from "../../assets/save.svg"
import savedIcon from "../../assets/saved.svg"
import { deleteSavedPost } from "@/lib/appwrite/api";
import Loader from "./Loader";

type PostStatProps = {
    post:Models.Document;
    userId:string
}
export const PostStats = ({post,userId}:PostStatProps) => {
    const likedPostList = post.likes.map((user: Models.Document) => user)
    const [likeList, setLikeList] = useState(likedPostList)
    const [isSaved, setSaved] = useState(false)
    const [isliked, setIsLiked] = useState(true)

    const {mutate:likePost} = likedPost()
    const {mutate:savePost,isPending:isSaving} = savedPost()
    const {mutate:deletePost, isPending:isDeleting} = deletedPost()
    const {data: currentUser} = useGetCurrentUser()

    // const savedRecord = currentUser?.save.find((record:Models.Document) => record.post.id !== post.$id)
    // useEffect(()=>{
    //   setSaved(!!savedPost)
    // },[currentUser])

    const handleLikedPost= (e:React.MouseEvent) =>{
       e.stopPropagation();
       let newLikes = [...likeList];
       const hasLiked = newLikes.includes(userId);
       if(hasLiked){
        newLikes = newLikes.filter((id) => id !== userId)
       }else{
         newLikes.push(userId)
       }
       setLikeList(newLikes);
       likePost({postId:post.$id, likeArrays:newLikes})
    }
    const handleSavedPost=(e:React.MouseEvent)=>{
       e.stopPropagation();

       if(savedRecord){
        setSaved(false)
        deleteSavedPost(savedRecord.$id)
       }else{
        savePost({postId:post.$id,userId})
        setSaved(true)
       }

    }

  return (
    <div className='flex justify-between items-center py-2'>
    <div className='flex items-center gap-2'>
        <img src={checkIsLiked(likeList,userId) ? 
            likedIcon : likeIcon
        } alt="likes" onClick={handleLikedPost}/>
        <p className="text-sm lg:text-base">{likeList.length}</p>
    </div>
    <div className="flex items-center gap-2">
      {
        isSaving || isDeleting ? <Loader /> :
        <img src={isSaved ? saveIcon: savedIcon} alt="" onClick={handleSavedPost} /> 
      }
    </div>
   </div>
  )
}
