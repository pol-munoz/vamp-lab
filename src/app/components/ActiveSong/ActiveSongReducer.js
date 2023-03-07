import {addReducer} from '../../RootReducer'
import {PERSIST_ACTIVE_PROJECT_ACTION} from '../../VampLabReducer'

const activeSongReducer = (draft, action) => {
    switch (action.type) {
        case SET_ACTIVE_SONG_EDITING:
            draft.activeSongId = action.payload.id
            draft.editingSong = true
            break
        case SET_ACTIVE_SONG_PLAYING:
            draft.activeSongId = action.payload.id
            draft.editingSong = false
            break
        case ADD_TRACK_TO_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.track.id] = action.payload.track
            break
        case UPDATE_TRACK_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.track.id] = action.payload.track
            break
        case DELETE_TRACK_FROM_ACTIVE_SONG:
            delete draft.activeProject.songs[draft.activeSongId].tracks[action.payload.track.id]
            break
        case SET_TRACK_VOLUME_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.trackId].volume = action.payload.volume
            break
        case SET_TRACK_DEVICE_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.trackId].device = action.payload.device
            break
        case ADD_VAMP_TO_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].vamps[action.payload.vamp.id] = action.payload.vamp
            break
        case UPDATE_VAMP_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].vamps[action.payload.vamp.id] = action.payload.vamp
            break
        case DELETE_VAMP_FROM_ACTIVE_SONG:
            delete draft.activeProject.songs[draft.activeSongId].vamps[action.payload.vamp.id]
            break
        default: break;
    }
}

addReducer(activeSongReducer)

export const SET_ACTIVE_SONG_EDITING = 'setActiveSongEditing'
export const SET_ACTIVE_SONG_PLAYING = 'setActiveSongPlaying'
export const ADD_TRACK_TO_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'addTrackToActiveSong'
export const DELETE_TRACK_FROM_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'deleteTrackFromActiveSong'
export const UPDATE_TRACK_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'updateTrackInActiveSong'
export const SET_TRACK_VOLUME_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'setTrackVolumeInActiveSong'
export const SET_TRACK_DEVICE_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'setTrackDeviceInActiveSong'
export const ADD_VAMP_TO_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'addVampToActiveSong'
export const DELETE_VAMP_FROM_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'deleteVampFromActiveSong'
export const UPDATE_VAMP_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'updateVampInActiveSong'