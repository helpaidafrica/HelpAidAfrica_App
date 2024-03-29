import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'

import { FontAwesome, Entypo } from '@expo/vector-icons'; 

import CardList from '../CardList'


class UserBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    const cardData = [
        {
            icon: <Entypo name="location-pin" size={18} color="black" />,
            label: this.props.locationLabel,
            showArrow: true,
            key: 1,
            onPress: "Select Destination",
            pressable: true
        }
    ]

    return(
        <View style={styles.container}>
            <CardList cardData={cardData} {...this.props}/>
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        locationLabel: state.trackingEventReducer.destinationOrg.locationLabel 
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
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(UserBoxList))
