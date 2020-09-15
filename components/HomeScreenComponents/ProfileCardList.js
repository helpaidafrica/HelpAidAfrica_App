import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'

import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 

import CardList from '../CardList'

const cardData = [
        {
            icon: <MaterialIcons name="account-circle" size={18} color="black" />,
            label: "Mohib Ali Jafri",
            showArrow: false,
            key: 0,
            onPress: null,
            pressable: false
        },
        {
            icon: <MaterialIcons name="email" size={18} color="black" />,
            label: "mohib@helpaidafrica.org",
            showArrow: false,
            key: 1,
            onPress: null,
            pressable: false
        }
]


class ProfileCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return(
        <View style={styles.container}>
            <CardList cardData={cardData} {...this.props}/>
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
    container: {
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(ProfileCardList))
