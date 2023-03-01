import React from 'react'
import './RecentProjectItem.css'
import Button from '../../../../components/Button/Button'
import Cross from '../../../../../resources/icons/cross.svg'

export default function RecentProjectItem(props) {
    return (
        <div className="Vamp-screen-list-item RecentProjectItem" onClick={() => props.onOpenClick(props.project)}>
            <p className="RecentProjectItem-name">{props.project.name}</p>
            <p className="RecentProjectItem-path">{props.project.path}</p>
            <Button className="RecentProjectItem-remove" transparent round
                    onClick={event => {
                        event.stopPropagation()
                        props.onRemoveClick(props.project)
                    }}>
                <Cross />
            </Button>
        </div>
    )
}