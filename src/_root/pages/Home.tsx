import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { userContext } from '@/context/AuthContextProvider';
import { useGetRecentPOsts } from '@/lib/react-queries/queriesAndMutations'
import { Models } from 'appwrite';

const Home = () => {
  const {data:posts, isPending} = useGetRecentPOsts();
  const {user} = userContext();
  // console.log(user)
  console.log(posts && posts)
  if(!user) return;
  return (
    <div className='w-full'>
      <div className='home-container p-4'>
        <div>
          <h2 className='font-bold text-left w-full text-sm md:text-md lg:text-base'>Home feed</h2>
          {
            isPending && !posts ? (
              <Loader />
            ) : (
              <ul className='flex flex-col gap-9 w-full mt-5 custom-scrollbar'>
                {
                  posts?.documents.map((post:Models.Document) => (
                    <PostCard post={post} key={post.caption}/>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home