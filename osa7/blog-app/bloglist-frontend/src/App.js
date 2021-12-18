import React, { useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import Notification from './components/Notification'
import { initializeLogin, createLogin, logOut } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Bloglist from './components/Bloglist'
import Userlist from './components/Userlist'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])
  const user = useSelector(state => state.login)
  //console.log('username is', user)

  useEffect(() => {
    dispatch(initializeBlogs()) 
  },[dispatch])
  const blogs = useSelector(state => state.blogs)
  //console.log(blogs)

  useEffect(() => {
    dispatch(initializeUsers()) 
  },[dispatch])
  const users = useSelector(state => state.users)
  //console.log('users', users)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
 
    dispatch(createLogin(username, password))
    
  }

  const handleLogout = () => {
    dispatch(logOut(user))
  }

  if ( !user ) {
    return (
      <div className="container">
        <div class="card text-white bg-primary mb-3" style={{width: "370px"}}>
          <div class="card-header">Welcome</div>
          <div class="card-body">
        <h4 class="card-title">Login to application</h4>
        <p class="card-text"></p>
    </div>
  </div>
        <Notification />
        <form onSubmit={handleLogin}>
      <div class="form-group" >
    <label class="col-form-label mt-4"  for="inputDefault">Enter username and password</label>
    <input type="text" name="username" class="form-control" placeholder="Username" id="inputDefault" style={{width: "370px"}}></input>
    <input type="password" name="password" class="form-control" placeholder="Password" id="inputDefault" style={{width: "370px"}}></input>
      </div>
      <button type="submit" class="btn btn-primary" id="login-button">login</button>
    </form>
        </div>
    )
  }

  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="/blogs">Blogs</a>
            <span class="visually-hidden"></span>
        </li>

        <li class="nav-item">
          <a class="nav-link active" href="/users">Users</a>
            <span class="visually-hidden"></span>
            </li>        
      </ul>
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="btn btn-primary">{user.name} logged in</button>
  <div class="btn-group" role="group">
  <button type="button" class="btn btn-dark disabled" onClick={handleLogout}>Logout</button>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" >
    </div>
  </div>
</div>
    </div>
  </div>
</nav>
      <Router>
      <h2>blog app</h2>
    <Notification />
      <Switch>
      <Route path="/users/:id">
          <User users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} />
        </Route>
        <Route path="/users">
          <Userlist users={users} />
        </Route>
        <Route path="/blogs">
          <Bloglist blogs={blogs} />
        </Route>
        <Route path="/">
        <Bloglist blogs={blogs} />
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App