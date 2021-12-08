import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const voteAnecdote = (anecdote) => {
    //console.log(anecdote)
    props.vote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }
    return (
        <div>
         {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                {`has ${anecdote.votes}`}
                <button onClick={() => {voteAnecdote(anecdote)}}>vote</button>
                
                </div>
            )
          }
        </div>
      )
    }

  const mapStateToProps = (state) => {
    const sorted = state.anecdotes.sort((a, b) => {return b.votes - a.votes;})
    if ( state.filter === '' ) {
      return {
        anecdotes: sorted
      }
    } 
    return {
      anecdotes: (state.filter !== '')
        ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        : state.anecdotes.filter(anecdote => anecdote.content
        )
    }
  }
  const mapDispatchToProps = {
    vote,
    setNotification
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
