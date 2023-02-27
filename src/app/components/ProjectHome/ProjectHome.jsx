import React from 'react'
import './ProjectHome.css'
import {useOutletContext} from 'react-router-dom'

export default function ProjectHome(props) {
    const [project] = useOutletContext();
    console.log('RENDER ProjectHome')

    return (
        <div className="ProjectHome">
            {project.name}
        </div>
    )
}