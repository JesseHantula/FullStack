import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Blog from './Blog'
import axiosMock from 'axios'

jest.mock('axios')

const blog = {
  title: 'Blog for testing',
  author: 'Timmy Tester',
  url: 'www.testmaster.com',
  likes: 16,
  user: {
    username: 'root',
    name: 'tester',
    id: '1234218042100421'
  },
  id: '1234218042100422'
}


test('renders content', () => {
  const component = render(<Blog blog={blog} user={blog.user} />)

  expect(component.container).toHaveTextContent(`Title: ${blog.title}`)
  expect(component.container).toHaveTextContent(`Author: ${blog.author}`)

  expect(component.container).not.toHaveTextContent(`URL: ${blog.url}`)
  expect(component.container).not.toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component.container).not.toHaveTextContent(`Creator: ${blog.user.username}`)
})

test('renders extra content when show button is clicked', () => {
  const component = render(<Blog blog={blog} user={blog.user} />)

  expect(component.container).not.toHaveTextContent(`URL: ${blog.url}`)
  const element = component.getByText('view')
  fireEvent.click(element)

  expect(component.container).toHaveTextContent(`URL: ${blog.url}`)
  expect(component.container).toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component.container).toHaveTextContent(`Creator: ${blog.user.username}`)
})

test('like button calls event handler', async () => {
  const updateBlogsMock = jest.fn()

  const component = render(<Blog blog={blog} user={blog.user} updateBlogs={updateBlogsMock}/>)
  const element = component.getByText('view')
  fireEvent.click(element)

  expect(component.container).toHaveTextContent(`URL: ${blog.url}`)

  const button = screen.getByText('like')
  axiosMock.put.mockResolvedValueOnce({ data: blog })
  fireEvent.click(button)

  axiosMock.put.mockResolvedValueOnce({ data: blog })
  fireEvent.click(button)

  await waitFor(() => {
    expect(updateBlogsMock.mock.calls).toHaveLength(2)
  })
})
