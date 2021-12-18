import Blogform from './Blogform'
import Togglable from './Togglable'
import { Link, } from "react-router-dom";
import React from 'react'
import { Table } from 'react-bootstrap'

const Bloglist = ({blogs}) => {
    
    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogFormRef = React.createRef()

    return(
    <div>
      
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <Blogform />
      </Togglable>
      <Table striped>
        <tbody>
    {blogs.sort(byLikes).map(blog =>
      <tr key={blog.id}>
          <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
        </tr>    
    )}
    </tbody>
    </Table>
    </div>
    )
  }

  export default Bloglist