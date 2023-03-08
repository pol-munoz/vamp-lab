import Song from '../../../model/Song'
import {addReducer} from '../../RootReducer'
import {PERSIST_ACTIVE_PROJECT_ACTION} from '../../VampLabReducer'

const activeProjectReducer = (draft, action) => {
    switch (action.type) {
        case SET_ACTIVE_PROJECT:
            draft.activeProject = action.payload.project
            break
        case ADD_SONG_TO_ACTIVE_PROJECT:
            const song = new Song(action.payload.name)
            draft.activeProject.songs[song.id] = song
            draft.activeSongId = song.id
            draft.editingSong = true
            break
        case DELETE_SONG_FROM_ACTIVE_PROJECT:
            delete draft.activeProject.songs[action.payload.id]
            break
        case RENAME_SONG_IN_ACTIVE_PROJECT:
            draft.activeProject.songs[action.payload.id].name = action.payload.name
            break
        default:
            break
    }
}
addReducer(activeProjectReducer)

export const SET_ACTIVE_PROJECT = 'setActiveProject'
export const ADD_SONG_TO_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'addSongToActiveProject'
export const RENAME_SONG_IN_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'renameSongInActiveProject'
export const DELETE_SONG_FROM_ACTIVE_PROJECT = PERSIST_ACTIVE_PROJECT_ACTION + 'deleteSongFromActiveProject'