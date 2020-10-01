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

import * as Linking from 'expo-linking';

var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'


class BoxesAddedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destinations: []
        };

    }

    async componentDidMount(){
        let destinations = await ClientAPI.fetchDestinations();
        if (!destinations.success){
            Alert.alert("Error getting destinations: " + destinations.data)
        }

        this.setState({destinations: destinations.data})
        
        console.log(this.state.destinations)

    }

    _handleCantFindClicked(){
        let body = `Help Aid Africa team: \r\n
        I am unable to find the destination in the list provided. Below is where these boxes are going: \r\n

        Destination Name:\r
        Destination Street Address: \r
        Destination Point of Contact Name:\r
        Destinatation Point of Contact Phone Number:\r
        Destinatation Point of Contact Email:\r\n

        *For admin purposes-- not edit.* \r
        ` + JSON.stringify(this.props.trackingEvent)
        Linking.openURL("mailto:info@helpaidafrica.org?subject=Can't Find Destination Location&body=" +  body);        
    }

    _handleDestinationSelected(item){
        this.props.updateDestination({id: item.id, locationLabel: item.locationLabel})
        this.props.navigation.goBack()

    }

  render() {
    const Destination = (destination)=>{
        // take out any null items. 
        let cont = destination.item || false
        if (!cont){
            return <View/>
        }

        let city = destination.item.address.city
        let state = destination.item.address.state
        let zipCode = destination.item.address.zipCode
        let province = destination.item.address.province
        let country = destination.item.address.country
        return(
            <TouchableOpacity onPress={()=> this._handleDestinationSelected(destination.item)} style={styles.boxContainer}>
                <Text style={styles.addressLabelText}>{destination.item.locationLabel}</Text>
                <Text style={styles.addressText}>{destination.item.address.addressLine1}</Text>
                <Text style={styles.addressText}>{destination.item.address.addressLine2}</Text>
                <Text style={styles.addressText}>{city} {state} {zipCode}</Text>
                <Text style={styles.addressText}>{province.length > 1 ? (province + ", ") : ""}{country}</Text>
            </TouchableOpacity>
        )
    }

    const CantFindDestination = ()=>{
        return(
            <TouchableOpacity onPress={()=> this._handleCantFindClicked()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Text style={styles.cantFindText}>Can't find your destination?</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={this.state.destinations}
                renderItem={Destination}
                keyExtractor={item => item.id}
            />
            <Destination/>
            <Destination/>
            <CantFindDestination/>

        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxes: state.trackingEventReducer.boxes,
        trackingEvent: state.trackingEventReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateDestination: (cons) => dispatch({ type: 'UPDATE_DESTINATION' , destinationOrg: cons}),
    }
}

const styles = StyleSheet.create({
    container: {
        ...Global.Styles.card
    },

    boxContainer:{
        paddingVertical: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#DADADA',
    },

    addressLabelText:{
        fontSize: 18,
        fontWeight: '700'
    },

    addressText:{
        fontSize: 15,
        fontWeight: '400',
        color: 'black'
    },

    cantFindText:{
        fontSize: 12,
        color:'black',
        fontFamily: "work-sans-regular",
        fontStyle: "normal",
        fontWeight: "normal",
        alignSelf: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
    }

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxesAddedList))
