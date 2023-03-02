import React from 'react'
import './SongItem.css'

import Bin from '../../../../../resources/icons/bin.svg'
import TextCursor from '../../../../../resources/icons/textCursor.svg'
import Play from '../../../../../resources/icons/Play.svg'
import Pencil from '../../../../../resources/icons/pencil.svg'
import Kebab from '../../../../../resources/icons/kebab.svg'
import Button from '../../../../components/Button/Button'

export default function SongItem(props) {
    return (
        <div className="Vamp-screen-list-item SongItem">
            <p className="SongItem-name">{props.song.name}</p>
            <div className="Vamp-row">
                <Button className="SongItem-action" onClick={() => props.onPlayClick(props.song)} transparent round>
                    <Play />
                </Button>
                <Button className="SongItem-action" onClick={() => props.onEditClick(props.song)} transparent round>
                    <Pencil />
                </Button>
                {/* TODO Move this to a submenu */}
                <Button className="SongItem-action" onClick={() => {}} transparent round>
                    <Kebab />
                </Button>
                <Button className="SongItem-action" onClick={() => props.onRenameClick(props.song)} transparent round>
                    <TextCursor />
                </Button>
                <Button className="SongItem-action" transparent round destructive
                        onClick={event => {
                            event.stopPropagation()
                            props.onDeleteClick(props.song)
                        }}>
                    <Bin />
                </Button>
            </div>
        </div>
    )
}