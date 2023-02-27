import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {createMemoryRouter, RouterProvider} from 'react-router-dom'
import RecentProjects from './components/RecentProjects/RecentProjects'
import ActiveProject from './components/ActiveProject/ActiveProject'

function render() {
    const domNode = document.getElementById('root')
    const root = createRoot(domNode)
    const router = createMemoryRouter([
        {
            path: '/',
            element: <App/>,
            children: [
                {
                    path: '/',
                    element: <RecentProjects/>,
                },
                {
                    path: '/project/home',
                    element: <ActiveProject/>,
                },
            ]
        }
    ]);
    root.render(<RouterProvider router={router}/>)
}

render()