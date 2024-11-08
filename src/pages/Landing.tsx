import axios from 'axios';
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { DrinkType } from '../types/MixMasterTypes';
import CoctailList from '../components/CoctailList';
import SearchForm from '../components/SearchForm';
import { useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm:string)=>{
  return{
    queryKey:["search", searchTerm || "all"],
    queryFn: async ()=>{
      const response = await axios.get(cocktailSearchUrl+searchTerm);
      return response.data.drinks;
    }
  }
}

export const loader = (queryClient) => async ({request})=>{ //request is a default parameter provided by react-router-dom where we have acces to request data
  const url = new URL(request.url); //creating url, it gives me a chance to get difrent part of url
  const searchTerm = url.searchParams.get("search") || "margarita";  //search becouse in SearchForm input name is Search which menas after submitting the quesry parameter is search
  
  //const fetch = await axios.get(cocktailSearchUrl+searchTerm);
  //const drinks : DrinkType[] = fetch?.data?.drinks;
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm)); // ensureQueryData checking if we have chached the data if yes doing "useQuery(searchCocktailsQuery(searchTerm));" from below if no we connect here with api to get data
  return { searchTerm};
}

const Landing = () => {
  const { searchTerm} = useLoaderData();
  const {data:drinks} = useQuery(searchCocktailsQuery(searchTerm));
  
  return (
    <div>
     
      <SearchForm searchTerm = {searchTerm}/>
      <CoctailList coctails={drinks as DrinkType[]}/>
    </div>
  )
}

export default Landing
