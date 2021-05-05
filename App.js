import 'react-native-gesture-handler';
import React, {
  useEffect,
  useState
} from 'react';
import { LogBox } from "react-native"
import LoginScreen from './screens/LoginScreen.js'
import SplashScreen from './screens/SplashScreen.js'
import PrivateConversatonScreen from './screens/PrivateConversationScreen'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Main from './screens/Main.js'

LogBox.ignoreAllLogs(true)

const Stack = createStackNavigator()

export default function App() {

  const [route, setRoute] = useState(null)

  useEffect(
    () => {
      const checkLogin = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token == null) {
          setRoute('Login')
        } else {
          setRoute('Main')
        }
      }
      checkLogin()
    }, []
  )


  if (route == null) {
    return <SplashScreen />
  }

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={route}
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Create" component={CreateAccountScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="PrivateConversation" component={PrivateConversatonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



