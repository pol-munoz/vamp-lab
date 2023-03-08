import './ActiveSong.css'
import React, {useContext} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'
import Play from '../../../../resources/icons/play.svg'
import Pause from '../../../../resources/icons/pause.svg'
import Stop from '../../../../resources/icons/stop.svg'
import Help from '../../../../resources/icons/help.svg'
import {ADD_TRACK_TO_ACTIVE_SONG} from './ActiveSongReducer'
import SongTrack from './SongTrack/SongTrack'
import {SyncContext} from './SongTrack/WaveForm/SyncContext'

export default function ActiveSong(props) {
    const {state, dispatch} = useContext(StoreContext)
    const sync = useContext(SyncContext)

    const navigate = useNavigate()
    const editable = state.editingSong

    const song = state.activeProject.songs[state.activeSongId]

    const onPlayPause = () => {
        sync.playing.setPlaying(!sync.playing.playing)
        sync.lastPos.setLastPos(Math.max(sync.lastPos.lastPos, 0.0001))
    }
    const onStop = () => {
        sync.playing.setPlaying(false)
        sync.lastPos.setLastPos(0)
    }
    const onHelp = () => {
        window.activeSong.showHelp()
    }

    const addTrack = async () => {
        const track = await window.activeSong.promptOpenTrack()

        if (track) {
            onStop()
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
                   editable={editable} duration={longestTrack.duration}/>
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
                        {sync.playing.playing ? <Pause/> : <Play/>}
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
            <div className="Vamp-footer">
                <div className="Vamp-row">
                    {editable ?
                        <Button className="Vamp-snug-button-left" transparent circle
                                onClick={onHelp}>
                            <Help/>
                        </Button>
                        : undefined}
                    <label className="Vamp-row ActiveSong-checkbox-wrapper">
                        <p className="ActiveSong-text">Sync scroll between tracks</p>
                        <input className="Vamp-checkbox" type="checkbox" checked={sync.scroll.enabled}
                               onChange={event => sync.scroll.setEnabled(Boolean(event.target.checked))}/>
                    </label>
                </div>
                <div className="Vamp-row">
                    <p className="ActiveSong-text">Zoom</p>
                    <input className="Vamp-slider" type="range" min={0} step={10} max={120} value={sync.zoom.zoom}
                           onChange={event => sync.zoom.setZoom(Number(event.target.value))}/>
                </div>
            </div>
        </div>
    )
}