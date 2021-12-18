import React from 'react'
import { useParams } from "react-router-dom"

const User = ({users, blogs}) => {
    const id = useParams().id
    const user = users.find(u => u.id === id)
    if (!user) {
      return null
    }
    blogs = user.blogs

    const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
       <h1>{user.name}</h1>
       <h3>added blogs</h3>
       <ul>
      {blogs.sort(byLikes).map(blog => 
        <tr key={blog.id} >
          <td>
          {blog.title}
          </td>
          </tr>
          )}
    </ul>
    
   
    </div>
  )
  }
  export default User