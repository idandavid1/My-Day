import React from 'react'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'

export function HomePage() {
    return (
        <section className='home-page'>
            <HomeHeader />
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
                <Link to={'/board'}><button className='btn home-btn'>Get Started</button></Link> 
            </div>
        </section >
    )
}