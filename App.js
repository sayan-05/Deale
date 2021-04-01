import 'react-native-gesture-handler';
import React, {
  useEffect,
  useState
} from 'react';
import { LogBox } from "react-native"
import LoginScreen from './screens/LoginScreen.js'
import SplashScreen from './screens/SplashScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen.js'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Main from './screens/Main.js'

LogBox.ignoreAllLogs(true)

const Stack = createStackNavigator()

export default function App() {

  const [route, setRoute] = useState(null)
  const [loading,setLoading] = useState(true)


  useEffect(
    () => {
      setLoading(true)
      const checkLogin = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token == null) {
          setRoute('Login')
        } else {
          setRoute('Main')
        }
      }
      let t0 = performance.now()
      checkLogin()
      let t1 = performance.now()
      setTimeout(
        () => setLoading(false),t1 - t0
      )
    },[]
  )


  if (loading == true){
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}



