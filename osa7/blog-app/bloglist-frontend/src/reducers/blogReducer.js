
import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('actiondata', action.data)
  switch(action.type) {
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'INIT_BLOGS':
        return action.data
    case 'LIKE':
        const liked = action.data
        return state.map(b => b.id===liked.id ? liked : b).sort(byLikes)
    case 'COMMENT':
        const commented = action.data
        return state.map(b => b.id===commented.id ? commented : b)
    default:
      return state
  }
}

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch ({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
  }

export const createBlog = blog => {
    console.log(blog)
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
      
  })
  }
}
export const likeBlog = (blog) => {
    return async dispatch => {
      const toLike = { 
        title: blog.title, 
        author:blog.author, 
        url: blog.url, 
        id: blog.id, 
        likes: blog.likes + 1, 
        user: blog.user.id }
      const data = await blogService.update(toLike)
      
      const likedBlog = {...data, user: blog.user, comments: blog.comments }
      dispatch({
        type: 'LIKE',
        data: likedBlog
      })
    }
  }
export const addComment = (comment, blog) =>{
  return async dispatch => {
    const data = await blogService.createCom({comment}, blog.id)
      const updatedComments = blog.comments.concat(data)
      const commentedBlog = {...blog, comments: updatedComments }
    dispatch({
      type: 'COMMENT',
      data: commentedBlog
  })
}


}



export default blogReducer