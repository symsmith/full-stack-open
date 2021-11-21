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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  let authorList = []
  let currentAuthor
  blogs.forEach((blog) => {
    authorList.forEach((author) => {
      if (author.author === blog.author) {
        currentAuthor = author
      }
    })
    if (currentAuthor) currentAuthor.blogs++
    else authorList = [...authorList, { author: blog.author, blogs: 1 }]
    currentAuthor = undefined
  })

  const findMostBlogs = (authors) => {
    let mostBlogs = authors[0]
    authors.forEach((author) => {
      if (mostBlogs.blogs < author.blog) {
        mostBlogs = author
      }
    })
    return mostBlogs
  }

  return findMostBlogs(authorList)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
