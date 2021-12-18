
const initialState = null

const notificationReducer = (state = initialState, action) => {
    //console.log('action: ', action)
    //console.log('datacontent', action.data)
    switch (action.type) {
        case 'NOTIFY':
            return [action.data, action.style]
        case 'CLEAR':
            return null
      default:
        return state
    }
  }

  let timeoutId

  export const setNotification = (notification, time, style) => {
    return async dispatch => {
      dispatch({
        type: 'NOTIFY',
        data: notification,
        style: style
      })
  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'CLEAR'
        })
      }, time * 1000)
    }
  }
  
  export const clearNotification = (id) => (
    { type: 'CLEAR' }
  )


  export default notificationReducer