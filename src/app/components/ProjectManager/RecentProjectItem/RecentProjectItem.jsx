import React from 'react'
import './RecentProjectItem.css'

export default function RecentProjectItem(props) {
    return (
        <div>
            <p>{props.project.name}</p>
            <p>{props.project.path}</p>
        </div>
    )
}