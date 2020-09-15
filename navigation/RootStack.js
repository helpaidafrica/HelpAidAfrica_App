import React from 'react';
import { Text, View, Platform, Dimensions } from 'react-native';
import * as Device from 'expo-device';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';


import TemplateScreen from '../screens/TemplateScreen';
import AddTracking from "./components/AddTrackingStack"

// import Header  from "../components/Header";
// import AddContactHeader from '../components/AddContactHeader';

import { BottomMenu } from './components/BottomMenu'


var Global = require('../assets/styles/global');

const RootStack = createStackNavigator();
const RootStackScreen = () =>{
    return(
        <RootStack.Navigator mode="modal">
            <RootStack.Screen
                name="Main"
                component={BottomMenu}
                options={{ headerShown: false }}
            />
            <RootStack.Screen 
            	name="Add Tracking Info"
            	component={AddTracking}
            	options={{
            		animationEnabled: true, 
            		headerShown: false, // this worked
            	}}
            />

           
        </RootStack.Navigator>
    )
}

export default RootStackScreen;
