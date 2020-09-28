import {
    Alert
} from 'react-native';

import {API_ENDPOINT} from './interfaceSPEC'
import {store} from '../redux'

// checks if API is healthy. Returns boolean.
module.exports.fetchDestinations = async() => {
    let failed = {success:false, data: "Unable to reach HelpAidAfrica HQ."}

    // graphql query
    let query = `{
  listLocationInfos(filter: {locationLabel: {beginsWith: "Golden"}, isActive: {eq: true}}) {
    items {
      locationLabel
      id
      isActive
      latitude
      longitude
      plusCode
      addressID
      address {
        id
        addressLine1
        addressLine2
        label
        city
        state
        province
        country
        zipCode
      }
      notes
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
            return failed
        }
        return {success: true, data:r.data.listLocationInfos.items}
    } catch (error) {
        console.log("API Health error code 1: " + error)
        return failed;
    }
    
    return failed
}

module.exports._test = async () => {
    console.log('succes');
    return 'test successful';

}

// sleep time expects milliseconds
module.exports.sleep = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
