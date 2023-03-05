import {addInit, addReducer, addStateReactor} from './RootReducer'
const vampInit = async dispatch => {
    const res = await navigator.mediaDevices.enumerateDevices()
    const devices = {}
    res.forEach(device => {
        if (device.kind === 'audiooutput') {
            devices[device.deviceId] = device
        }
    })
    dispatch({
        type: SET_DEVICES,
        payload: {devices}
    })
}

const vampReducer = (draft, action) => {
    switch (action.type) {
        case SET_DEVICES:
            draft.devices = action.payload.devices
            break
        default:
            break
    }
}

const vampStateReactor = (newState, action) => {
    if (action.type.startsWith(PERSIST_ACTIVE_PROJECT_ACTION)) {
        window.activeProject.save(newState.activeProject)
    }
}

addInit(vampInit)
addReducer(vampReducer)
addStateReactor(vampStateReactor)

export const PERSIST_ACTIVE_PROJECT_ACTION = '_VAMP_PAPA_'

export const SET_DEVICES = 'setDevices'