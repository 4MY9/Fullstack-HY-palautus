const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Kaurapuuroa ja Kimalletta",
        author: "Anna",
        url: "kkdokfkfrokforfr",
        likes: 5,
        id: "61939e8aded60cba7cbdbc1e"
        },
        {
        title: "Poutapilviä",
        author: "Maija",
        url: "testi.jkhkhhlj.fi",
        likes: 5,
        id: "6193a270945943dec245214f"
        },
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', likes: 5 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}