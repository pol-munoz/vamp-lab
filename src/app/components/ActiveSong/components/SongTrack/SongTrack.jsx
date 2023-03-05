import React, {memo, useContext} from 'react'
import './SongTrack.css'
import {StoreContext} from '../../../../StoreContext'
import {SET_TRACK_VOLUME} from '../../ActiveSongReducer'

export default memo(function SongTrack(props) {

    console.log("Render " + props.track.name)
    return (
        <div className="SongTrack">
            <p>{props.track.name}</p>
            <input type="range" min="0" max="1" value={props.track.volume} step="0.01" onChange={event => {
                props.onVolumeChange(props.track.id, event.target.value)
            }}/>
        </div>
    )
})