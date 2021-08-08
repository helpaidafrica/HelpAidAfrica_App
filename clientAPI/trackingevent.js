import {
    Alert,
    Linking
} from 'react-native';
import { API_ENDPOINT } from './interfaceSPEC'
import { store } from '../redux'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import * as Location from 'expo-location';


// From wherever in app, we can assert success/failure of adding tracking event.
// response = {success: bool, data: string}
module.exports.handleEndState = async (response, navigation) => {
    switch (response.success) {
        // if add was successful
        case true:
            store.dispatch({ type: 'UPDATE_TRACKINGEVENTSTATE', trackingEventState: "addSuccess" })
            await module.exports.sleep(1500)
            navigation.navigate("Main")

            let s = store.getState()
            Alert.alert(s.trackingEventReducer.trackingEventState + " Please attach photos to WhatsApp. ")

            let text = `Hello! ${s.trackingEventReducer.userID} from HelpAidAfrica here. I'm attaching some photos from this tracking event. 
      \r
      TrackingInfoID: ${s.trackingEventReducer.trackingInfoID}\r
      TrackingEventState: ${s.trackingEventReducer.trackingEventState}\r

      <IMAGES OF THIS EVENT BELOW>
      `
            Linking.openURL(
                'http://api.whatsapp.com/send?phone=+1(510)520-2101&text=' + text
            );

            store.dispatch({ type: 'RESET_TRACKINGEVENT' })
            break;

            // if add failed
        case false:
            store.dispatch({ type: 'UPDATE_TRACKINGEVENTSTATE', trackingEventState: "addFailure" })
            Alert.alert("Failed to upload: " + response.data)
            break;
    }

    return
}

const updateBoxLocations = async () => {

    let trackingEventReducerData = store.getState().trackingEventReducer;

    const { trackingInfoID, userLocationID, boxes, destinationOrg, notes, userID } = trackingEventReducerData;
    // let trackingInfoID = '1';
    // let locationInfoID = '2';
    let destinationLocationInfoID = destinationOrg.id;
    let scanDateTime = new Date().toISOString()
    // let notes = 'hi'
    // let boxes = [{boxID: "2020-08-A-Box-1", nextBoxState: "NEW"}, {boxID: "2020-08-A-Box-2", nextBoxState: "NEW"}]

    let boxesMutation = ''
    boxes.map((box, index) => {
        let boxMutation = ` \r\n
    # add tracking location for box ${index} 
      track_box_${index}: createBoxLocation
      (input: {
        isActive: true, 
        locationInfoID: $locationInfoID, 
        trackingInfoID: $trackingInfoID, 
        destinationLocationInfoID: $destinationLocationInfoID,
        imageID: "0",       
        boxID: "${box.boxID}", 
        boxStatus: ${box.nextBoxState},
        scannedByUserID: $userID,
        scanDateTime: $scanDateTime,
        notes: $notes
      }
      )
      {id trackingInfoID boxID boxStatus scanDateTime scannedByUserID}
    `
        boxesMutation = boxesMutation.concat(boxMutation)
    })


    // graphql mutation
    let mutation =
        `mutation Track_Multiple_Boxes (
    $trackingInfoID: ID = "${trackingInfoID}",
    $userID: ID = "${userID}", 
    $locationInfoID: ID = "${userLocationID}", 
    $destinationLocationInfoID: ID = "${destinationLocationInfoID}", 
    $scanDateTime: AWSDateTime = "${new Date().toISOString()}",
    $notes: String="${notes}"
    ) { ${boxesMutation}}`

    console.log(mutation)

    // setup request
    let props = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': store.getState().sessionReducer.APIKEY },
        body: JSON.stringify({ query: mutation })
    }

    // return {success: false, data: "TODO update box location."}
    try {
        let response = await fetch(API_ENDPOINT, props);
        let r = await response.json();

        // check if error
        if (r.hasOwnProperty("error")) {
            return { success: false, data: JSON.stringify(r) }
        }

        // check if no data returned
        if (r.data.track_box_0 == null) {
            return { success: false, data: JSON.stringify(r) }
        }

        // if all good, proceed.
        // TODO: how do we confirm if it went thrugh OK? 
        // no checks in place thus far.

        return { success: true, data: "Redux state updated!" }


        // r = r.data.BoxByTitle.items[0]
    } catch (error) {
        console.log("API Health error code 1: " + error)
        return { success: false, data: JSON.stringify(error) }
    }
}

const createTrackingEventID = async () => {
    let trackingEventReducerData = store.getState().trackingEventReducer;

    const { userID } = trackingEventReducerData;
    console.log("SUer id is" + userID)

    // graphql mutation
    let mutation =
        `mutation createTrackInfo {
  createTrackingInfo(input: {userID: "${userID}", isActive: true, imageID: "0", 
  timeOfDelivery: "${new Date().toISOString()}"}) {
    id
    userID
  }
}`

    // setup request
    let props = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': store.getState().sessionReducer.APIKEY },
        body: JSON.stringify({ query: mutation })
    }

    let r;
    try {
        let response = await fetch(API_ENDPOINT, props);
        r = await response.json();

        console.log("Response: " + JSON.stringify(r))

        // check if error
        if (r.hasOwnProperty("error")) {
            return { success: false, data: JSON.stringify(r) }
        }

        // check if no data returned
        if (r.data.createTrackingInfo.id == null) {
            return { success: false, data: JSON.stringify(r) }
        }

        // if all good, proceed.
        let trackingInfoID = r.data.createTrackingInfo.id
        store.dispatch({ type: 'UPDATE_TRACKINGINFOID', trackingInfoID: trackingInfoID })
        return { success: true, data: "Redux state updated!" }


        // r = r.data.BoxByTitle.items[0]
    } catch (error) {
        console.log("API Health error code 1: " + error)
        return { success: false, data: JSON.stringify(r) }
    }
}

const AsyncPermissionsAlert = () => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            'Help Aid Africa',
            '"Help Aid Africa uses your location once per tracking event to know where you are with the boxes."',
            [
                {text: 'OK', onPress: () => resolve('OK') },
            ],
            { cancelable: true }
        )
    })
} 

const getLatLong = async () => {
    let { status1 } = await Location.getPermissionsAsync();
    if (status1 !== 'granted'){
        await AsyncPermissionsAlert()
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return { success: false, data: "Permission to access location was denied" }
        }
    }

    try {
        let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
        return { success: true, data: { latitude: location.coords.latitude, longitude: location.coords.longitude } }
    } catch (error) {
        return { success: false, data: error }
    }
}

const createUserLocationID = async () => {

    let r = await getLatLong();
    if (!r.success) {
        return { success: false, data: r.data }
    }

    // graphql mutation
    let mutation =
        `mutation create_user_currentLocation {
  create_user_currentLocation: createLocationInfo(input: 
    {isActive: true, 
      locationLabel: "this is the user current location", 
      latitude: ${r.data.latitude}, longitude: ${r.data.longitude}, addressID: "0"}) {
    id
    latitude
    longitude
  }
}`

    // setup request
    let props = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-KEY': store.getState().sessionReducer.APIKEY },
        body: JSON.stringify({ query: mutation })
    }


    try {
        let response = await fetch(API_ENDPOINT, props);
        let r = await response.json();
        console.log(r)

        // check if error
        if (r.hasOwnProperty("error")) {
            return { success: false, data: JSON.stringify(r) }
        }

        // check if no data returned
        if (r.data.create_user_currentLocation.id == null) {
            return { success: false, data: JSON.stringify(r) }
        }

        // if all good, proceed.
        let locationID = r.data.create_user_currentLocation.id
        store.dispatch({ type: 'UPDATE_USERLOCATIONID', userLocationID: locationID });
        return { success: true, data: "Redux state updated!" }


        // r = r.data.BoxByTitle.items[0]
    } catch (error) {
        console.log("API Health error code 1: " + error)
        return { success: false, data: JSON.stringify(error) }
    }
}

module.exports.addTrackingEvent = async (navigation) => {

    // Step 1: Let UI know we're adding
    store.dispatch({ type: 'UPDATE_TRACKINGEVENTSTATE', trackingEventState: "adding" })

    // Step 2: Create User Current Location ID
    let r1 = await createUserLocationID();
    if (!r1.success) {
        await module.exports.handleEndState({ success: false, data: r1.data }, navigation)
        return;
    }

    // Step 3: Create Tracking Event ID
    let r2 = await createTrackingEventID();
    if (!r1.success) {
        await module.exports.handleEndState({ success: false, data: r2.data }, navigation)
        return;
    }

    // Step 4: Update box location for every item.
    let r3 = await updateBoxLocations()
    if (!r3.success) {
        await module.exports.handleEndState({ success: false, data: r3.data }, navigation)
        return;
    }

    // if we've reached here, we gucci.

    // SIMULATED END RESULT
    let successResponse = {
        success: true,
        data: "Succeeded"
    }

    let failureResponse = {
        success: false,
        data: "Couldn't add tracking event: TODO reason."
    }

    await module.exports.handleEndState(successResponse, navigation)
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