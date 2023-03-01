import React from 'react'
import './SongItem.css'

import Bin from '../../../../../resources/icons/bin.svg'
import Button from '../../../../components/Button/Button'

export default function SongItem(props) {
    return (
        <div className="Vamp-screen-list-item SongItem" onClick={() => props.onOpenClick(props.song)}>
            <p className="SongItem-name">{props.song.name}</p>
            <Button className="SongItem-delete" transparent round destructive
                    onClick={event => {
                        event.stopPropagation()
                        props.onDeleteClick(props.song)
                    }}>
                <Bin />
            </Button>
        </div>
    )
}