import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Button,
  Alert
} from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 
import {connect} from 'react-redux'

var Global = require('../assets/styles/global');

import { MonoText } from '../components/StyledText';
import ButtonCustom from '../components/ButtonCustom';
import Time from '../components/AddScreenComponents/Time';
import Destination from '../components/AddScreenComponents/Destination';
import Boxes from '../components/AddScreenComponents/Boxes';
import Photos from '../components/AddScreenComponents/Photos';
import Notes from '../components/AddScreenComponents/Notes';

import ClientAPI from '../clientAPI'


class AddScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

async _handleSubmitAddTrackingEvent(){
  ClientAPI.addTrackingEvent(this.props.navigation);
}

  _handleResetAndGoHome(){
    this.props.navigation.navigate("Main")
    this.props.resetAddTrackingInfo();
  }

  render(){

  const AddButton = ()=>{
    let color; 
    let text;
    let disabled;
    let disabled_notEnoughInfo = (this.props.boxes.length == 0) || (this.props.destinationOrg.locationLabel == "Destination Location")

    switch (this.props.trackingEventState){
      case null:
      case "addFailure":
        color = Global.Styles.primaryGreen
        text = "Complete Tracking Event"
        disabled = disabled_notEnoughInfo//false
        break;

      case "adding":
        color = Global.Styles.primaryGreen
        text = "..."
        disabled = true
        break;

      case "addSuccess":
        color = Global.Styles.primaryGreen
        text = "Success!"
        disabled = true
        break;
    }

    
    
    return(
      <ButtonCustom buttonText={text} color={color} disabled={disabled || disabled_notEnoughInfo} onPress={()=>this._handleSubmitAddTrackingEvent()}/>
    )
  }
    return (
      <View style={styles.container}>
          <Time {...this.props}/>
          <Destination {...this.props}/>
          <Boxes {...this.props}/>
          <Notes {...this.props}/>

          
          <AddButton/>
          <ButtonCustom buttonText="Discard" color={Global.Styles.cancelRed} onPress={()=>this._handleResetAndGoHome()}/>
      </View>

      );
  }
}

function mapStateToProps(state){
    return {
        counter: state.testReducer.counter,
        trackingEventState: state.trackingEventReducer.trackingEventState,
        boxes: state.trackingEventReducer.boxes,
        destinationOrg: state.trackingEventReducer.destinationOrg,
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        resetAddTrackingInfo: () => dispatch({ type: 'RESET_TRACKINGEVENT'}),
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
    flexDirection: 'column',
    paddingTop: 25
  },
});

// export default AddScreen;
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(AddScreen))

