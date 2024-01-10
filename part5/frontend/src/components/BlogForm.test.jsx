import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'
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

test('blog form works correctly', async () => {
  const createBlogMock = jest.fn()
  const component = render(<BlogForm createBlog={createBlogMock} />)

  const titleForm = component.getByLabelText('title')
  fireEvent.change(titleForm, { target: { value: 'Test Title' } })

  const authorForm = screen.getByLabelText('author')
  fireEvent.change(authorForm, { target: { value: 'Test Author' } })

  const urlForm = screen.getByLabelText('url')
  fireEvent.change(urlForm, { target: { value: 'Test URL' } })

  const submitButton = screen.getByText('Create blog')
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.lastCall).toEqual(
      [{ title: 'Test Title', url: 'Test URL', author: 'Test Author' }])
  })
})
