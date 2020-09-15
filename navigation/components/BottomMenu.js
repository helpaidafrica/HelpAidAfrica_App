import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { createStackNavigator } from '@react-navigation/stack';


import { TabBar } from "./TabBar";

import HistoryScreen from "../../screens/HistoryScreen";


import { useSafeArea } from "react-native-safe-area-context";
import { View,Alert } from "react-native";

import Home from "./HomeStack"



const createNewPlaceHolder = () => <View style={{flex:1, backgroundColor: 'blue'}}></View>;

export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative"}}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="plussquareo" component={createNewPlaceHolder}
          listeners={( { navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Add Tracking Info")
            }
          })}
        />
        <Tab.Screen name="export2" component={HistoryScreen} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};