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
  

class TemplateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            <Button title="Decrease Counter" onPress= {()=> this.getBoxList()}/>
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
        marginTop: 50
    },
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(TemplateComponent))
