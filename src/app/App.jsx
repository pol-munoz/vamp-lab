import React, {useState} from 'react'
import "./App.css";

import {createMemoryRouter, Outlet, RouterProvider} from 'react-router-dom';
import ProjectManager from "./components/ProjectManager/ProjectManager";
import ProjectHome from './components/ProjectHome/ProjectHome'

export default function App() {
    const [activeProject, setActiveProject] = useState({})
    console.log('RENDER App')

    return (
        <Outlet context={[activeProject, setActiveProject]} />
    );
}