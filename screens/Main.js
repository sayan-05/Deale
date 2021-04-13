import React, { useState, useEffect, createContext } from 'react';
import { Text, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PeopleScreen from './PeopleScreen'
import SplashScreen from './SplashScreen'
import FriendsScreen from './FriendsScreen'
import ChatScreen from './ChatScreen'
import io from 'socket.io-client'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GiftedChat } from 'react-native-gifted-chat';
import { TabBar } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import Collapsible from "react-native-collapsible"
export const SocketObj = createContext()
const Main = () => {

    let [socket, setSocket] = useState(undefined)




    useEffect(
        () => {
            const connectSocket = async () => {
                setSocket(io("http://192.168.43.60:8000", {
                    transports: ['websocket'], upgrade: false,
                    query: {
                        token: await AsyncStorage.getItem("token")
                    }
                }))
            }

            connectSocket()
        }, []
    )

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'CHAT' },
        { key: 'second', title: 'FRIENDS' },
        { key: 'third', title: 'PEOPLE' },
    ]);


    const renderScene = SceneMap({
        first: ChatScreen,
        second: FriendsScreen,
        third: PeopleScreen
    });

    if (socket == null) {
        return null
    }

    return (
        <SocketObj.Provider value={socket} >
            <SafeAreaView style={{ backgroundColor: 'rgb(201, 7, 0)' }} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(number) => {
                    setIndex(number)
                }}
                renderTabBar={(props) =>
                    <>
                        <View style={{
                            height: 60,
                            width: '100%',
                            backgroundColor: 'red',
                        }} >
                            <Text style={{
                                color: 'white',
                                fontSize: 30,
                                fontWeight: 'bold'
                            }} >Deale</Text>
                        </View>
                        <TabBar
                            activeColor={'white'}
                            indicatorStyle={{ backgroundColor: 'white', height: 3 }}
                            labelStyle={{ fontWeight: 'bold' }}
                            {...props}
                            style={{
                                height: 50,
                                paddingTop: 4,
                                backgroundColor: 'red',
                            }} ></TabBar>
                    </>
                }

            />
        </SocketObj.Provider>
    );

}

export default Main;
