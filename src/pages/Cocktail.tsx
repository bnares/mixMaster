import axios from 'axios';
import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';

const coctailsById = "'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
export const loader = async (data:any)=>{
  console.log(data);
  //const {id} = useParams();
  //console.log("Loader id: ",id);
  //const id = "11118";
  const url = coctailsById+data.params.id;
  console.log("url: ",url);
  const fetch = await axios.get(`${url}`);
  console.log("fetch: ",fetch.data);
  return null;
}

const Cocktail = () => {
  //const {fetch, id} = useLoaderData();
  console.log("Cocktails: ",fetch);
  //console.log(id);
 const param =  useParams();
 console.log("params: ",param);
  return (
    <div>
      Cockatail
    </div>
  )
}

export default Cocktail
