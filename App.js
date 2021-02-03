import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './screens/LoginScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Create" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

