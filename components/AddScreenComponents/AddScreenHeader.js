import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Alert
} from 'react-native';
var Global = require('../../assets/styles/global');
import { Feather } from '@expo/vector-icons'; 
import {connect} from 'react-redux'

import { SafeAreaView } from 'react-navigation';



class AddScreenHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("HIEIFAD \r\n")
        console.log(JSON.stringify(this.props))
    }

    resolveTitle(feedName){

    }

  render() {

    return(
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
            <TouchableOpacity onPress={this.props.navigation.goBack}>
                <Feather name="x" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>{this.props.scene.route.name}</Text>
            <Text>Add</Text>


        </SafeAreaView>
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
        backgroundColor: Global.Styles.headerColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },

    title:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1F4523'
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(AddScreenHeader))
