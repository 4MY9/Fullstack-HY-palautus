
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from "react-router-dom";

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()

  const like = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`you liked '${blog.title}' by ${blog.author}`, 5, 'success'))
  }

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const comment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
  
    event.target.comment.value = ''
    dispatch(addComment(comment, blog))
    dispatch(setNotification('comment added', 5, 'success'))
  }
  console.log(blog)


  if (!blog) {
    return null
  }
  
  return (
    <div>
     <h1>{blog.title}</h1>
     <span class="badge bg-success">Info</span><a href={blog.url}>{blog.url}</a>
     <div>{blog.likes} likes <button type="button" class="btn btn-outline-primary" onClick={() => like(blog)}>like</button></div>
     <div>added by {blog.user.username}</div>
     <h2>comments</h2>
     <form onSubmit={comment}>
          <div>
        <input name="comment" /><button type="submit" class="btn btn-outline-primary">add comment</button>
        </div>
        </form>
     <ul>
     {blog.comments.map(comment => 
        <li key={comment.id} > 
          {comment.comment}
          </li>
          )}
      
        
     </ul>
  </div>
)
}



export default Blog