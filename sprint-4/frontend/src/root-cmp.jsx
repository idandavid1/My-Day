import React from 'react'
import { Routes, Route } from 'react-router'
import { Provider } from 'react-redux';
import { BoardDetails } from './pages/board-details'
import { HomePage } from './pages/home-page'
import { store } from './store/store'
import { BoardModal } from './cmps/board/board-modal';

export function RootCmp() {

    return (
        <Provider store={store}>
            <div>
                <main>
                    <Routes>
                        <Route element={<HomePage />} path='/' />
                        {/* <Route element={<BoardDetails />} path='/board/:boardId/' /> */}
                        <Route element={<BoardDetails />} path='/board/:boardId/' />
                        <Route element={<BoardDetails />} path='/board/:boardId/:groupId/:taskId' />
                        {/* <Route element={<BoardDetails />} path='/board/:boardId/'>
                            <Route element={<BoardModal />} path=':groupId/:taskId' />
                        </Route> */}
                    </Routes>
                </main>
            </div>
        </Provider>
    )
}
