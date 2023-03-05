import {addReducer, addStateReactor} from '../../RootReducer'
import {PERSIST_ACTIVE_PROJECT_ACTION} from '../ActiveProject/ActiveProjectReducer'

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
        default: break;
    }
}

addReducer(activeSongReducer)

export const SET_ACTIVE_SONG_EDITING = 'setActiveSongEditing'
export const SET_ACTIVE_SONG_PLAYING = 'setActiveSongPlaying'
export const ADD_TRACK_TO_ACTIVE_SONG = PERSIST_ACTIVE_PROJECT_ACTION + 'addTrackToActiveSong'