import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert,
    TouchableOpacity
} from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons'; 

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'


class BoxesAddedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async _handleDeleteBox(boxID){
        let r  = await ClientAPI.removeBoxFromEvent(boxID)
        if (!r.success){
            Alert.alert("Couldn't remove box: " + r.data)
        }
    }

    _handleDeleteButtonPressed(boxID){
        Alert.alert(
          boxID,
          "Are you sure you want to remove this box from tracking event?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => this._handleDeleteBox(boxID) }
          ],
          { cancelable: false }
        );

    }

  render() {
    const Box = (box)=>{
        return(
            <View style={styles.boxContainer}>
                <View style={styles.row1}>
                    <Text style={styles.boxName}>{box.item.boxID}</Text>
                    <TouchableOpacity onPress= {()=> this._handleDeleteButtonPressed(box.item.boxID)}>
                        <Feather name="x-circle" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.row1, styles.boxStateContainer]}>
                    <Text style={styles.boxState}>{box.item.previousBoxState}</Text>
                    <AntDesign name="arrowright" size={24} color="white" />
                    <Text style={styles.boxState}>{box.item.nextBoxState}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={this.props.boxes}
                renderItem={Box}
                keyExtractor={item => item.boxID}
            />

        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxes: state.trackingEventReducer.boxes,
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
        backgroundColor: 'white',
        flex: 1,
    },

    row1:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        alignItems: 'center',
        marginBottom: 5
    },

    boxContainer:{
        margin: 15,
        flexDirection: 'column'
    },

    boxName:{
        fontSize: 20,
        fontWeight: '800'
    },

    boxState:{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
    },

    boxStateContainer:{
        backgroundColor: Global.Styles.primaryGreen,
        padding: 10,
        borderRadius: 5, 
        width: '100%',
        justifyContent: 'space-around'
    }

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxesAddedList))
