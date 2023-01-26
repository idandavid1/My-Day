import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { loadBoards } from '../store/board.actions'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsStars } from 'react-icons/bs'

const homeImg = require('../assets/img/home.avif')

export function HomePage() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards.length) return <div>Loading...</div>
    return (
        <section className='home-page'>
            <HomeHeader boards={boards} />
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
                <div className="headers-container">
                    <h1>A platform built for a
                        <br></br>
                        new way of working
                    </h1>
                </div>
                <div className="btn-container">
                    <Link to={`/board/${boards[0]._id}`}><button className='btn home-btn'>Get Started <span className="arrow"><HiOutlineArrowRight /></span></button></Link>
                    <p className="btn-text">No credit card needed <BsStars /> Unlimited time on Free Plan</p>
                </div>
            </div>
            {/* <div className="home-img-div full">
            </div> */}
                <img className="bottom-img" src={homeImg} />
        </section >
    )
}