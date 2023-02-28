import React from 'react'
import './SongItem.css'

import Bin from '../../../../../resources/icons/bin.svg'
import Button from '../../../../components/Button/Button'

export default function SongItem(props) {
    return (
        <div className="SongItem" onClick={() => props.onOpenClick(props.song)}>
            <p className="SongItem-name">{props.song.name}</p>
            <Button className="SongItem-delete" transparent round
                    onClick={event => {
                        event.stopPropagation()
                        props.onDeleteClick(props.project)
                    }}>
                <Bin />
            </Button>
        </div>
    )
}