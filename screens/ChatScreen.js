import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { privateMsgAtom } from "../atomState.js"
import { recieverIdAtom } from "../atomState.js"
import { userIdAtom } from '../atomState'
import { socketAtom } from '../atomState'
import { useAtom } from "jotai"


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



    return (<View>
        <ScrollView >
            {
                privateMessages.map(
                    (i) => Object.keys(i.chat).length !== 0 ? i.pair.map(
                        (j) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        key={j._id}
                                        onPress={() => {
                                            setRecieverId(j._id)
                                            navigation.navigate("PrivateConversation", {
                                                name: j.firstName,
                                            })
                                        }
                                        } >
                                        <Text key={j._id} >{j.firstName + ' ' + j.lastName}</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    ) : null
                )
            }
        </ScrollView>
    </View>)
}

export default ChatScreen