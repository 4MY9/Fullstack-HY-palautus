import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 
  

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      
      notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      
  }

  const updateLikes = id => {
    
    const blog = blogs.find(n => n.id === id)
    const userId = blog.user.id
    const blogUser = blog.user
    
    const changedBlog = { ...blog, likes: blog.likes + 1, user: userId} 
    //console.log('ennen päivitystä', blog)
    const updatedBlog = { ...changedBlog, likes: blog.likes + 1, user: blogUser}
    //console.log('päivityksen jälkeen', updatedBlog)
  
    blogService
    .update(id, changedBlog)
      .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    
    })
    .catch(error => {
      notifyWith(`Blog '${blog.title}' was already removed from server`, 'error')
    })    
  }
  
const removeBlog = ({blog}) => {
  if (window.confirm(`Delete '${blog.title}'?`)) {
    blogService
      .remove(blog.id, user.token)
      .catch(error => notifyWith(`Information of ${blog.title} has already been removed from server`, 'error'))
      setBlogs(blogs.filter(p => p.id !== blog.id))
      notifyWith(`Deleted ${blog.title} `)
      
}}

const blogForm = () => (
  <Togglable buttonLabel='create new' ref={noteFormRef}>
  <BlogForm createBlog={addBlog}/>
  </Togglable>
)

const handleLogin = async (event) => {
  event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong name or password', 'error')
      
    }
  }


const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
    //console.log(user, window.localStorage.getItem('loggedBlogappUser'))
      }

const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
      />
      </Togglable>
  )

  
  if (user === null) {
    return (
      <div>

        <h2>Log in to application</h2>
        <Notification notification={notification} />
        {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
        </div>
      }
        
      </div>
    )
  }
  
  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button> </p>
          {blogForm()}
        <div>
      {blogs.sort((a, b) => {
      return b.likes - a.likes;
      }).map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} user={user.name} />
      )}
      
    </div>
      
    </div>
  )
}

export default App