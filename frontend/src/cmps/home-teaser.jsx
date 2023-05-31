import React from 'react'
import { useState } from 'react'
import {views}  from '../constants/views'

const homeGif = require('../assets/gif/home-gif.mp4')

export default function HomeTeaser () {
    const [viewType, setViewType] = useState('Boards')

    const view = views.find(currView => currView.name === viewType)

    return (
        <section className='teaser'>
            <div className='layout'>
                <div className='teaser-header'>
                    <span className='teaser-header-title'><b>Everything </b>you need for any <b>workflow</b></span>
                    <p className='teaser-header-paragraph'>Easily build your ideal workflow with myday building blocks.</p>
                </div>
                <div className='views-container'>
                    {views.map(view => (
                        <div key={view.name} className={`view ${viewType === view.name && 'active'}`} onClick={() => setViewType(view.name)}>
                            {view.icon}
                            <span>{view.name}</span>
                            {viewType === view.name &&<span className='active-indicator'></span>}
                        </div>
                    ))}
                </div>
                <div className="teaser-container ">
                    <div className="teaser-content">
                        {view.icon}
                        <span>{view.name}</span>
                    </div>
                    <p className='teaser-description'>{view.description}</p>
                </div>
                <video className='home-gif' preload="auto" loop playsInline webkit-playsinline="" x5-playsinline="" muted={true} autoPlay={true} >
                    <source src={homeGif} />
                </video>
            </div>
        </section >
    )
}
