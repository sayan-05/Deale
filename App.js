import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from "react-native"
import LoginScreen from './screens/LoginScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import PeopleScreen from './screens/PeopleScreen.js'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs(true)

const Stack = createStackNavigator()
export default function App() {
 

return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='People'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create" component={CreateAccountScreen} />
        <Stack.Screen name="People" component={PeopleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
);
}



