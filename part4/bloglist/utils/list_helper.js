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
      if (mostBlogs.blogs < author.blogs) {
        mostBlogs = author
      }
    })
    return mostBlogs
  }

  return findMostBlogs(authorList)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  let authorList = []
  let currentAuthor
  blogs.forEach((blog) => {
    authorList.forEach((author) => {
      if (author.author === blog.author) {
        currentAuthor = author
      }
    })
    if (currentAuthor) currentAuthor.likes += blog.likes
    else
      authorList = [...authorList, { author: blog.author, likes: blog.likes }]
    currentAuthor = undefined
  })

  const findMostLikes = (authors) => {
    let mostLikes = authors[0]
    authors.forEach((author) => {
      if (mostLikes.likes < author.likes) {
        mostLikes = author
      }
    })
    return mostLikes
  }

  return findMostLikes(authorList)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
