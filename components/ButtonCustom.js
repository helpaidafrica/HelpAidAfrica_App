import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import layout from '../constants/Layout.js';
var Global = require('../assets/styles/global');
import {connect} from 'react-redux'

import * as Haptics from 'expo-haptics';


class ButtonCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return(
        <View style={styles.container}>
            <TouchableOpacity disabled={this.props.disabled} style={[styles.button, {backgroundColor: this.props.disabled ? "#dddddd" : this.props.color,}]} onPress={()=>{Haptics.impactAsync("medium"); this.props.onPress()}}>
                { this.props.loading ?
                    <ActivityIndicator size="small" color="white" /> :
                    <Text style={{fontWeight: 'bold',color: this.props.disabled ? "grey" :'white'}}>{this.props.buttonText}</Text>
                }
            </TouchableOpacity>

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

      button:{
    width: "92%",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 8,
    margin: 5
  }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(ButtonCustom))
