import React from 'react'

import { useRootReducer } from './RootReducer'
import Project from '../model/Project'

export const StoreContext = React.createContext({})

const initialState = {
    recentProjects: [],
    activeProject: new Project(),
    activeSongId: '',
    editingSong: false,
}

const StoreProvider = (props) => {
    const [state, dispatch] = useRootReducer(initialState)
    const context = { state, dispatch }

    return <StoreContext.Provider value={context}>{props.children}</StoreContext.Provider>
}

export default StoreProvider
