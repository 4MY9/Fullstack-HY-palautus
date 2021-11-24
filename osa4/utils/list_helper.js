const dummy = (blogs) => {
    
    return Number(1)
  }

const totalLikes = (blogs) => {
    const sumAll = blogs.map(blog => blog.likes)
    .reduce((prev, current) => prev + current, 0)
    

    return blogs.length === 0
    ? 0
    : sumAll
}
const favouriteBlog = (blogs) => {
    let maxObj = blogs.reduce((max, obj) => (max.likes > obj.likes) ? max : obj)
    console.log(maxObj.title)
    delete maxObj._id
    delete maxObj.__v
    delete maxObj.url
    return maxObj
}

  module.exports = {
    dummy, totalLikes, favouriteBlog
  }