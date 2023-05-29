import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { loadBoards } from '../store/board.actions'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsStars } from 'react-icons/bs'
import { Loader } from '../cmps/loader'

const homeImg = require('../assets/img/home.avif')

export function HomePage() {
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
                        <span>A platform built for a</span>
                        <span>new way of working</span>
                    </h1>
                    <h2>Start managing with MyDay Work OS</h2>
                </div>
                <Link to={`/board/${boards[0]._id}`}><button className='get-started-btn'>Get Started <span className="arrow"><HiOutlineArrowRight /></span></button></Link>
                <p>No credit card needed <BsStars /> Unlimited time on Free Plan</p>
            </div>
            <img className="hero" src={homeImg} alt="" />
        </section >
    )
}