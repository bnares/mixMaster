import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About, Landing, Error, Cockatail, HomeLayout, Newslatter,SinglePageError } from './pages'
import { loader as landingLoader } from './pages/Landing'
import {loader as singleCocktailLoader} from "./pages/Cocktail"

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
        loader: landingLoader 
      },
      {
        path:"cocktail/:id",
        errorElement:<SinglePageError />,
        loader: singleCocktailLoader,
        element: <Cockatail />
      },
      {
        path:"newsletter",
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
   <RouterProvider router={router} />
  )
}

export default App
