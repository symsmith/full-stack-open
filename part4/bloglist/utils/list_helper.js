const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const findFavorite = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach((blog) => {
      if (blog.likes > favorite.likes) {
        favorite = blog
      }
    })
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }

  return blogs.length > 0 ? findFavorite(blogs) : undefined
}

module.exports = { dummy, totalLikes, favoriteBlog }
