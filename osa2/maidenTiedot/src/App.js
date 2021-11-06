import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Filter = ({ handleFilter, filter}) => (
  <form>
      <div>
        find countries
        <input value={filter}
        onChange={handleFilter}
        />
      </div>
      </form>
)


const CountryDetails = ({country}) => {
  return (
  <div>
    <h1>{country[0].name}</h1>
    <p>capital {country[0].capital}</p>
    <p>population {country[0].population}</p>
    <h2>languages</h2>
    <ul>{country[0].languages.map((language) => (
    <li key={language.name}> {language.name} </li>
    ))}</ul>
    <p><img src={country[0].flag} alt="country flag" width="150" height="120"/></p>
  </div>
  )
  }

  

const Find = ({countries, filter, handleClick}) => {
  console.log(filter)
  const filteredAll=countries.filter(country => country.name.toLowerCase().startsWith(filter.toLowerCase())).map(country => <p key={country.name}>{country.name}</p>)
  const country = countries.filter(country => country.name.toLowerCase().startsWith(filter.toLowerCase()))

  if(filteredAll.length === 0){
    return (<div></div>)
  } else if(filteredAll >= 10){
  } else if (filteredAll.length > 1 && filteredAll.length < 10){
    return(
    <div>
      {country.map(country => <p key={country.name}>{country.name} <button onClick={() => handleClick({country})}> show </button></p>)}
      </div>)

  } else if (filteredAll.length === 1){
    return(
    <div>
      <CountryDetails country={country} />
    </div>)
  } else {
    return(<div>Too many matches, specify another filter</div>)
  }
    
  
}

 
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  

  const handleClick = (props) => {
    console.log('clicked', filter)
    console.log(props.country.name)
    setFilter(props.country.name)
  
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(filter)
}
  
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

 
  
      
  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Find countries={countries} filter={filter} handleClick={handleClick} />
    </div>
  )
}
 
export default App
