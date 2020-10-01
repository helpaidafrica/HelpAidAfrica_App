import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
    Keyboard, 
    TouchableWithoutFeedback,
    LayoutAnimation
} from 'react-native';
import layout from '../constants/Layout.js';
var Global = require('../assets/styles/global');
import {connect} from 'react-redux'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import ClientAPI from '../clientAPI'


import ButtonCustom from './ButtonCustom'



class AccessCodeGate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessCode: ''
        };
    }
    _handleOpenApp(){
        this.props._handleSetupGatePassed() 
    }

    async _handleCodeTyped(text){
        this.setState({accessCode: text})
        
        if (text.length >= 4){
            let correctCode = (await ClientAPI.checkAccessCode(text)).proceed
            if (correctCode){
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this._handleOpenApp()
                return
            }
        }
    }

    _handleJoinTeam(){
        Linking.openURL("mailto:info@helpaidafrica.org?subject=I want to join the team!");        
    }

      _handleLearnMoreClicked(){
        WebBrowser.openBrowserAsync('https://helpaidafrica.org');
    }


  render() {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logoRaw.png")}/>
            <Text style={styles.description}>Enter team access code.</Text>
            <TextInput 
                value ={this.state.accessCode} 
                onChangeText={text => this._handleCodeTyped(text)} 
                textAlign="center" keyboardType="numeric" 
                placeholder="x x x x" 
                maxLength={4}
                style={styles.codeInput}/>

            <TouchableOpacity onPress={()=> this._handleJoinTeam()}>
                <Text style={styles.joinText}>Want to join the team?.</Text>
            </TouchableOpacity>

            <View style={{marginTop: "25%"}}/>
            <ButtonCustom buttonText="Learn more about our mission" color={Global.Styles.primaryGreen} onPress={()=>this._handleLearnMoreClicked()}/>



        </View>
        </TouchableWithoutFeedback>
    );
  }
};

function mapStateToProps(state){
    return {
        LoggedIn: state.appStateReducer.LoggedIn,
        PermissionsOK: state.appStateReducer.PermissionsOK,
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        increaseCounter: (cons) => dispatch({ type: 'INCREASE_COUNTER' , constant: cons}),
        decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Global.Styles.primaryLight,
        flex: 1,
    },

    form:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    codeInput:{
        backgroundColor: '#CDAE4A',
        height: 50,
        width: 200,
        borderRadius: 15,
        alignSelf: 'center'
    },

    title:{
        fontSize: 40,
        color:'white',
        fontFamily: "work-sans-regular",
        fontStyle: "normal",
        fontWeight: "normal",
        paddingVertical: 15
    },

    description:{
        fontSize: 15,
        color:'black',
        fontFamily: "work-sans-regular",
        fontStyle: "normal",
        fontWeight: "normal",
        alignSelf: 'center',
        marginTop: "10%"
    },

    joinText:{
        fontSize: 12,
        color:'black',
        fontFamily: "work-sans-regular",
        fontStyle: "normal",
        fontWeight: "normal",
        alignSelf: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
    },

    button:{
        marginVertical: 15,
        height: 80,
        width: 120,
        backgroundColor: "orange",
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText:{
        fontSize: 25,
        color:'white',
        fontFamily: "work-sans-regular",
        fontStyle: "normal",
        fontWeight: "normal",
    },

     logo:{
        marginTop: "15%",
        alignSelf: 'center'
    },


});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(AccessCodeGate))
