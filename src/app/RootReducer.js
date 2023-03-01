import {useReducer} from 'react'
import produce from 'immer'

const childReducers = []
const stateReactors = []

const innerRootReducer = produce((draft, action) => {
    childReducers.forEach(reducer => {
        draft = reducer(draft, action);
    })
    return draft
})

const rootReducer = (state, action) => {
    let nextState = innerRootReducer(state, action)
    stateReactors.forEach(reactor => reactor(nextState, action))
    return nextState
}

export const addReducer = reducer => {
    childReducers.push(reducer)
}

export const addStateReactor = reactor => {
    stateReactors.push(reactor)
}

export const removeReducer = reducer => {
    const index = childReducers.indexOf(reducer)
    childReducers.splice(index, 1)
}

export const useRootReducer = initialState => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return [state, dispatch];
}