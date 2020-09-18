import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import {
    AsyncStorage,
} from 'react-native';

const persistConfig = {
	key: 'root',
  	storage: AsyncStorage,
  	blacklist: ['testReducer', 'sessionReducer'], // items in these reducers will not persist between app sessions. 
  	whitelist: ['addContactReducer', 'appStateReducer'] // items in these reducers will  persist between app sessions. 
}

import reducers from './reducers'
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { persistor, store }

export default { persistor, store}
