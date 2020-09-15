import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms'
import { Linking } from 'expo';

import layout from '../constants/Layout.js';
var LocalAPI = require('../clientAPI/local');
var ContactAPI = require('../clientAPI/contacts');
import {
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
    MaterialIcons,
    MaterialCommunityIcons,
    Entypo
} from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";

import {connect} from 'react-redux'
var Global = require('../assets/styles/global');
import { useNavigation } from '@react-navigation/native';

class SettingsHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            contactData: {
                ContactName: "Joe Shmoe"
            },
            isDateTimePickerVisible: false,
            isFollowUpSelected: null,
        };
    }

  render() {
    return(
        <View style={styles.container}>
            <Ionicons name="ios-arrow-back" onPress={()=>this.props.navigation.goBack()} size={25} color={Global.Styles.Text.LightTitle} />
            <Text style={styles.AppTitleText}>Settings</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Global.Styles.headerColor,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignSelf: "center",
        alignItems: 'center',
        width: "100%",
        paddingTop: 35,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingBottom: 10,

        // flex: 1,
        // backgroundColor: Global.Styles.headerColor,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // alignSelf: "center",
        // width: "100%",
        // height: 96,
        // minHeight: 96,
        // top: "0%",
        // bottom: "-4.17%",
        // paddingTop: 25,
        // borderRadius: 13,
        // paddingLeft: 15,
        // paddingRight: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 1,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,

    },

    AppTitleText: {
        fontWeight: "bold",
        fontSize: 35,
        color: Global.Styles.Text.LightTitle,
        paddingHorizontal: 15
    }


});

function mapStateToProps(state){
    return {
        FullContact: state.singleContactReducer.FullContact,
        ContactBookData: state.singleContactReducer.ContactBookData,
        ContactMethodOptions: state.singleContactReducer.ContactMethodOptions,
        modalVisible: state.addInteractionReducer.modalVisible
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        storeSearchText: (searchText) => dispatch({ type: 'STORE_SEARCHTEXT' , searchText: searchText}),
        updateInteractionData: (update) => dispatch({ type: 'UPDATE_INTERACTION_DATA', ...update}),
        updateContactRedux: (update) => dispatch({ type: 'UPDATE_CONTACT_PRELOAD', ...update})

    }
}

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(SettingsHeader))
