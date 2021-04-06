import React, { useState, useEffect, createContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PeopleScreen from './PeopleScreen'
import SplashScreen from './SplashScreen'
import io from 'socket.io-client'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GiftedChat } from 'react-native-gifted-chat';

export const SocketObj = createContext()
const Main = () => {

    let [socket, setSocket] = useState(undefined)



    useEffect(
        () => {
            const connectSocket = async () => {
                setSocket(io("http://192.168.43.115:8000", {
                    transports: ['websocket'], upgrade: false,
                    query: {
                        token: await AsyncStorage.getItem("token")
                    }
                }))
            }
            connectSocket()
        }, []
    )

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'CHAT' },
        { key: 'second', title: 'PEOPLE' },
    ]);


    const renderScene = SceneMap({
        first: GiftedChat,
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
