import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
var Global = require('../../assets/styles/global');
import {connect} from 'react-redux'

import { Feather, FontAwesome5 } from '@expo/vector-icons'; 

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
            icon: <Feather name="box" size={18} color="black" />,
            label: this.props.totalBoxesDelivered + " boxes delivered",
            showArrow: false,
            key: 0,
            onPress: null,
            pressable: false
        },
        {
            icon: <FontAwesome5 name="trophy" size={18} color="black" />,
            label: "Rank #" + this.props.rank + " out of " + this.props.rankTotal,
            showArrow: true,
            key: 1,
            onPress: "Ranking",
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
        totalBoxesDelivered: state.appStateReducer.totalBoxesDelivered,
        rank: state.appStateReducer.rank,
        rankTotal: state.appStateReducer.rankTotal,
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
