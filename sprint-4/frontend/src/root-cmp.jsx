import React from 'react'
import { Routes, Route } from 'react-router'
import { BoardDetails } from './pages/board-details'
import { HomePage } from './pages/home-page'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route element={<HomePage />} path='/' />
                    <Route element={<BoardDetails />} path='/board' />
                </Routes>
            </main>
        </div>
    )
}


