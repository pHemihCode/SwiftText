import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContextProvider'
import QueryProvider from './lib/react-queries/QueryProvider'
ReactDOM.createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
   <QueryProvider>
   <AuthContextProvider>
        <App />
   </AuthContextProvider>
   </QueryProvider>
   </BrowserRouter>
) 
