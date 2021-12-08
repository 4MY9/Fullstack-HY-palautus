import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      
      const changedVotes = {
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes+1 
      }

      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : changedVotes
      )
      case 'INIT_ANECDOTES':
        return action.data
     
    
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  })
}
}

export const vote = (anecdote) => {
  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.update(anecdote)
  dispatch ({
    type: 'VOTE',
    data: anecdoteToUpdate
  })
}
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
  })
  }
}


export default anecdoteReducer