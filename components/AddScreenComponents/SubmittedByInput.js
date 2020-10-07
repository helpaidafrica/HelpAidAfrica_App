import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert,
    TouchableOpacity,
    TextInput
} from 'react-native';

import * as Linking from 'expo-linking';

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'


class SubmittedByInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


  render() {

    return(
        <View style={styles.container}>
            <TextInput
                multiline={true}
                onChangeText={text=>this.props.updateUserID(text)}
                value={this.props.userID}
                placeholder={"Enter your full name."}
                autoFocus={true}
            />

        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        userID: state.trackingEventReducer.userID
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateUserID: (cons) => dispatch({ type: 'UPDATE_USERID' , userID: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
        ...Global.Styles.card
    },

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(SubmittedByInput))
