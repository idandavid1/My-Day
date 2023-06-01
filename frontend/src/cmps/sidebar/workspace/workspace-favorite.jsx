import React from 'react'

import { BoardPreview } from '../../board/board-preview'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import star from '../../../assets/img/star.gif'
import { BsStarFill } from 'react-icons/bs'

export default function WorkspaceFavorite ({ boards }) {
      return (
            <div className="workspace-sidebar-header">
                  <div className='workspace-sidebar-items'>
                        <div className="workspace-title-container flex space-between align-center">
                              <span className='favorites-title flex align-center'><BsStarFill className="star-icon" /> Favorites</span>
                              <BiDotsHorizontalRounded className='icon' />
                        </div>
                  </div>
                  {boards.length === 0 && <div className="favorites-empty flex column align-center">
                        <img className="star-icon" src={star} alt="star-img" />
                        <div className="favorites-empty-text">
                              <b>No favorite boards yet</b>
                              <p>"Star" any board so that you
                                    can easily access it later</p>
                        </div>
                  </div>}
                  <ul className='board-list-container'>
                        {boards.map(board => {
                              return <li key={board._id} className='board-list'>
                                    <BoardPreview board={board} />
                              </li>
                        })}
                  </ul>
            </div>
      )
}
