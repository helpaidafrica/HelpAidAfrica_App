import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native"
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import AddScreen from "../../screens/AddScreen";
import InputBoxScreen from "../../screens/subscreens/InputBoxScreen";
import BoxesAddedSummaryScreen from "../../screens/subscreens/BoxesAddedSummaryScreen";
import DestinationSelectScreen from "../../screens/subscreens/DestinationSelectScreen";
import AddNotesScreen from "../../screens/subscreens/AddNotesScreen";
import AddScreenHeader from "../../components/AddScreenComponents/AddScreenHeader";
import SubmittedByScreen from "../../screens/subscreens/SubmittedByScreen";

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

      <AddTrackingStack.Screen 
        name="Boxes Added Summary" 
        component={BoxesAddedSummaryScreen} 
        options={{
              headerBackTitleVisible: false,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      
      />

      <AddTrackingStack.Screen 
        name="Select Destination" 
        component={DestinationSelectScreen} 
        options={{
              headerBackTitleVisible: false,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      
      />

      <AddTrackingStack.Screen 
        name="Notes" 
        component={AddNotesScreen} 
        options={{
              headerBackTitleVisible: false,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      
      />

      <AddTrackingStack.Screen 
        name="Submitted By" 
        component={SubmittedByScreen} 
        options={{
              headerBackTitleVisible: false,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      
      />

      
    </AddTrackingStack.Navigator>
  );
}

export default AddTracking