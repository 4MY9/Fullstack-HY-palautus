import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_BOOKS } from '../queries'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(FIND_BOOKS)
  const [genreFilter, setGenreFilter] = useState(null)

  const books = props.books.data ? props.books.data.allBooks : []
  
  const allGenres = props.genres.data ? props.genres.data.allBooks : []
  const genreArray = []
  allGenres.map(g =>
    <tr key={g.genres}>
      {genreArray.push(g.genres)}
    </tr>)
  
  let uniqueGenres = [...new Set(genreArray.flat())]

  const showGenre = (genre) => {
    getBooks({ variables: { genreToSearch: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setGenreFilter(result.data.findBooks)
    }
  }, [result])


  if (!props.show) {
    return null
  }

  if (genreFilter) {
    return(
      <div>
        <h2>books</h2>
      <table>
        <tbody>
        <tr>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
        {genreFilter.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqueGenres.map(g =>
              <tr key = {g}>
              <button onClick={() => showGenre(g)} >
              {g}</button>
              </tr>
          )}
        <button onClick={() => showGenre(null)}>all genres</button>
      </div>
    )
  }

  if (genreFilter===null)
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqueGenres.map(g =>
              <button onClick={() => showGenre(g)} >
              {g}</button>
          )}
          <button onClick={() => showGenre(null)}>all genres</button>
    </div>
  )
}

export default Books