import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
    const dispatch = useDispatch()
  
    const addBlog = async (event) => {
      event.preventDefault()
      const author = event.target.author.value
      const title = event.target.title.value
      const url = event.target.url.value
      event.target.author.value = ''
      event.target.title.value = ''
      event.target.url.value = ''


      dispatch(createBlog({author, title, url}))
      dispatch(setNotification(`a new blog '${title}' by ${author} added!`, 5, 'success'))
    }
  
    return (
      <div>
      <h2>create new</h2>
        <form onSubmit={addBlog}>
        <div class="form-group">
        <fieldset disabled="">
          <div>
            Author
      <label class="form-label" for="disabledInput"><input class="form-control" id="disabledInput" type="text" name="author" placeholder="type text..." disabled=""></input></label>
      </div>
      <div>
            Title
      <label class="form-label" for="disabledInput"><input class="form-control" id="disabledInput" type="text" name="title"placeholder="type text..." disabled=""></input></label>
      </div>
      <div>
            Url
      <label class="form-label" for="disabledInput"><input class="form-control" id="disabledInput" type="text" name="url" placeholder="type text..." disabled=""></input></label>
      </div>
          </fieldset>
          </div>
        
        <button type="submit" class="btn btn-outline-primary">create</button>
      </form>
      
      </div>
      )
  }
export default BlogForm