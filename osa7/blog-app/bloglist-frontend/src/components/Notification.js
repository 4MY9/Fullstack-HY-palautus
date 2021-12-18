import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  if ( !notification ) {
    return null
  }
  notification.style = notification[1]
  notification.message = notification[0]
 
  const styling = {
    color: notification.style === 'success' ? 'green' : 'red',
  }
  
  return (
    <div class="alert alert-dismissible alert-primary" style={styling}>
    <p class="mb-0">{notification.message}</p>
  </div>
  )}

export default Notification