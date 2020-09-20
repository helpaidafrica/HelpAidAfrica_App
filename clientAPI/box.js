import {
    Alert
} from 'react-native';
import {API_ENDPOINT} from './interfaceSPEC'
import {store} from '../redux'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


module.exports.searchForBox = async (boxID) => {

   store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searching"})
   await module.exports.sleep(2000)

   let failureResponse = {
   		message: "Box ID not found. Did you enter it exactly as shown?",
   		currentState: null,
   		nextState: null
   	}

   	let successResponse = {
   		message: "2020-08-A-Box-1-Womens Clothes-Western [43]",
   		currentState: "Shipping",
   		nextState: "Delivered"
   	}

   store.dispatch({type: 'UPDATE_BOX_DATA', boxData: successResponse})
   store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searchSuccess"})

   // note: login needs to get all user data shown in home screen, and put it in appStateReducer. 
}


module.exports.addBoxToEvent = async (payload, navigation) => {
    store.dispatch({type: 'ADDBOX_TOEVENT', addingBoxToEvent: true})
    await module.exports.sleep(2000)
    store.dispatch({type: 'ADDBOX_TOEVENT', addingBoxToEvent: false})

    console.log("box add to event TODO: " + JSON.stringify(payload))

    // Reset reducer states in AddBoxModal
    store.dispatch({type: 'RESET_ADDBOX'})

    // Leave modal
    navigation.goBack()
    return;
}

module.exports._test = async () => {
    console.log('success');
    return 'test successful';
}

// sleep time expects milliseconds
module.exports.sleep = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
