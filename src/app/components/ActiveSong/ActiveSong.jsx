import React, {memo, useContext, useState} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'
import Play from '../../../../resources/icons/play.svg'
import Pause from '../../../../resources/icons/pause.svg'
import {ADD_TRACK_TO_ACTIVE_SONG, DELETE_TRACK_FROM_ACTIVE_SONG} from './ActiveSongReducer'
import SongTrack from './components/SongTrack/SongTrack'
import VampBar from './components/VampBar/VampBar'

export default function ActiveSong(props) {

    const [playing, setPlaying] = useState(false)
    const {state, dispatch} = useContext(StoreContext)
    const navigate = useNavigate()
    const editable = state.editingSong

    const song = state.activeProject.songs[state.activeSongId]
    console.log('Render song: ' + song.name)

    const onPlayPause = () => {
        setPlaying(!playing)
    }

    const addTrack = async () => {
        const track = await window.activeSong.promptOpenTrack()

        if (track) {
            dispatch({
                type: ADD_TRACK_TO_ACTIVE_SONG,
                payload: {track}
            })
        }
    }
    const deleteTrack = async (track) => {
        dispatch({
            type: DELETE_TRACK_FROM_ACTIVE_SONG,
            payload: {track}
        })
    }
    let trackData = Object.entries(song.tracks).map(entry => entry[1])

    let longestTrack = trackData.reduce((a, b) => a.duration > b.duration ? a : b, 0)

    const tracks = trackData.map(track => (
        <SongTrack key={track.id} dispatch={dispatch} track={track} devices={state.devices}
                   onDeleteClick={deleteTrack}
                   editable={editable} playing={playing}/>
    )) ?? []

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-row">
                    <Button className="Vamp-snug-button-left" transparent circle
                            onClick={() => navigate(-1)}>
                        <ChevronLeft/>
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - {song.name}</h3>
                </div>
                <div className="Vamp-row">
                    {editable ? (
                        <Button rounded
                                onClick={addTrack}>
                            Add Track
                        </Button>
                    ) : null}
                    <Button className="Vamp-snug-button-right" transparent circle
                            onClick={onPlayPause}>
                        {playing ? <Pause/> : <Play/>}
                    </Button>
                </div>
            </div>
            {tracks.length > 0 ?
                <VampBar vamps={song.vamps} dispatch={dispatch} duration={longestTrack.duration}/>
                : null}
            <div className="Vamp-screen-list">
                {tracks.length > 0 ? tracks :
                    <p className="Vamp-placeholder">This song's vamps and tracks will appear here</p>}
            </div>
        </div>
    )
}