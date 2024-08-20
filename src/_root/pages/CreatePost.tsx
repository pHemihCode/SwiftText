
import createIcon  from "../../assets/gallery-add.svg"
import PostForm from '@/components/forms/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1 px-4 custom-scrollbar'>
        <div className='text-white w-full'>
          <div className='max-w-5xl flex flex-row gap-2 items-center w-full justify-start py-5'>
            <img src={createIcon} alt="" className='invert-white'/>
             <h2 className='font-semibold'>Create Post</h2>
          </div>
          <PostForm action="Create"/>
        </div>
    </div>
  )
}

export default CreatePost