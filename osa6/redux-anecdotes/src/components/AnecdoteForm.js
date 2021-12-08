import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification   } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {
  
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.setNotification(`you added ${content}`, 5)
    }

  
    return (
      <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
      </div>
    )
  }
  const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      notify: state.notify
    }
  }

  const mapDispatchToProps = {
    createAnecdote,
    setNotification,
  }

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm