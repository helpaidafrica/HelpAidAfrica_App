import testReducer from './testReducer'
import addContactReducer from './addContactReducer'
import appStateReducer from './appStateReducer'
import sessionReducer from './sessionReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    testReducer,
    addContactReducer,
    appStateReducer,
    sessionReducer
})

export default reducers;
