import { useState } from 'react';
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import { multiFormatDateString } from './../../lib/utils';
import { FaRegEdit } from "react-icons/fa";
import { userContext } from '@/context/AuthContextProvider';
import { FcLike } from "react-icons/fc";
import { CiSaveDown2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
type PostCardProps ={
    post: Models.Document
}
function PostCard({post}: PostCardProps) {
    const {user} = userContext()
    const [liked, setLiked] = useState(false)
    console.log(`This is Post card ${post}`)
  return (
    <div className='post-card text-xs md:text-md lg:text-base bg-slate-900 w-full rounded-md p-3'>
        <div className='flex w-full justify-between'>
            <div className='flex flex-row  items-center gap-2 w-full'>
                <Link to={`/profile/${post.creator.$id}`}>
                   <img src={post?.creator?.imageUrl} alt="" className='rounded-full w-12 lg:w-14'/>
                </Link>
                <div className='flex flex-col gap-1 w-full'>
                    <p className='font-bold'>
                        {post.creator.name}
                    </p>
                    <div className='flex gap-2 w-full opacity-50 text-[0.7rem]'>
                        <p className='italic'>
                            {multiFormatDateString(post.$createdAt)}
                        </p>
                        -
                        <p>
                            {post.location}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.id ? 'bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center':"hidden"}`}>
            <FaRegEdit className='text-lg text-slate-500' />
            </Link>
        </div>
        <Link to={`/post/${post.$id}`} className='w-full'>
        <p className='font-bold mt-5'>{post.caption}</p>
        <ul className='flex gap-1 py-2'>
          {post.tags.map((tag:string) => (
                <li key={tag}>
                    {`${tag}`}
                </li>
          ))}
        </ul>
        </Link>
       <div className='flex w-full'>
       <img src={post.imageUrl} alt="" className=' object-cover w-full h-full rounded-md' />
       </div>
       <div className='flex justify-between items-center py-2'>
        {
            liked ? <FcLike onClick={() => setLiked(false)} className='w-6 h-6'/> :  <FaRegHeart onClick={() => setLiked(true)} className='w-5 h-5'/>
        }
       <CiSaveDown2 className='w-6 h-6'/>
       </div>
    </div>
  )
}

export default PostCard