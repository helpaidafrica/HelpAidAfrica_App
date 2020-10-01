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


class BoxesAddedList extends React.Component {
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
                onChangeText={text=>this.props.updateNotes(text)}
                value={this.props.notes}
                placeholder={"Anything important/interesting to bring up?"}
                autoFocus={true}
            />

        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        notes: state.trackingEventReducer.notes
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateNotes: (cons) => dispatch({ type: 'UPDATE_NOTES' , notes: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
        ...Global.Styles.card
    },

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxesAddedList))
