import testReducer from './testReducer'
import addBoxReducer from './addBoxReducer'
import appStateReducer from './appStateReducer'
import sessionReducer from './sessionReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    testReducer,
    addBoxReducer,
    appStateReducer,
    sessionReducer
})

export default reducers;
