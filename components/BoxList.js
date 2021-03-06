import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
import layout from '../constants/Layout.js';
var Global = require('../assets/styles/global');
import {connect} from 'react-redux'
import * as Linking from 'expo-linking';
  

class TemplateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    submitFeedback(){
      Linking.openURL("mailto:info@helpaidafrica.org?subject=I have some feedback!");        
    }


    getBoxList(){

        let query = `{
  listBoxs {
    items {
      id
      orgID
      qrCode
      status
      statusHistory
    }
  }
}`
                fetch('https://c4xc6mjcy5ffbfptov4e4uerg4.appsync-api.us-east-1.amazonaws.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-KEY': 'da2-e5zx4z4jgjhwner6p7qbqkl2m4' },
          body: JSON.stringify({ query: query }),
        })
          .then(res => res.json())
          .then(res => console.log(res));
    }

  render() {

    
    return(
        <View style={styles.container}>
            <Button title="Have any feedback for the team?" onPress= {()=> this.submitFeedback()}/>

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
        flex: 1,
        marginTop: 50
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(TemplateComponent))
