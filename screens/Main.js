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
import { Overlay, Divider } from "react-native-elements"
import { useNavigation } from '@react-navigation/native'

const Main = () => {

    let [socket, setSocket] = useAtom(socketAtom)
    let [visible, setVisible] = useState(false)
    const navigation = useNavigation()

    const toggleOverlay = () => {
        setVisible(!visible)
    }


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
            <SafeAreaView style = {{
                backgroundColor : 'white'
            }} />
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
                            backgroundColor: 'rgb(230, 57, 70)',
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
                                <TouchableOpacity activeOpacity={0.4} onPress={
                                    () => toggleOverlay()
                                } >
                                    <Icon name="dots-three-vertical" size={20} color="white" />
                                </TouchableOpacity>
                                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                                    <TouchableOpacity onPress = {async () => {
                                        await AsyncStorage.removeItem("token")
                                        socket.disconnect()
                                        navigation.navigate("Login")
                                        toggleOverlay()
                                        
                                    }} >
                                        <Text style={{
                                            width: 150,
                                            height: 30,
                                            fontSize: 18,
                                        }}
                                        >
                                            Log Out
                                        </Text>
                                    </TouchableOpacity>
                                    <Divider />
                                    <TouchableOpacity>
                                        <Text style={{
                                            width: 150,
                                            height: 30,
                                            fontSize: 18,
                                            top: 7
                                        }} >Settings</Text>
                                    </TouchableOpacity>
                                </Overlay>
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
                                backgroundColor: 'rgb(230, 57, 70)',
                            }} ></TabBar>
                    </>
                }

            />
        </>
    );

}

export default Main;
