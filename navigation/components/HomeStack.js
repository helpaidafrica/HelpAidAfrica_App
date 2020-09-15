import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../../screens/HomeScreen";
import RankScreen from "../../screens/subscreens/RankScreen";

const HomeStack = createStackNavigator()
function Home() {
  return (
    <HomeStack.Navigator
      screenOptions={{ 
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#1F4523'
          },
          headerBackTitleVisible: false,
          headerTintColor: "#1F4523",   
          headerForceInset: { top: 'never', bottom: 'never' }     
        }}
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
      <HomeStack.Screen name="Ranking" component={RankScreen}/>
    </HomeStack.Navigator>
  );
}

export default Home