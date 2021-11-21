const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const first_blog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  const second_blog = {
    _id: "ui6516i51i651e561i6",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  }

  const listWithOneBlog = [first_blog]
  const listWithTwoBlogs = [first_blog, second_blog]

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
