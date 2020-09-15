import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
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
            <Text>Test Counter to Show Redux:  {this.props.counter}</Text>
            <Text>Counter Plus 10: {this.props.counterMultiplied}</Text>
            <Button title="Decrease Counter" onPress= {()=> this.props.decreaseCounter()}/>
            <Button title="Increase Counter by 5" onPress= {()=> this.props.increaseCounter(10)}/>

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
        backgroundColor: 'white',
        flex: 1,
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(TemplateComponent))
