import React from 'react'
import './index.css'
import './menu.css'
import {createRoot} from 'react-dom/client'
import {createMemoryRouter, RouterProvider} from 'react-router-dom'
import RecentProjects from './components/RecentProjects/RecentProjects'
import ActiveProject from './components/ActiveProject/ActiveProject'
import StoreProvider from './StoreContext'

function render() {
    const domNode = document.getElementById('root')
    const root = createRoot(domNode)
    const router = createMemoryRouter([
        {
            path: '/',
            element: <RecentProjects/>,
        },
        {
            path: '/project/home',
            element: <ActiveProject/>,
        },
    ])
    root.render(
        <StoreProvider>
            <RouterProvider router={router}/>
        </StoreProvider>
    )
}

render()