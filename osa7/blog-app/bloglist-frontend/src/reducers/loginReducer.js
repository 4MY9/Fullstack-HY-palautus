
import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const loginReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('actiondata', action.data)
  
  switch(action.type) {
    case 'NEW_LOGIN':
        return action.data
    case 'INIT_USER':
        return action.data
    case 'LOGOUT_USER':
        return action.data
    
    default:
        return state
        }
      }

    

export const initializeLogin = () => {
    return async dispatch => {
        const user = storage.loadUser()
        dispatch ({
        type: 'INIT_USER',
        data: user,
        })
      }
      }


export const createLogin = (username, password) => {
    return async dispatch => {
        try {
        const user = await loginService.login({
        username, password})
        storage.saveUser(user)
        dispatch(setNotification(`${username} welcome back!`, 5, 'success'))
        dispatch({
          type: 'NEW_LOGIN',
          data: user,
      })
      } catch(exception) {
            dispatch(setNotification('wrong credentials', 5, 'error'))
    } 
    }
}

export const logOut = (user) => {
    return async dispatch => {
    user = storage.logoutUser()
    dispatch ({
        type: 'LOGOUT_USER',
        data: null
        })
      }
      }
export default loginReducer