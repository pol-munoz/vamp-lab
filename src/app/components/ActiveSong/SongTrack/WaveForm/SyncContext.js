
import React, {useState} from 'react'

export const SyncContext = React.createContext(null)

const SyncProvider = ({ children }) => {
    const [playing, setPlaying] = useState(false)
    const [lastPos, setLastPos] = useState(0.0)
    const [zoom, setZoom] = useState(0.0)

    const store = {
        playing: {playing, setPlaying},
        lastPos: {lastPos, setLastPos},
        zoom: {zoom, setZoom},
    }

    return <SyncContext.Provider value={store}>{children}</SyncContext.Provider>
}

export default SyncProvider