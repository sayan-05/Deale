import React, { useState, useEffect, createContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PeopleScreen from './PeopleScreen'
import SplashScreen from './SplashScreen'
import { useNavigationState } from "@react-navigation/native"
import io from 'socket.io-client'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const SocketObj = createContext()
const Main = ({ route }) => {

    let [socket, setSocket] = useState(undefined)

    const routesLength = useNavigationState(state => state.routes.length);

    useEffect(
        () => {
            const connect = async () => {
                if (routesLength == 1) {
                    setSocket(io("http://192.168.43.115:8000", {
                        transports: ['websocket'],
                        query: {
                            token: await AsyncStorage.getItem("token")
                        }
                    }))
                } else {
                    const { socketInstanse } = route.params
                    setSocket(socketInstanse)
                }
            }
            connect()
        }, []
    )

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'CHAT' },
        { key: 'second', title: 'PEOPLE' },
    ]);


    const renderScene = SceneMap({
        first: SplashScreen,
        second: PeopleScreen,
    });

    if (socket == null) {
        return null
    }

    return (
        <SocketObj.Provider value={socket} >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(number) => {
                    setIndex(number)
                }}
                initialLayout={{ width: layout.width }}
            />
        </SocketObj.Provider>
    );

}

export default Main;
