import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { loadBoards } from '../store/board.actions'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { BsStars } from 'react-icons/bs'
import { Loader } from '../cmps/loader'

const homeImg = require('../assets/img/home.avif')

export function HomePage () {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    
    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards.length) return <Loader />
    return (
        <section className='home-page '>
            <HomeHeader boards={boards} />
            <div className='home-content layout'>
                <div className="headers-container flex column space-between">
                    <h1 className='main-title'>
                        <span>A Platform Built For A</span>
                        <span>New Way Of Working</span>
                    </h1>
                    <h2 className='secondary-title'>Start managing with MyDay Work OS</h2>
                </div>
                <div className='get-started'>
                    <Link to={`/board/${boards[0]._id}`} className='get-started-btn'>
                        Get Started
                        <HiArrowNarrowRight className='arrow' />
                    </Link>
                    <p className='home-paragraph'>No credit card needed <BsStars /> Unlimited time on Free Plan</p>
                </div>
            </div>
            <img className="hero" src={homeImg} alt="hero-img" />
        </section >
    )
}
