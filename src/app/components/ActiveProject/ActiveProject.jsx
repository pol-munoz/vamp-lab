import React from 'react'
import './ActiveProject.css'
import {useOutletContext} from 'react-router-dom'

export default function ActiveProject(props) {
    const [project] = useOutletContext();
    console.log('RENDER ActiveProject')

    return (
        <div className="ProjectHome">
            {project.name}
        </div>
    )
}