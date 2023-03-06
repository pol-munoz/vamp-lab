import {addReducer} from '../../RootReducer'
import {PERSIST_ACTIVE_PROJECT_ACTION} from '../../VampReducer'

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
        case SET_TRACK_VOLUME_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.trackId].volume = action.payload.volume
            break
        case SET_TRACK_DEVICE_IN_ACTIVE_SONG:
            draft.activeProject.songs[draft.activeSongId].tracks[action.payload.trackId].device = action.payload.device
            break
        default: break;
    }
}

addReducer(activeSongReducer)

export const SET_ACTIVE_SONG_EDITING = 'setActiveSongEditing'
export const SET_ACTIVE_SONG_PLAYING = 'setActiveSongPlaying'
export const ADD_TRACK_TO_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'addTrackToActiveSong'
export const SET_TRACK_VOLUME_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'setTrackVolume'
export const SET_TRACK_DEVICE_IN_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'setTrackDevice'