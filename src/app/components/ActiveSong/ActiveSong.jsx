import './ActiveSong.css'
import React, {useContext, useState} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'
import Play from '../../../../resources/icons/play.svg'
import Pause from '../../../../resources/icons/pause.svg'
import Stop from '../../../../resources/icons/stop.svg'
import {ADD_TRACK_TO_ACTIVE_SONG} from './ActiveSongReducer'
import SongTrack from './SongTrack/SongTrack'

export default function ActiveSong(props) {

    const [playing, setPlaying] = useState(false)
    const [lastPos, setLastPos] = useState(0.0)
    const [zoom, setZoom] = useState(0.0)
    const {state, dispatch} = useContext(StoreContext)
    const navigate = useNavigate()
    const editable = state.editingSong

    const song = state.activeProject.songs[state.activeSongId]

    const onPlayPause = () => {
        setPlaying(!playing)
        setLastPos(Math.max(lastPos, 0.0001))
    }
    const onStop = () => {
        setPlaying(false)
        setLastPos(0)
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

    let trackData = Object.entries(song.tracks).map(entry => entry[1])

    let longestTrack = trackData.reduce((a, b) => a.duration > b.duration ? a : b, 0)

    const tracks = trackData.map(track => (
        <SongTrack key={track.id} dispatch={dispatch} track={track} devices={state.devices} vamps={song.vamps}
                   editable={editable} playing={playing} duration={longestTrack.duration}
                   zoom={zoom} lastPos={lastPos} setLastPos={setLastPos}/>
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
                    <Button className="Vamp-snug-button-right" transparent circle
                            onClick={onStop}>
                        <Stop/>
                    </Button>
                </div>
            </div>
            <div className="Vamp-screen-list">
                {tracks.length > 0 ? tracks :
                    <p className="Vamp-placeholder">This song's tracks will appear here</p>}
            </div>
            <div className="Vamp-footer ActiveSong-footer">
                <p className="ActiveSong-zoom-text">Zoom</p>
                <input type="range" min={0} step={10} max={120} value={zoom} onChange={event => setZoom(Number(event.target.value))} />
            </div>
        </div>
    )
}