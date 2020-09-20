import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native"
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AddScreen from "../../screens/AddScreen";
import InputBoxScreen from "../../screens/subscreens/InputBoxScreen";
import AddScreenHeader from "../../components/AddScreenComponents/AddScreenHeader";

import { Feather } from '@expo/vector-icons'; 

const AddTrackingStack = createStackNavigator()
function AddTracking() {
  return (
    <AddTrackingStack.Navigator
      mode="modal"
      screenOptions={{ 
          gestureEnabled: true,
        }}
    >
      <AddTrackingStack.Screen 
        name="Add Tracking Info" 
        component={AddScreen} 
        options={{
          animationEnabled: true,
        }}
      />

      <AddTrackingStack.Screen 
        name="Add Box" 
        component={InputBoxScreen} 
        options={{
              headerBackTitleVisible: false,
              headerBackImage: ()=> <View style={{marginLeft: 10}}><Feather name="x" size={24} color="black" /></View>
        }}
      
      />

      
    </AddTrackingStack.Navigator>
  );
}

export default AddTracking