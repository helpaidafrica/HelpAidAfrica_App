import { Platform } from 'react-native';


let PRIMARY_LIGHT = "#F8CD46" // light orange
let PRIMARY = "#4D2DDB"
let PRIMARY_GREEN = '#1F4523'

let DARKBLUE = "#0E4EA4";
let LIGHTBLUE = "#6792DD";
let DARKGREY = "#757575"
let LIGHTGREY = "#F8F8F8";
let WHITE = "#FFF";
let PURPLE = PRIMARY//"#6202EE"

let MATERIAL_DESELECTED = "#757575";

var Styles = {
    headerColor: PRIMARY_LIGHT,
    appBackgroundColor: LIGHTGREY,
    font: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    purple: PURPLE,
    grey: MATERIAL_DESELECTED,
    primary: PRIMARY,
    primaryGreen: PRIMARY_GREEN,
    primaryLight: PRIMARY_LIGHT,
    Icons: {
        darkIconColor: DARKBLUE
    },

    Text: {
        DarkTitle: DARKGREY,
        LightTitle: PURPLE
    },

    Button: {
        DarkBack: PURPLE,
        LightBack: LIGHTBLUE
    },

    card:{
        backgroundColor: 'white',
        width: "92%",
        alignSelf: 'center',
        borderRadius: 10,
        padding: 15,
        margin: 5
    },

    cancelRed: "#EB5757"
}

// export it
exports.Styles = Styles;
