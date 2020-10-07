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

import SubmittedByInput from '../../components/AddScreenComponents/SubmittedByInput'

var Global = require('../../assets/styles/global');



export default function SubmittedByScreen(props) {

  return (
        <View style={{height: '100%'}}>
            <SafeAreaView style={styles.container}>
              <SubmittedByInput {...props}/>
            </SafeAreaView>
        </View>

  );
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
