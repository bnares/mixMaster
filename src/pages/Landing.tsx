import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { DrinkType } from '../types/MixMasterTypes';
import CoctailList from '../components/CoctailList';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const loader = async ()=>{
  const searchTerm = "margarita";
  const fetch = await axios.get(cocktailSearchUrl+searchTerm);
  //console.log(fetch);
  const drinks : DrinkType[] = fetch?.data?.drinks;

  return {drinks, searchTerm};
}

const Landing = () => {
  const {drinks , searchTerm} = useLoaderData();
  
  return (
    <div>
      Landing
      <CoctailList coctails={drinks as DrinkType[]}/>
    </div>
  )
}

export default Landing
