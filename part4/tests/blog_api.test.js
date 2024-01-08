const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('salasana', 10)
  const userObject = new User({
    username: 'jesse16',
    passwordHash: passwordHash
  })

  await userObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('get all the blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
}, 100000)

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
}, 100000)

test('post a new blog', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'https://example.com',
    likes: 10
  }
  
  const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(200)

  expect(response.body.title).toEqual(newBlog.title)
})

test('likes defaults to zero', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'https://example.com'
    }

    const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(200)

  const body = response.body 
    expect(body.likes).toEqual(0)
})

test('status code 400 sent with missing title', async () => {
  const newBlog = {
    author: 'New Blog Author',
    url: 'https://example.com'
  }
  const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(200)
}, 100000)

test('status code 400 sent with missing url', async () => {
    const newBlog = {
      title: 'New Blog Title',
      author: 'New Blog Author'
    }
  
  const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(200)
  }, 100000)

test('delete a blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id

  const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .expect(204)
})

test('update a blog', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'https://example.com',
    likes: 10
  }

  const loginResponse = await api.post('/api/login')
    .send({ username: 'jesse16', password: 'salasana' })

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(200)

  newBlog.likes += 1

  await api
    .put(`/api/blogs/${response.body.id}`)
    .send(newBlog)
    .expect(200)

  const id = response.body.id
  const updatedResponse = await api.get(`/api/blogs/${id}`)

  expect(updatedResponse.body.likes).toEqual(11)
})

test('authentication fails without token', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'https://example.com',
    likes: 10
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})