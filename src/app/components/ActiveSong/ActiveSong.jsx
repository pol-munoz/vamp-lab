import React, {useContext} from 'react'
import {StoreContext} from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'

export default function ActiveSong(props) {
    const {state, dispatch} = useContext(StoreContext)
    const navigate = useNavigate()

    const edit = state.editingSong
    const song = state.activeProject.songs[state.activeSongId]

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-row">
                    <Button className="Vamp-back" transparent circle
                            onClick={() => navigate(-1)}>
                        <ChevronLeft/>
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - {song.name}</h3>
                </div>
            </div>
        </div>
    )
}