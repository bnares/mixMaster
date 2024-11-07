import React from 'react'
import { DrinkDisplayType, DrinkType } from '../types/MixMasterTypes'
import Wrapper from '../assets/wrappers/CocktailList'
import CoctailCard from './CoctailCard'

type Props ={
    coctails:DrinkType[]
}

const CoctailList = (props:Props) => {
    console.log("Props list: ",props);
    const {coctails} = props;
    //console.log("From coctails List: ", coctails);
    if(!coctails){
        return(
            <h4 style={{textAlign:"center"}}>No Matching Cocktails</h4>
        )
    }
    const formattedDrink: DrinkDisplayType[] = coctails.map(item=>{
        const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item;
        return{
            id:idDrink,
            name:strDrink,
            image:strDrinkThumb,
            info: strAlcoholic,
            glass:strGlass
        }
    });

  return (
    <Wrapper>
      {formattedDrink.map(item=>{
        return <CoctailCard key={item.id} coctail={{...item}}/>
      })}
    </Wrapper>
  )
}

export default CoctailList
