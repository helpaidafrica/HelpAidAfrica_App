const initalState = {
    userLocationID: null, // ID of the location of user
    trackingInfoID: null, // ID of the tracking event
    boxes: [], // [{boxID: "", nextBoxState: ""}]
    destinationOrg: {id: 0, locationLabel: "Destination Location"},  // {id: #, locationLabel: "Human Readable Label"}
    notes: null
}

const trackingEventReducer = (state = initalState, action) => {
    switch (action.type){
        case 'UPDATE_LOCATIONID':
            return {
                userLocationID: action.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes
            }

        case 'UPDATE_TRACKINGINFOID':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: action.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes
            }

        case 'UPDATE_BOXES':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: action.boxes,
                destinationOrg: state.destinationOrg,
                notes: state.notes
            }

        case 'UPDATE_DESTINATION':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: action.destinationOrg,
                notes: state.notes
            }

        case 'UPDATE_NOTES':
            return {
                userLocationID: state.userLocationID,
                trackingInfoID: state.trackingInfoID,
                boxes: state.boxes,
                destinationOrg: state.destinationOrg,
                notes: action.notes
            }

        case 'RESET_TRACKINGEVENT':
            return {
                userLocationID: initialState.userLocationID,
                trackingInfoID: initialState.trackingInfoID,
                boxes: initialState.boxes,
                destinationOrg: initialState.destinationOrg,
                notes: initialState.notes
            }
        
    }

    return state
}

export default trackingEventReducer;
