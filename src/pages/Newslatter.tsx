import axios, { AxiosError } from 'axios';
import React from 'react'
import {Form, redirect, useNavigation} from "react-router-dom"
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({request})=>{
  

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try{
    const response = await axios.post(newsletterUrl,data);
    console.log(response);
    toast.success(response.data.msg); 
    return redirect("/");
  }catch(e){
    console.log(e);
    toast.warning(e?.response?.data?.msg);
    return e;
    
  }
  
}

const Newslatter = () => {
  const navigation = useNavigation(); //checking the state of page if we are submiting state = "submiting", if not doing anything state="idle"
  const isSubmitting = navigation.state ==="submitting";
  return (
    <Form className='form' method='post'>
      <h4 style={{textAlign:'center', marginBlock:'2rem'}}>
        Our News
      </h4>
      <div className="form-row">
        <label htmlFor="name" className='form-label'>
          name
        </label>
        <input type="text" className='form-input' name='name' id='name' defaultValue="john"/>
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className='form-label'>
          last Name
        </label>
        <input type="text" className='form-input' name='lastName' id='lastName' defaultValue="Smith"/>
      </div>

      <div className="form-row">
        <label htmlFor="email" className='form-label'>
          email
        </label>
        <input type="text" className='form-input' name='email' id='email' defaultValue="test@test.com"/>
      </div>
      <button type="submit" className='btn btn-block' style={{marginTop:"0.5rem"}} disabled = {isSubmitting}>
        {isSubmitting ? "Submitting": "Submit"} 
      </button>
    </Form>
  )
}

export default Newslatter
