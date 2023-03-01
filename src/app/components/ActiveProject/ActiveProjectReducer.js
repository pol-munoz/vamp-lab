import Song from '../../../model/Song'
import {addReducer, addStateReactor} from '../../RootReducer'

const activeProjectReducer = (draft, action) => {
    switch (action.type) {
        case SET_ACTIVE_PROJECT: {
            draft.activeProject = action.payload.project
            break
        }
        case ADD_SONG_TO_ACTIVE_PROJECT: {
            let song = new Song(action.payload.name)
            draft.activeProject.songs[song.id] = song
            break
        }
        case DELETE_SONG_FROM_ACTIVE_PROJECT: {
            delete draft.activeProject.songs[action.payload.id]
            break
        }
        default: {
            break
        }
    }
}
const activeProjectStateReactor = (newState, action) => {
    if (action.type.startsWith(PERSIST_ACTIVE_PROJECT_ACTION)) {
        window.activeProject.save(newState.activeProject)
    }
}

addReducer(activeProjectReducer)
addStateReactor(activeProjectStateReactor)

const PERSIST_ACTIVE_PROJECT_ACTION = '_VAMP_PAPA_'

export const SET_ACTIVE_PROJECT = 'setActiveProject'
export const ADD_SONG_TO_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'addSongToActiveProject'
export const DELETE_SONG_FROM_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'deleteSongFromActiveProject'