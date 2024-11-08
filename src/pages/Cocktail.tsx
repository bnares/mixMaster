import axios from 'axios';
import React from 'react'
import { Link, Navigate, useLoaderData, useParams } from 'react-router-dom';
import { DrinkType } from '../types/MixMasterTypes';
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from '@tanstack/react-query';

const coctailsById = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailQuery = (id:string)=>{
  return{
    queryKey:["cocktail",id],
    queryFn: async ()=>{
      const url = `${coctailsById}${id}`;
      console.log("query axios url: ",url);
      const fetch = await axios.get(url);
      return fetch.data.drinks[0];
  },
  }
}

// const singleCocktailQuery = (id) => {
//   return {
//     queryKey: ['cocktail', id],
//     queryFn: async () => {
//       const { data } = await axios.get(`${coctailsById}${id}`);
//       return data.drinks[0];
//     },
//   };
// };

export const loader = (queryClient)=>async (data:any)=>{
  //const url = coctailsById+data.params.id;
  //const fetch = await axios.get(`${url}`);
  //return {id:data.params.id, data:fetch.data.drinks[0]};
  console.log(data);
  const fetch = await queryClient.ensureQueryData(singleCocktailQuery(data.params.id));
  console.log(fetch);
  //return {id:data.params.id, data:fetch.data.drinks[0]};
  return {id:data.params.id};
}

const Cocktail = () => {
  const { id} = useLoaderData();
  //const {id} = useParams();
  //if(!id) return <h2>ERROR</h2>;
  const {data} = useQuery(singleCocktailQuery(id))
  if(!data) return <Navigate to="/" />
  const ingridients :string[] = [];
 const {strDrink:name, 
    strDrinkThumb: image, 
    strAlcoholic:info,
    strCategory:category,
    strGlass:glass,
    strInstructions:instructions
  } = data;
  const valuesOfDataCockatailObject =  Object.keys(data);
  //.filter(x => x.startsWith("strIngredient"));
  
  for(const value of valuesOfDataCockatailObject){
    if(data[value]!=null && value.toString().startsWith("strIngredient")){
      ingridients.push(data[value]);
    }
  }

  return (
    <Wrapper>
      <header>
        <Link to="/" className='btn'>Back Home</Link>
      </header>
      <div className="drink">
        <img src={image} alt={name} className='img'/>
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingridients: </span>
            {ingridients.join(", ")}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Cocktail
