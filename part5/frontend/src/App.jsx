import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error.message)
      }
    }
    fetchData()
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      const noti = { message: 'Login successful', type: 'success' }
      setNotification(noti)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const noti = { message: 'Wrong username or password', type: 'error' }
      setNotification(noti)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const updateBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      createBlogFormRef.current.toggleVisibility()
      const noti = {
        message: `A new blog titled ${newBlog.title} by ${newBlog.author} added`,
        type: 'success' }
      setNotification(noti)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      updateBlogs()
    } catch (exception) {
      const noti = {
        message: 'Failure creating blog',
        type: 'error' }
      setNotification(noti)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>login</h2>
      <Login handleLogin={handleLogin} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} />
    </div>
  )

  const createBlogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel='create new blog' 
      hideLabel='cancel' ref={createBlogFormRef} id='show-create-new-blog-button'>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
  )

  const blogForm = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>Blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} user={user}/>
        )}
      </div>
    )}

  return (
    <div>
      <Notification message={notification} />
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p><Logout handleLogout={handleLogout} />
          {createBlogForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App