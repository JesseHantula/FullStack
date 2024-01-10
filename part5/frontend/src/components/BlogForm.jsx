import { useState } from 'react'

const BlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      url: url,
      author: author
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    createBlog(blogObject)
  }

  return(
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <div>
        <label htmlFor="title">title</label>
        <input id="title" type="text" name="title" value={title}
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input id="author" type="text" name="author" value={author}
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input id="url" type="text" name="url" value={url}
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button id='submit-new-blog-button' type="submit">Create blog</button>
    </form>
  )
}

export default BlogForm