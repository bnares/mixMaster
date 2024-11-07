import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import { Link, useRouteError } from 'react-router-dom'
import img from "../assets/not-found.svg"

const Error = () => {
  const error = useRouteError(); //a bilt in react-router-doom hook to provide data about error like status, error text itp
  console.log(error);
  if(error!.status==404){
    return(
      <Wrapper>
        <div>
          <img src={img} alt='Error, Not found' />
          <h3>Ohh!</h3>
          <p>We cant seem to find this page</p>
          <Link to="/">Back Home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  )
}

export default Error
