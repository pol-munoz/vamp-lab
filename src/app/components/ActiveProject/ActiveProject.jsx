import React, {useContext, useEffect} from 'react'
import './ActiveProject.css'
import { StoreContext } from '../../StoreContext'
import {addReducer} from '../../RootReducer'
import {activeProjectReducer} from './ActiveProjectReducer'
import Button from '../../../components/Button/Button'
import {useNavigate} from 'react-router-dom'

addReducer(activeProjectReducer)
export default function ActiveProject() {
    const { state, dispatch } = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <h2 className="Vamp-title">{state.activeProject.name} - Songs</h2>
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
            <div className="Vamp-screen-list">
            </div>
        </div>
    )
}