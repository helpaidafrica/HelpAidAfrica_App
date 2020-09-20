import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

var Global = require('../../assets/styles/global');
import ManualInput from '../../components/AddBoxComponents/ManualInput';
import QRCodeInput from '../../components/AddBoxComponents/QRCodeInput';
import BoxData from '../../components/AddBoxComponents/BoxData';
import AddBoxButton from '../../components/AddBoxComponents/AddBoxButton'


export default function InputBoxScreen(props) {

  return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.inputMethods}>
              <QRCodeInput/>
              <ManualInput/>
              <BoxData/>
            </View>
          </TouchableWithoutFeedback>

          <AddBoxButton {...props}/>
        </View>

  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: Global.Styles.appBackgroundColor,
    paddingHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%'
  },

  inputMethods:{
    height: "50%",
  }
});
