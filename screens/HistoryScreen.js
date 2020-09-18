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
  View,
  AsyncStorage
} from 'react-native';

import BoxList from '../components/BoxList'

var Global = require('../assets/styles/global');

export default function SettingsScreen(props) {

  return (
    <View style={styles.container}>
      <BoxList/>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
    paddingTop: 50,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
});
