import React from 'react'
import { Routes, Route } from 'react-router'
import { Provider } from 'react-redux';
import { BoardDetails } from './pages/board-details'
import { HomePage } from './pages/home-page'
import { store } from './store/store'

export function RootCmp() {

    return (
        <Provider store={store}>
            <div>
                <main>
                    <Routes>
                        <Route element={<HomePage />} path='/' />
                        <Route element={<BoardDetails />} path='/board' />
                    </Routes>
                </main>
            </div>
        </Provider>
    )
}
