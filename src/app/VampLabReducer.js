import {addInit, addReducer, addStateReactor} from './RootReducer'
const vampLabInit = dispatch => {
    const updateDeviceList = async () => {
        const res = await navigator.mediaDevices.enumerateDevices()
        const devices = {}
        res.forEach(device => {
            if (device.kind === 'audiooutput') {
                devices[device.deviceId] = device.label
            }
        })
        dispatch({
            type: SET_DEVICES,
            payload: {devices}
        })
    }
    navigator.mediaDevices.addEventListener('devicechange', updateDeviceList)
    void updateDeviceList()
}

const vampLabReducer = (draft, action) => {
    switch (action.type) {
        case SET_DEVICES:
            draft.devices = action.payload.devices
            break
        default:
            break
    }
}

const vampLabStateReactor = (newState, action) => {
    if (action.type.startsWith(PERSIST_ACTIVE_PROJECT_ACTION)) {
        window.activeProject.save(newState.activeProject)
    }
}

addInit(vampLabInit)
addReducer(vampLabReducer)
addStateReactor(vampLabStateReactor)

export const PERSIST_ACTIVE_PROJECT_ACTION = '_VAMP_PAPA_'

export const SET_DEVICES = 'setDevices'