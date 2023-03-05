import {useReducer} from 'react'
import produce from 'immer'

const inits = []
const childReducers = []
const stateReactors = []

const innerRootReducer = produce((draft, action) => {
    childReducers.forEach(reducer => {
        reducer(draft, action);
    })
    return draft
})

const rootReducer = (state, action) => {
    const nextState = innerRootReducer(state, action)
    stateReactors.forEach(reactor => reactor(nextState, action))
    return nextState
}

export const addInit = init => {
    inits.push(init)
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

export const removeStateReactor = reactor => {
    const index = stateReactors.indexOf(reactor)
    stateReactors.splice(index, 1)
}

export const useRootReducer = initialState => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return [state, dispatch, inits];
}