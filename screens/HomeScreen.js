import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  StatusBar,
  SegmentedControlIOS
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';

var Global = require('../assets/styles/global');

import NiceMessage from '../components/HomeScreenComponents/NiceMessage'
import ProfileCardList from '../components/HomeScreenComponents/ProfileCardList'
import UserBoxList from '../components/HomeScreenComponents/UserBoxList'


export default function HomeScreen(props) {

  return (
    <View style={{height: "100%"}}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <View style={styles.container}>
          <NiceMessage/>
          <ProfileCardList {...props}/>
          <UserBoxList {...props}/>
        </View>
    </View>


  );
}

const styles = StyleSheet.create({

    titles: {
        height: 42,
        left: 15,
        fontFamily: "Roboto",
        fontWeight: "500",
        fontSize: 36,
        lineHeight: 42,
        color: "#000000",
        marginBottom: 10,
    },

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
  },
});
