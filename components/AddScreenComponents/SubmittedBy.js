import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 

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
            icon: <MaterialIcons name="person" size={18} color="black" />,
            label: (this.props.userID === ""  || this.props.userID === null) ? "Submitted By" : this.props.userID,
            showArrow: true,
            key: 1,
            onPress: "Submitted By",
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
        userID: state.trackingEventReducer.userID
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
