import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert
} from 'react-native';

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
    const Box = (box)=>{
        return(
            <View style={styles.boxContainer}>
                <Text style={styles.boxName}>{box.item.boxID}</Text>
                <View style={styles.boxStateContainer}>
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

    boxContainer:{
        margin: 15
    },

    boxName:{
        fontSize: 20,
        fontWeight: '800'
    },

    boxState:{
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
    },

    boxStateContainer:{
        backgroundColor: Global.Styles.primaryGreen,
        padding: 10,
        borderRadius: 5, 
    }

});

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(BoxesAddedList))
