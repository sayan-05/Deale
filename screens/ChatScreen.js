import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { privateMsgAtom } from "../atomState.js"
import { recieverIdAtom } from "../atomState.js"
import { userIdAtom } from '../atomState'
import { socketAtom } from '../atomState'
import { useAtom } from "jotai"
import { ListItem, Avatar } from 'react-native-elements'


const ChatScreen = () => {

    const navigation = useNavigation()

    let [socket] = useAtom(socketAtom)

    let [privateMessages, setPrivateMessages] = useAtom(privateMsgAtom)

    let [, setRecieverId] = useAtom(recieverIdAtom)

    let [, setUserId] = useAtom(userIdAtom)


    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/private-chats', {
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": await AsyncStorage.getItem("token")
                        }
                    })
                    setPrivateMessages(response.data.chatFriends)
                    setUserId(response.data.userId)
                } catch (err) {
                    console.log(err.response)
                }
            }
            fetchData()

            socket.on("recieve-private-message", (data) => {
                setPrivateMessages(prevState => {
                    const privateMessagesCopy = JSON.parse(JSON.stringify(prevState))
                    privateMessagesCopy.forEach((i) => {
                        if (i.pair[0]._id == data.sender) {
                            i.chat.unshift(data.chatObj)
                        }
                    })
                    return privateMessagesCopy
                }
                )
            })
        }, []
    )



    return (
    <View style={{
        height: '100%',
        backgroundColor: 'white'
    }} >
        <ScrollView >
            {
                privateMessages.map(
                    (i) => Object.keys(i.chat).length !== 0 ? (
                        <>
                            <ListItem
                                button
                                key={i.pair[0]._id}
                                onPress={
                                    () => {
                                        setRecieverId(i.pair[0]._id)
                                        navigation.navigate("PrivateConversation", {
                                            name: i.pair[0].firstName,
                                        })
                                    }
                                }
                                bottomDivider
                                containerStyle={{
                                    borderBottomWidth : 0.5
                                }}>
                                <Avatar rounded source={{ uri: i.pair[0].avatar }} />
                                <ListItem.Content >
                                    <ListItem.Title
                                    >
                                        {i.pair[0].firstName + ' ' + i.pair[0].lastName}
                                    </ListItem.Title>
                                    <ListItem.Subtitle
                                    >
                                        {i.chat[0].text}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        </>
                    ) : null
                )
            }
        </ScrollView>
    </View >)
}

export default ChatScreen