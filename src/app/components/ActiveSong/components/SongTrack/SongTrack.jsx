import React, {memo} from 'react'
import './SongTrack.css'
import {
    SET_TRACK_VOLUME_IN_ACTIVE_SONG,
    SET_TRACK_DEVICE_IN_ACTIVE_SONG,
    DELETE_TRACK_FROM_ACTIVE_SONG
} from '../../ActiveSongReducer'
import {Menu, MenuItem} from '@szhsin/react-menu'
import Button from '../../../../../components/Button/Button'
import Kebab from '../../../../../../resources/icons/kebab.svg'
import Bin from '../../../../../../resources/icons/bin.svg'
import '@szhsin/react-menu/dist/core.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

export default memo(function SongTrack(props) {
    const onVolumeChange = (trackId, volume) => {
        props.dispatch({
            type: SET_TRACK_VOLUME_IN_ACTIVE_SONG, payload: {trackId, volume}
        })
    }
    const onDeviceChange = (trackId, device) => {
        props.dispatch({
            type: SET_TRACK_DEVICE_IN_ACTIVE_SONG, payload: {trackId, device}
        })
    }
    const onDeleteTrack = track => {
        props.dispatch({
            type: DELETE_TRACK_FROM_ACTIVE_SONG,
            payload: {track}
        })
    }

    const options = Object.entries(props.devices).map(entry => {
        const [id, name] = entry
        return (<option key={id} value={id}>{name}</option>)
    }) ?? []

    console.log('Render track ' + props.track.name)
    return (<div className="SongTrack">
        <p className="SongTrack-title">{props.track.name}</p>
        <input className="SongTrack-volume" type="range" min="0" max="1" value={props.track.volume} step="0.01"
               onChange={event => {
                   onVolumeChange(props.track.id, event.target.value)
               }}/>
        <div className="Vamp-row SongTrack-tools">
            <select className="SongTrack-device" value={props.track.output}
                    onChange={event => {
                        onDeviceChange(props.track.id, event.target.value)
                    }}>
                {options}
            </select>

            {props.editable ?
                <Menu transition arrow
                      viewScroll="auto"
                      align="end"
                      menuButton={
                          <Button className="Vamp-snug-button-right" transparent circle>
                              <Kebab/>
                          </Button>
                      }>
                    <MenuItem onClick={() => onDeleteTrack(props.track)}>
                        <Button className="Vamp-menu-button" transparent destructive>
                            <p className="Vamp-menu-text">Delete</p>
                            <Bin/>
                        </Button>
                    </MenuItem>
                </Menu> : null}
        </div>
    </div>)
})