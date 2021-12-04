import React, {useState} from 'react'
 

const BlogForm = ({createBlog, }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: 0,
        }
        //console.log(blogObject)
        createBlog(blogObject)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    
    }

    return (
     <div>
       <h2>create new</h2>
       <form onSubmit={addBlog}>
      <div>
        title:
      <input
        id='title'
        name= "title"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      />
      </div>
      
      <div>
        author:
      <input
        name="author"
        id='author'
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      </div>
      <div>
        url:
      <input
        name="url"
        id='url'
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
      </div>
      <div>
      <button type="submit" id="create-button">create</button>
      </div>
    </form>
    </div>
  )
   }



export default BlogForm