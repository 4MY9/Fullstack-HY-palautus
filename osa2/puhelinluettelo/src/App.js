import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  if (message.includes(`Information of`))
    return (
      <div className="error2">
        {message}
      </div>
  )
  else
    return (
      <div className="error">
        {message}
      </div>
  )
}

const Filter = ({ handleFilter, filter}) => (
  <form>
      <div>
        filter shown with
        <input value={filter}
        onChange={handleFilter}
        />
      </div>
      </form>
)
const PersonForm = ({ handleNameChange, handleNumberChange, addName, newName, newNumber }) => (
  <form onSubmit={addName}>
    <div> 
        name:
        <input value={newName} 
        onChange={handleNameChange}
          />
    </div>
    <div>
        number: 
        <input value={newNumber}
        onChange={handleNumberChange}
        />
        <button type="submit">add</button>
        </div>
        </form>
)
const Persons = ({persons, filter, removePerson}) => {
    return (
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <Person key={person.name} person={person} removePerson={removePerson}/> )}
      </div>
      )
    }



const App = (props) => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber}
    if (persons.find(o => o.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const name=persons.find(o => o.name === newName)
        personService
          .update(name.id, nameObject)
          .then(changedPerson=>{
            setPersons(persons.map(p => p.id !== name.id ? p : changedPerson))
            setErrorMessage(
              `Updated ${newName} `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
        .catch(error => setErrorMessage(`Information of ${newName} has already been removed from server`))
  }  
  }
    else {
    personService
      .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(
          `Added ${newName} `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
    })  
}
  }
  const removePerson = ({person}) => {
    if (window.confirm(`Delete '${person.name}'?`)) {
      personService
        .remove(person.id)
        .catch(error => setErrorMessage(`Information of ${person.name} has already been removed from server`))
        setPersons(persons.filter(p => p.id !== person.id))
        setErrorMessage(
          `Deleted ${person.name} `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }}
    


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  
  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      newName={newName} addName={addName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )

}
export default App;