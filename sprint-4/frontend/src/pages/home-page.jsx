import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { loadBoards } from '../store/board.actions'

export function HomePage() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    useEffect(() => {
        loadBoards()
    }, [])
    
    if (!boards.length) return <div>Loading...</div>
    return (
        <section className='home-page'>
            <HomeHeader boards={boards}/>
            <div className='home-content layout'>
            <section className="shooting-stars">
                 <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
            </section>
                <div>
                    <h1>A platform built for a</h1>
                    <h1>new way of working</h1>
                </div>
                <Link to={`/board/${boards[0]._id}`}><button className='btn home-btn'>Get Started</button></Link> 
            </div>
        </section >
    )
}