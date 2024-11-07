import React from 'react'
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomeLayout = () => {
  const navigation = useNavigation(); //to get the status is page is not downloading data state is idle if now is downloading staie is loading

  const isPageLoading = navigation.state==="loading";

  return (
    <div>
      <Navbar />
      <section className='page'>
        {isPageLoading ? <div className='loading'></div>:<Outlet />}
        
      </section>
      
    </div>
  )
}

export default HomeLayout
