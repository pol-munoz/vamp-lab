import Song from '../../../model/Song'
import {addReducer, addStateReactor} from '../../RootReducer'

const activeProjectReducer = (draft, action) => {
    switch (action.type) {
        case SET_ACTIVE_PROJECT: {
            draft.activeProject = action.payload
            break
        }
        case ADD_SONG_TO_ACTIVE_PROJECT: {
            draft.activeProject.songs.push(new Song(action.payload))
            break
        }
        case REMOVE_SONG_FROM_ACTIVE_PROJECT: {
            const index = draft.activeProject.songs.findIndex(song => song.name === action.payload)
            if (index !== -1) {
                draft.activeProject.songs.splice(index, 1)
            }
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
export const REMOVE_SONG_FROM_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'removeSongFromActiveProject'