import React from 'react'
import './SongItem.css'

import Bin from '../../../../../resources/icons/bin.svg'
import TextCursor from '../../../../../resources/icons/textCursor.svg'
import Play from '../../../../../resources/icons/Play.svg'
import Pencil from '../../../../../resources/icons/pencil.svg'
import Button from '../../../../components/Button/Button'
import Kebab from '../../../../../resources/icons/kebab.svg'
import {Menu, MenuItem} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

export default function SongItem(props) {
    return (
        <div className="Vamp-screen-list-item SongItem">
            <p className="SongItem-name">{props.song.name}</p>
            <div className="Vamp-row">
                <Button className="SongItem-action" onClick={() => props.onPlayClick(props.song)} transparent circle>
                    <Play/>
                </Button>
                <Button className="SongItem-action" onClick={() => props.onEditClick(props.song)} transparent circle>
                    <Pencil/>
                </Button>
                <Menu transition arrow
                      className="Dropdown-container"
                      menuClassName="Dropdown"
                      viewScroll="auto"
                      align="end"
                      menuButton={
                          <Button transparent circle>
                              <Kebab/>
                          </Button>
                      }
                >
                    <MenuItem className="Dropdown-item" onClick={() => props.onRenameClick(props.song)}>
                        <Button className="SongItem-menu-button" transparent>
                            <p className="SongItem-menu-text">Rename</p>
                            <TextCursor/>
                        </Button>
                    </MenuItem>
                    <MenuItem className="Dropdown-item" onClick={() => props.onDeleteClick(props.song)}>
                        <Button className="SongItem-menu-button" transparent destructive>
                            <p className="SongItem-menu-text">Delete</p>
                            <Bin/>
                        </Button>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}