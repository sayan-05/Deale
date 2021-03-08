import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import LoginScreen from './screens/LoginScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import io from 'socket.io-client'

const Stack = createStackNavigator()
export const Socket = createContext()

export default function App() {

  const soc = io("http://192.168.43.115:3000", {
    transports: ['websocket'],
    jsonp: false
  })


  return (
    <Socket.Provider value={soc}  >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Create" component={CreateAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Socket.Provider>
  );
}



