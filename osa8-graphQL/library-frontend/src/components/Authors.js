import React from 'react'
import { useMutation } from '@apollo/client'
import { useState } from 'react'


import { EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born }})

    setName('')
    setBorn('')
  }
  
  
  if (!props.show) {
    return null
  }
  const authors = props.result.data ? props.result.data.allAuthors : []
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              
            </tr>
          )}
        </tbody>
      </table>
      

      <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <select value={name} onChange={({ target }) =>
      setName(target.value)}>
      {authors.map(a => 
        <option key={a.name}>{a.name}</option>
      )}
</select>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors