import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle} >
      <div>
        <div style={hideWhenVisible} className='blogDefault' >
          {blog.title} {blog.author}
          <button onClick={toggleVisibility} className='blogShowDetails'>view</button>
        </div>
        <div style={showWhenVisible} >
          {blog.title} <button onClick={toggleVisibility}>hide</button><br />
          {blog.url}<br />
          <span className="blog__likes">likes </span>
          {blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button><br />
          {blog.author}<br />
          <div>
            {user === blog.user.name && (<button onClick={() => removeBlog({ blog })}>remove</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Blog