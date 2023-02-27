import { useImmerReducer } from 'use-immer'

const childReducers = []

const rootReducer = (draft, action) => {
    childReducers.forEach(reducer => {
        draft = reducer(draft, action);
    })
    return draft
}

export const addReducer = reducer => {
    childReducers.push(reducer)
}

export const removeReducer = reducer => {
    const index = childReducers.indexOf(reducer)
    childReducers.splice(index, 1)
}

export const useRootReducer = initialState => {
    const [state, dispatch] = useImmerReducer(rootReducer, initialState)
    return [state, dispatch];
}