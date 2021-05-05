import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { SocketObj } from "./Main"

const ChatScreen = () => {

    const navigation = useNavigation()

    let socket = useContext(SocketObj)

    let [privateMessages, setPrivateMessages] = useState([])

    let [userId, setUserId] = useState('')


    let socketEvent = () => {
        socket.on("recieve-private-message", (data) => {
            console.log(data)
        })
    }


    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/chats', {
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
        }, []
    )



    return (<View>
        <ScrollView >
            {
                privateMessages === null ? null : privateMessages.map(
                    (i) => i.pair.map(
                        (j) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        key={i._id}
                                        onPress={() => {
                                            navigation.navigate("PrivateConversation", {
                                                chats: i.chat,
                                                userId: userId,
                                            })
                                        }
                                        } >
                                        <Text  >{j.firstName + ' ' + j.lastName}</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    )
                )
            }
        </ScrollView>
    </View>)
}

export default ChatScreen