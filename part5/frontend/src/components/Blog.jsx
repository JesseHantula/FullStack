import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs, user }) => {
  const [showContent, setShowContent] = useState(false)

  const hideWhenVisible = { display: showContent ? 'none' : '' }
  const showWhenVisible = { display: showContent ? '' : 'none' }
  const showDeleteButton = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    updateBlogs()
  }

  const toggleContent = (event) => {
    event.preventDefault()
    setShowContent(!showContent)
  }

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id, blog)
        updateBlogs()
      }
      catch(exception) {
        console.log(exception.message)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {!showContent &&
        <div style={hideWhenVisible} data-testid="blog-info">
            Title: {blog.title} <button id = 'show-blog-button'
              onClick={toggleContent}>view</button> <br />
            Author: {blog.author}
        </div>
      }
      {showContent &&
        <div style={showWhenVisible}>
            Title: {blog.title} <br />
            Author: {blog.author} <br />
            URL: {blog.url} <br />
            Likes: {blog.likes} <button id='like-blog-button'
              onClick={likeBlog}>like</button> <br />
            Creator: {blog.user.username} <br />
          <button onClick={toggleContent} id='hide-blog-button'>hide</button>
          <button style={showDeleteButton} onClick={deleteBlog} 
            id='delete-blog-button'>delete</button>
        </div>
      }
    </div>
  )
}

export default Blog