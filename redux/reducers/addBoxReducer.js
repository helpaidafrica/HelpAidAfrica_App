const initalState = {
    boxID_Number: "",
    boxSearch: null, // null (never searched), searching, searchFailure, searchSuccess
    boxData: null,
    boxScanned: true,
    addingBoxToEvent: false 
}

const addBoxReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'UPDATE_BOXID_NUMBER':
            return {
                boxID_Number: action.boxID_Number,
                boxSearch: state.boxSearch,
                boxData: state.boxData,
                boxScanned: state.boxScanned
            }

        case 'UPDATE_BOX_SEARCH':
            return {
                boxID_Number: state.boxID_Number,
                boxSearch: action.boxSearch,
                boxData: state.boxData,
                boxScanned: state.boxScanned
            }

        case 'UPDATE_BOX_DATA':
            return {
                boxID_Number: state.boxID_Number,
                boxSearch: state.boxSearch,
                boxData: action.boxData,
                boxScanned: state.boxScanned
            }

        case 'UPDATE_BOX_SCANNED':
            return {
                boxID_Number: state.boxID_Number,
                boxSearch: state.boxSearch,
                boxData: state.boxData,
                boxScanned: action.boxScanned
            }

        case 'RESET_ADDBOX':
            return {
                boxID_Number: initalState.boxID_Number,
                boxSearch: initalState.boxSearch,
                boxData: initalState.boxData,
                boxScanned: initalState.boxScanned
            }

        case 'ADDBOX_TOEVENT':
            return {
                boxID_Number: state.boxID_Number,
                boxSearch: state.boxSearch,
                boxData: state.boxData,
                boxScanned: state.boxScanned,
                addingBoxToEvent: action.addingBoxToEvent
            }

        default:
            return state

    }

    return state
}

export default addBoxReducer;
