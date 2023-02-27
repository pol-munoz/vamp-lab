import React from 'react'
import './RecentProjectItem.css'
import Button from '../../../../components/Button/Button'

function onOpenClick(recentProject) {
    window.projects.openRecent(recentProject)
}

function onDeleteClick(event, recentProject) {
    event.stopPropagation()
    window.projects.deleteRecent(recentProject)
}

export default function RecentProjectItem(props) {
    return (
        <div className="RecentProjectItem" onClick={() => onOpenClick(props.project)}>
            <p className="RecentProjectItem-name">{props.project.name}</p>
            <p className="RecentProjectItem-path">{props.project.path}</p>
            <Button className="RecentProjectItem-delete" transparent round
                    onClick={event => onDeleteClick(event, props.project)}>
                ×
            </Button>
        </div>
    )
}