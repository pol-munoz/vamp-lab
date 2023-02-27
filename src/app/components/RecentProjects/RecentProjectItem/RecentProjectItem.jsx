import React from 'react'
import './RecentProjectItem.css'
import Button from '../../../../components/Button/Button'

export default function RecentProjectItem(props) {
    return (
        <div className="RecentProjectItem" onClick={() => props.onOpenClick(props.project)}>
            <p className="RecentProjectItem-name">{props.project.name}</p>
            <p className="RecentProjectItem-path">{props.project.path}</p>
            <Button className="RecentProjectItem-delete" transparent round
                    onClick={event => {
                        event.stopPropagation()
                        props.onDeleteClick(props.project)
                    }}>
                ×
            </Button>
        </div>
    )
}