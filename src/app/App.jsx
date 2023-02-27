import React, {useState} from 'react'
import "./App.css"

import {Outlet} from 'react-router-dom'

export default function App() {
    const [activeProject, setActiveProject] = useState({})
    console.log('RENDER App')

    return (
        <Outlet context={[activeProject, setActiveProject]} />
    )
}