const initialState = {
    userLocationID: null, // ID of the location of user
    trackingInfoID: null, // ID of the tracking event
    userID: "", // ID of the user. Manual input for now
    boxes: [], // [{boxID: "", nextBoxState: "", previousBoxState: ""}]
    destinationOrg: {id: 0, locationLabel: "Destination Location"},  // {id: #, locationLabel: "Human Readable Label"}
    notes: null,
    trackingEventState: null, // null, adding, addSuccess, addFailure
    images: [] // array of uris
}

const trackingEventReducer = (state = initialState, action) => {
    switch (action.type){
        case 'UPDATE_USERLOCATIONID':
            return {
                userLocationID: action.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'UPDATE_TRACKINGINFOID':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: action.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'UPDATE_BOXES':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: action.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'UPDATE_DESTINATION':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: action.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'UPDATE_NOTES':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: action.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'RESET_TRACKINGEVENT':
            return {
                userLocationID: initialState.userLocationID,
                trackingInfoID: initialState.trackingInfoID,
                boxes: initialState.boxes,
                destinationOrg: initialState.destinationOrg,
                notes: initialState.notes,
                trackingEventState: initialState.trackingEventState,
                userID: initialState.userID,
                images: initialState.images,
            }

        case 'UPDATE_TRACKINGEVENTSTATE':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: action.trackingEventState,
                userID: state.userID,
                images: state.images,
            }

        case 'UPDATE_USERID':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: action.userID,
                images: state.images,
            }

        case 'UPDATE_IMAGES':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes,
                trackingEventState: state.trackingEventState,
                userID: state.userID,
                images: action.images,
            }
        
    }

    return state
}

export default trackingEventReducer;
