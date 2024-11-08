import React from 'react'
import {Wrapper as SearchWrapeer} from "../assets/wrappers/SearchForm"
import { Form, useNavigation } from 'react-router-dom'

export type SearchCocktail = {
  searchTerm:string
}

const SearchForm = (props:SearchCocktail) => {
  const status = useNavigation();
  const isSubmitting = status.state=="submitting";
  return (
    <Form className='form'>
      <input type='search' name='search' className='form-input' defaultValue={props.searchTerm} />
      <button type='submit' disabled={isSubmitting} className='btn'>
        {isSubmitting ? "Searching": "Search"}
      </button>
    </Form>
  )
}

export default SearchForm
