import { Routes, Route } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignInForm from './_auth/Form/SignInForm';
import SignUpForm from './_auth/Form/SignUpForm';
import { Home } from './_root/pages';
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
      </Route>
    </Routes>
    </main>
  )
}

export default App