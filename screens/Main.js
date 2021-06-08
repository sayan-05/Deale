import React, { useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PeopleScreen from './PeopleScreen'
import SplashScreen from './SplashScreen'
import FriendsScreen from './FriendsScreen'
import ChatScreen from './ChatScreen'
import GroupScreen from './GroupScreen'
import io from 'socket.io-client'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TabBar } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { socketAtom } from '../atomState'
import { useAtom } from "jotai"
import Icon from 'react-native-vector-icons/Entypo'
const Main = () => {

    let [socket, setSocket] = useAtom(socketAtom)


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
        { key: 'second', title: 'GROUPS' },
        { key: 'third', title: 'FRIENDS' },
        { key: 'fourth', title: 'PEOPLE' },
    ]);


    const renderScene = SceneMap({
        first: ChatScreen,
        second: GroupScreen,
        third: FriendsScreen,
        fourth: PeopleScreen
    });

    if (socket == null) {
        return <SplashScreen />
    }

    return (
        <>
            <SafeAreaView />
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
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '90%'
                            }} >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 30,
                                    fontWeight: 'bold'
                                }} >Deale</Text>
                                <TouchableOpacity activeOpacity={0.4} >
                                   <Icon name="dots-three-vertical" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
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
        </>
    );

}

export default Main;
