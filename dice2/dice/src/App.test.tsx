import React from 'react';
import { render,queryByAttribute,fireEvent, getByText } from '@testing-library/react';
import App from './App';

const getById = queryByAttribute.bind(null,'id')
describe("all test for dicing",()=>{

  test('renders logo element',()=>{
    const {queryByAltText} = render(<App/>)
    const altText = queryByAltText(/logo/i)
    expect(altText).toBeInTheDocument()
  })
  test('renders header',()=>{
    const {queryByText} = render(<App/>)
    const header = queryByText(/Roll your life here/i)
    expect(header).toBeInTheDocument()
  })
  test('shows no dice on start',()=>{
    const {queryByAltText} = render(<App/>)
    const altText = queryByAltText(/dice_roll/i)
    expect(altText).not.toBeInTheDocument()
  })

  test('shows dice image on click',async ()=>{
    const {findByAltText,queryByAltText} = render(<App/>)
    const altText = queryByAltText(/dice_roll/i)
    const id =await  findByAltText(/Roll it/)
    fireEvent.click(id)
    expect(altText).toBeInTheDocument()
  })

})
