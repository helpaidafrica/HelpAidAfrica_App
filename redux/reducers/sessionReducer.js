import {API_KEY} from '../../clientAPI/interfaceSPEC'

const initalState = {
    LoggedIn: false,
    APIKEY: API_KEY,
    APIHealthOK: false,
}

const appStateReducer = (state = initalState, action) => {
    switch (action.type){
        case 'UPDATE_LOGIN':
            return {
                LoggedIn: action.status,
                APIKEY: state.APIKEY,
                APIHealthOK: state.APIHealthOK
            }

        case 'UPDATE_APIHEALTH':
            return {
                LoggedIn: state.status,
                APIKEY: state.APIKEY,
                APIHealthOK: action.APIHealthOK
            }
    }

    return state
}

export default appStateReducer;
