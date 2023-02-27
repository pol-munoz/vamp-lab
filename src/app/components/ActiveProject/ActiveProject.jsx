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
        <div className="ProjectHome">
            {state.activeProject.name}
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
        </div>
    )
}