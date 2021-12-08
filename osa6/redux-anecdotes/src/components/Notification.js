
import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification === null) {
    return <div></div>
  }
  return (
    <div style={style}>
    {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    
  }
}
const mapDispatchToProps = {
  setNotification
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification

