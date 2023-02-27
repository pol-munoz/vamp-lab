export const activeProjectReducer = (draft, action) => {
    switch (action.type) {
        case "setActiveProject": {
            draft.activeProject = action.payload
            break
        }
        default: {
            break
        }
    }
};
