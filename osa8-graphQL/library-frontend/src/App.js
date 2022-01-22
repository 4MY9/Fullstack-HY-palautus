import React, { useState } from 'react'
import { useQuery,  useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'

import { ALL_BOOKS,  ALL_AUTHORS, ALL_GENRES, BOOK_ADDED } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }



  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  return (
    <div>
      <div>

      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>
        logout
      </button>
      </div>
      <Authors result={result} setError={notify}
        show={page === 'authors'}
      />

      <Books books={books} genres={genres}
        show={page === 'books'}
      />
    
      <NewBook setError={notify}
        show={page === 'add'}
      />
      

    </div>
  )
}

export default App