const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const firstBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  const secondBlog = {
    _id: "ui6516i51i651e561i6",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  }

  const listWithOneBlog = [firstBlog]
  const listWithTwoBlogs = [firstBlog, secondBlog]

  test("when list is empty, is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test("when list has two blogs, equals the sum of the likes", () => {
    expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(15)
  })
})

describe("favorite blog", () => {
  const firstBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  const secondBlog = {
    _id: "ui6516i51i651e561i6",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  }

  const listWithOneBlog = [firstBlog]
  const listWithTwoBlogs = [firstBlog, secondBlog]

  test("when list is empty, is undefined", () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test("when list has only one blog, is that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test("when list has two blogs, is the one with most likes", () => {
    expect(listHelper.favoriteBlog(listWithTwoBlogs)).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 10
    })
  })
})

describe("most blogs", () => {
  const firstBlog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  const secondBlog = {
    _id: "ui6516i51i651e561i6",
    title: "Go To Statement Considered Harmful",
    author: "Someone Else",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  }
  const thirdBlog = {
    _id: "ui6516i51i651e561i6",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 13,
    __v: 0
  }

  const listWithOneBlog = [firstBlog]
  const listWithTwoBlogs = [firstBlog, secondBlog]
  const listWithThreeBlogs = [firstBlog, secondBlog, thirdBlog]

  test("when list is empty, is undefined", () => {
    expect(listHelper.mostBlogs([])).toBe(undefined)
  })

  test("when list has only one blog, is one blog", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test("when list has two blogs, is the first author, with one blog", () => {
    expect(listHelper.mostBlogs(listWithTwoBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test("when list has three blogs, is the author, with most blogs", () => {
    expect(listHelper.mostBlogs(listWithThreeBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })
})
