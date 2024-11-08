import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About, Landing, Error, Cockatail, HomeLayout, Newslatter,SinglePageError } from './pages'
import { loader as landingLoader } from './pages/Landing'
import {loader as singleCocktailLoader} from "./pages/Cocktail"
import { action as newsletterAction } from './pages/Newslatter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000*60*5, //how long the query is going to be valid in ms
    }
  }
})

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element: <Landing />,
        errorElement:<SinglePageError />,
        loader: landingLoader(queryClient)
      },
      {
        path:"cocktail/:id",
        errorElement:<SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cockatail />
      },
      {
        path:"newsletter",
        action:newsletterAction,
        element: <Newslatter />
      },
      {
        path:'about',
        element:<About />,
        
      }
    ]
  },
  
])



function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
