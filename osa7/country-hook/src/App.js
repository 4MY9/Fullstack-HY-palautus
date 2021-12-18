import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState({found: false})

  useEffect(() => {
    if (name)
    axios
      .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then(response => {
      setCountry({found: response.data[0]})
      //console.log('responsedata', response.data)
  })
}, [name])

  return country
}

const Country = ({ country }) => {
  //console.log('found', country.found.name)
  if (country.found === false) {
    return null
  }
  if (country.found === undefined) {
    return (
      <div>
        not found...
      </div>
    )
  }
  
  return (
    <div>
      <h3>{country.found.name} </h3>
      <div>capital {country.found.capital} </div>
      <div>population {country.found.population}</div> 
      <img src={country.found.flag} height='100' alt={`flag of ${country.found.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  
  const country = useCountry(name)
  
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
