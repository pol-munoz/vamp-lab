import Song from '../../../model/Song'

export const activeProjectReducer = (draft, action) => {
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
                draft.splice(index, 1)
            }
            break
        }
        default: {
            break
        }
    }
};


export const SET_ACTIVE_PROJECT = 'setActiveProject'
export const ADD_SONG_TO_ACTIVE_PROJECT = 'addSongToActiveProject'
export const REMOVE_SONG_FROM_ACTIVE_PROJECT = 'removeSongFromActiveProject'