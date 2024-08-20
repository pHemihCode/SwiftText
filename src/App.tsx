import { Routes, Route } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignInForm from './_auth/Form/SignInForm';
import SignUpForm from './_auth/Form/SignUpForm';
import { Home, Explore, Saved, AllUsers, Profile, UpdatedProfile, CreatePost, EditPost, PostDetails } from './_root/pages';
import { Toaster } from "@/components/ui/toaster"
const App = () => {
  return (
    <main className='flex h-screen'>
    <Routes>
      {/* Private Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Route>

       {/* Public Route */}
      <Route element={<RootLayout />}>
        <Route index element={<Home /> } />
        <Route path='/explore' element={<Explore />} />
        <Route path='/saved' element={<Saved/>} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/edit-post/:id' element={<EditPost />} />
        <Route path='/post-details/:id' element={<PostDetails />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-profile/:id/*' element={<UpdatedProfile />} />
      </Route>
    </Routes>
    <Toaster />
    </main>
  )
}

export default App