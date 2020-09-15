import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import layout from '../constants/Layout.js';
var Global = require('../assets/styles/global');
import {connect} from 'react-redux'


class TemplateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logoRaw.png")}/>
            <Text style={styles.text}>You're making the world a better place,</Text>
            <Text style={styles.text}>Mohib.</Text>

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
       ...Global.Styles.card
    },

    logo:{
        alignSelf: 'center',
        marginBottom: 10
    },

    text:{
        alignSelf:"center",
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(TemplateComponent))
