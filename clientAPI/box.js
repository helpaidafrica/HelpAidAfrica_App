import {
    Alert
} from 'react-native';
import {API_ENDPOINT} from './interfaceSPEC'
import {store} from '../redux'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


module.exports.searchForBox = async (boxID) => {

   store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searching"})

   // SIMULATED SEARCH
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

    // REAL SEARCH
    // graphql query
    let query = `{
      BoxByTitle(title: "${boxID}") {
        items {
          id
          status
          title
          notes
          boxCategory {
            name
          }
        }
      }
    }`

    // setup request
    let props = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': store.getState().sessionReducer.APIKEY },
        body: JSON.stringify({ query: query })
    }

    // 
    try {
        let response = await fetch(API_ENDPOINT, props);
        let r = await response.json();
        console.log(r)

        // check if error
        if (r.hasOwnProperty("error")){
            console.log("API Health error code 0: " + JSON.stringify(r))
            store.dispatch({type: 'UPDATE_BOX_DATA', boxData: {message:"Failed: " + r}})
            store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searchFailure"})
            return false
        }

        // check if no data returned
        if (r.data.BoxByTitle.items.length == 0){
            store.dispatch({type: 'UPDATE_BOX_DATA', boxData: {message: "No box with that ID found"}})
            store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searchFailure"})
            return false
        }

        // if all good, proceed.
        r = r.data.BoxByTitle.items[0]
        store.dispatch({type: 'UPDATE_BOX_DATA', boxData: {message: r.id, currentState: r.status, nextState: "TODO"}})
        store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searchSuccess"})


        // r = r.data.BoxByTitle.items[0]
    } catch (error) {
        console.log("API Health error code 1: " + error)
        store.dispatch({type: 'UPDATE_BOX_DATA', boxData: failureResponse})
        store.dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: "searchFailure"})
        return false;
    }
    
    return true

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
