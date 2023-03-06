import React, {memo, useContext, useState} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'
import Play from '../../../../resources/icons/play.svg'
import Pause from '../../../../resources/icons/pause.svg'
import {ADD_TRACK_TO_ACTIVE_SONG} from './ActiveSongReducer'
import SongTrack from './SongTrack/SongTrack'

export default function ActiveSong(props) {

    const [playing, setPlaying] = useState(false)
    const {state, dispatch} = useContext(StoreContext)
    const navigate = useNavigate()
    const edit = state.editingSong

    const song = state.activeProject.songs[state.activeSongId]
    console.log('Render song: ' + song.name)

    const onPlayPause = () => {
        setPlaying(!playing)
    }

    const onAddTrack = async () => {
        const track = await window.activeSong.promptOpenTrack()

        if (track) {
            dispatch({
                type: ADD_TRACK_TO_ACTIVE_SONG,
                payload: {track}
            })
        }
    }

    const tracks = Object.entries(song.tracks).map(entry => {
        const [_, track] = entry
        return (<SongTrack key={track.id} track={track} dispatch={dispatch} devices={state.devices} playing={playing}/>)
    }) ?? []

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-row">
                    <Button className="Vamp-header-button-left" transparent circle
                            onClick={() => navigate(-1)}>
                        <ChevronLeft/>
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - {song.name}</h3>
                </div>
                <div className="Vamp-row">
                    {edit ? (
                        <Button rounded
                                onClick={onAddTrack}>
                            Add Track
                        </Button>
                    ) : null}
                    <Button className="Vamp-header-button-right" transparent circle
                            onClick={onPlayPause}>
                        {playing ? <Pause/> : <Play/>}
                    </Button>
                </div>
            </div>

            <div className="Vamp-screen-list">
                {tracks.length > 0 ? tracks : <p className="Vamp-placeholder">This song's tracks will appear here</p>}
            </div>
        </div>
    )
}