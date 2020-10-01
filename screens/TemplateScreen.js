import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  View
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';

var Global = require('../assets/styles/global');
import {connect} from 'react-redux'
import { MonoText } from '../components/StyledText';


class TemplateScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }

  render(){

    return (
        <View style={{height: '100%'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        </View>

  );

  }

  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
    paddingTop: 10,
    height: "100%",
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
});

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

export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(TemplateScreen))
