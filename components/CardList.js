import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import layout from '../constants/Layout.js';
var Global = require('../assets/styles/global');
import {connect} from 'react-redux';

import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 


import CardItem from './CardItem'
import CardDivider from './CardDivider'

// SAMPLE CARD DATA
const cardData = [
        {
            icon: <MaterialIcons name="email" size={18} color="black" />,
            label: "Mohib Ali Jafri",
            showArrow: true,
            key: 0,
            onPress: null,
            pressable: true
        },
        {
            icon: <MaterialIcons name="email" size={18} color="black" />,
            label: "Mohib Ali Jafri",
            showArrow: true,
            key: 1,
            onPress: null,
            pressable: false
        }
]



class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };


    };

  render() {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.key}
                onPress={()=> this.props.navigation.navigate(item.onPress)}
                disabled={!item.pressable}
            >

                <CardItem
                    key={item.key} 
                    icon={item.icon} 
                    label={item.label} 
                    showArrow={item.showArrow}
                />
            </TouchableOpacity>
        );
      };

    
    return(
        <View style={styles.container}>
            <FlatList
                data={this.props.cardData}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                scrollEnabled= {false}
                ItemSeparatorComponent = {CardDivider}
            />
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        counter: state.testReducer.counter,
        counterMultiplied: state.testReducer.counterMultiplied
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        increaseCounter: (cons) => dispatch({ type: 'INCREASE_COUNTER' , constant: cons}),
        decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
    }
}

const styles = StyleSheet.create({
    container: {...Global.Styles.card, paddingRight: 0, paddingVertical: 0}
    ,
});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(CardList))
