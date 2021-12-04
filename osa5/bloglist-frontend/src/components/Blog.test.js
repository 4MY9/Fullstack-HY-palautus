import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Writer',
    url: 'you.hjuihiu',
    likes:  10,
    user: {
        username: 'Gary',
        name: 'Gary'
    }
    
  }

  const component = render(
    <Blog blog={blog} />
  )
  //component.debug()

  const div = component.container.querySelector('.blogDefault')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
    'Writer'
  )
})
test('details are shown when the view button is clicked', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Writer',
        url: 'you.hjuihiu',
        likes:  10,
        user: {
            username: 'Gary',
            name: 'Gary'
        }
    }
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} />
    )
    //component.debug()
  
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogDefault')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library',
        'Writer',
        'you.hjuihiu',
        10,
    )   
})


test('like button is clicked twice and the event handler is called twice', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Writer',
      url: 'you.hjuihiu',
      likes:  10,
      user: {
        username: 'Gary',
        name: 'Gary'
    }
    }
  
    const mockHandler = jest.fn()
  
    const component = render (
      <Blog blog={blog} updateLikes={mockHandler} />
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })