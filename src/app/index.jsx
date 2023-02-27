import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {createMemoryRouter, RouterProvider} from 'react-router-dom'
import ProjectManager from './components/ProjectManager/ProjectManager'
import ProjectHome from './components/ProjectHome/ProjectHome'

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
                    element: <ProjectManager/>,
                },
                {
                    path: '/project/home',
                    element: <ProjectHome/>,
                },
            ]
        }
    ]);
    root.render(<RouterProvider router={router}/>)
}

render()