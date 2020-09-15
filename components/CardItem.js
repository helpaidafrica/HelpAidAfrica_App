import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import layout from '../constants/Layout.js';

import { SimpleLineIcons } from '@expo/vector-icons'; 
var Global = require('../assets/styles/global');
import {connect} from 'react-redux'


class CardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return(
        <View style={styles.container}>
            <View style={styles.iconAndLabelContainer}>
                {this.props.icon}
                <Text style={styles.labelText}>{this.props.label}</Text>
            </View>
            {this.props.showArrow? 
            <SimpleLineIcons name="arrow-right" size={15} color="#959495" />
            : null}

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
        flexDirection: 'row',
        height: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginVertical: 10
    },

    iconAndLabelContainer:{
        flexDirection: "row",
        alignItems: 'center'
    },

    labelText:{
        fontSize: 17,
        marginLeft: 10,
        fontFamily: Global.Styles.font
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(CardItem))
