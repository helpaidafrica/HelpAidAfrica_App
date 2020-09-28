import {
    Alert
} from 'react-native';

import {API_ENDPOINT} from './interfaceSPEC'
import {store} from '../redux'

// checks to see if current user input matches what is in Async.
const isAccessGatePassed = async() =>{
    return store.getState().appStateReducer.AccessGatePassed
}

// checks if API is healthy. Returns boolean.
const isAPIHealthy = async() => {
    // graphql query
    let query = `{
        listApihealthCheckInfos(filter: {isActive: {eq: true}}) {
            items {
                proceed
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
        if (r.hasOwnProperty("error")){
            console.log("API Health error code 0: " + JSON.stringify(r))
            return false
        }
        return r.data.listApihealthCheckInfos.items[0].proceed
    } catch (error) {
        console.log("API Health error code 1: " + error)
        return false;
    }
    
    return true
}

// This runs every time the app launches. 
module.exports.startupSequence = async () => {

    // STEP 0: check API Health
    let APIHealthy = await isAPIHealthy();
    if (!APIHealthy){
        return {APIFailure: true, showLoginGate: true, showAccessGate:true} //debug
    }

    // STEP 1: check if we've passed the access gate
    let accessGatePassed = await isAccessGatePassed();
    if (!accessGatePassed){
        return {APIFailure: false, showLoginGate: true, showAccessGate:true}
    }

    // STEP 2: check if we've ever logged in
    return {APIFailure: false, showLoginGate: true, showAccessGate:false}
    // let r = await UserAPI.clientLogin()
    // if (!r.success){
    //     return {success: false, data:"Login issue"}
    // }

    // STEP 3: check if we need to login again

    return {APIFailure: false, showLoginGate: true, showAccessGate:true}
}

module.exports._test = async () => {
    console.log('succes');
    return 'test successful';

}

module.exports.checkAccessCode = async(codeAttempt) => {

    // TODO: expose schema to check access code with server.
    await module.exports.sleep(1000); // wait 2 sec to simulate

    if (codeAttempt !== "0786"){
        return {
            proceed: false,
            id: 'You passed in ' + codeAttempt,
            message: "Incorrect gate code."
        }
    }

    let dummyResponse = {
        proceed: true,
        id: 'You passed in: ' + codeAttempt,
        message: 'ok to enter'
    }

    store.dispatch({type: 'UPDATE_ACCESSGATE', AccessGatePassed: true})
    return dummyResponse
}

// sleep time expects milliseconds
module.exports.sleep = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
