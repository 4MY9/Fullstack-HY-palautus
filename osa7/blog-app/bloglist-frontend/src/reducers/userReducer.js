import usersService from '../services/users'

const userReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('actiondata', action.data)
  switch(action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
        }
            
    }

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch ({
        type: 'INIT_USERS',
        data: users,
        })
    }
    }
export default userReducer
