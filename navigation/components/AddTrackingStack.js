import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native"
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AddScreen from "../../screens/AddScreen";
import InputBoxScreen from "../../screens/subscreens/InputBoxScreen";
import AddScreenHeader from "../../components/AddScreenComponents/AddScreenHeader";

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
              headerLeft: (navigation) => (
                <TouchableOpacity onPress={(navigation)=> console.log(JSON.stringify(navigation))} >
                  <Text style={{fontSize: 25}}>x</Text>
                </TouchableOpacity>
              )

        }}
      
      />

      
    </AddTrackingStack.Navigator>
  );
}

export default AddTracking