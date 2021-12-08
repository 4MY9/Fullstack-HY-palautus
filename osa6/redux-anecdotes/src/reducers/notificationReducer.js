
const initialState = null

const notificationReducer = (state = initialState, action) => {
    //console.log('state now: ', state)
    console.log('action is', action.notification)
    switch (action.type) {
        case 'NOTIFY':
            return action.data
        case 'CLEAR':
            return null
      default:
        return state
    }
  }
  export const setNotification = (notification, time) => {
      return async dispatch => {
          dispatch({
              type:'NOTIFY',
              data: notification
          })
          setTimeout(() => {
              dispatch(hideNotification())
          }, 1000*time)
      }
  }
  export const hideNotification = () => {
      return{
          type: 'CLEAR'
      }
  }

  export default notificationReducer