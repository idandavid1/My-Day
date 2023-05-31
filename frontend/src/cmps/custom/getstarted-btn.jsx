import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function StartedButton ({ boardId }) {
  return (
    <Link to={`/board/${boardId}`} className='get-started-btn'>
        Get Started
        <HiArrowNarrowRight className='arrow' />
    </Link>
  )
}
