import React, {memo, useContext} from 'react'
import './SongTrack.css'
import {SET_TRACK_VOLUME_IN_ACTIVE_SONG, SET_TRACK_DEVICE_IN_ACTIVE_SONG} from '../ActiveSongReducer'

export default memo(function SongTrack(props) {
    console.log("Render track: " + props.track.name)

    const onVolumeChange = (trackId, volume) => {
        props.dispatch({
            type: SET_TRACK_VOLUME_IN_ACTIVE_SONG,
            payload: {trackId, volume}
        })
    }
    const onDeviceChange = (trackId, device) => {
        props.dispatch({
            type: SET_TRACK_DEVICE_IN_ACTIVE_SONG,
            payload: {trackId, device}
        })
    }

    const options =  Object.entries(props.devices).map(entry => {
        const [id, name] = entry
        return (<option key={id} value={id}>{name}</option>)
    }) ?? []

    // const device = props.devices[props.track.output] ? props.track.output : 'default'

    return (
        <div className="SongTrack">
            <p className="SongTrack-title">{props.track.name}</p>
            <input className="SongTrack-volume" type="range" min="0" max="1" value={props.track.volume} step="0.01" onChange={event => {
                onVolumeChange(props.track.id, event.target.value)
            }}/>
            <select className="SongTrack-device" disabled={props.playing} value={props.track.output} onChange={event => {
                onDeviceChange(props.track.id, event.target.value)
            }}>
                {options}
            </select>
        </div>
    )
})