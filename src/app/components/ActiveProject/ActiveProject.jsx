import React, {useContext, useEffect} from 'react'
import './ActiveProject.css'
import { StoreContext } from '../../StoreContext'
import {addReducer} from '../../RootReducer'
import {useNavigate} from 'react-router-dom'
import {activeProjectReducer} from './ActiveProjectReducer'
import Button from '../../../components/Button/Button'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'

addReducer(activeProjectReducer)
export default function ActiveProject() {
    const { state, dispatch } = useContext(StoreContext)
    const navigate = useNavigate()

    let songs = []

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-header-pack">
                    <Button className="ActiveProject-back" transparent round
                            onClick={() => navigate(-1)} >
                        <ChevronLeft />
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - Songs</h3>
                </div>
                <Button onClick={() => {}}>
                    Add
                </Button>
            </div>
            <div className="Vamp-screen-list">
                {songs.length > 0 ? songs : <p className="Vamp-placeholder">This project's songs will appear here</p> }
            </div>
        </div>
    )
}