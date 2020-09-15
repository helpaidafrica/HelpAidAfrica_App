import React from 'react';
import View from 'react-native'
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'

import RootStack from './RootStack';

// Just so that only one screen is showing at a time.
// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );

export default function AppNavigator() {

  return (
        <NavigationContainer>
            <RootStack/>
        </NavigationContainer>

  );
}
