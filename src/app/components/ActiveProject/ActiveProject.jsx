import React, {useContext} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import {
    ADD_SONG_TO_ACTIVE_PROJECT,
    DELETE_SONG_FROM_ACTIVE_PROJECT,
    RENAME_SONG_IN_ACTIVE_PROJECT
} from './ActiveProjectReducer'
import {SET_ACTIVE_SONG_EDITING, SET_ACTIVE_SONG_PLAYING} from '../ActiveSong/ActiveSongReducer'
import Button from '../../../components/Button/Button'
import SongItem from './SongItem/SongItem'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'

export default function ActiveProject() {
    const {state, dispatch} = useContext(StoreContext)
    const navigate = useNavigate()

    const navigateToSong = () => {
        navigate('song')
    }

    const addSong = async () => {
        const name = await window.activeProject.promptSongName()

        if (!!name && !!name.trim()) {
            dispatch({
                type: ADD_SONG_TO_ACTIVE_PROJECT, payload: {name}
            })
            navigateToSong()
        }
    }
    const renameSong = async song => {
        const name = await window.activeProject.promptSongRename(song.name)
        const id = song.id

        if (!!name && !!name.trim() && name !== song.name) {
            dispatch({
                type: RENAME_SONG_IN_ACTIVE_PROJECT, payload: {id, name}
            })
        }
    }

    const playSong = song => {
        const id = song.id
        dispatch({
            type: SET_ACTIVE_SONG_PLAYING, payload: {id}
        })
        navigateToSong()
    }

    const editSong = song => {
        const id = song.id
        dispatch({
            type: SET_ACTIVE_SONG_EDITING, payload: {id}
        })
        navigateToSong()
    }

    const deleteSong = async song => {
        const confirm = await window.activeProject.promptConfirmDeleteSong(song.name)
        if (confirm) {
            const id = song.id
            dispatch({
                type: DELETE_SONG_FROM_ACTIVE_PROJECT, payload: {id}
            })
        }
    }


    const songs = Object.entries(state.activeProject?.songs).map(entry => {
        const [_, song] = entry
        return (<SongItem key={song.id} song={song}
                          onPlayClick={playSong} onEditClick={editSong} onDeleteClick={deleteSong}
                          onRenameClick={renameSong}/>)
    }) ?? []

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-row">
                    <Button className="Vamp-back" transparent circle
                            onClick={() => navigate(-1)}>
                        <ChevronLeft/>
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - Songs</h3>
                </div>
                <Button onClick={addSong} rounded>
                    Add Song
                </Button>
            </div>
            <div className="Vamp-screen-list">
                {songs.length > 0 ? songs : <p className="Vamp-placeholder">This project's songs will appear here</p>}
            </div>
        </div>
    )
}