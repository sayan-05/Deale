import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { SocketObj } from "./Main"
import {privateMsgAtom} from "../atomState.js"
import {recieverIdAtom} from "../atomState.js"
import {useAtom} from "jotai"


const ChatScreen = () => {

    const navigation = useNavigation()

    let socket = useContext(SocketObj)

    let [privateMessages, setPrivateMessages] = useAtom(privateMsgAtom)

    let [,setRecieverId] = useAtom(recieverIdAtom)

    let [userId, setUserId] = useState('')


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
                    (i) => i.pair.map(
                        (j) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        key={j._id}
                                        onPress={() => {
                                            setRecieverId(j._id)
                                            navigation.navigate("PrivateConversation", {
                                                chats: i.chat,
                                                userId: userId,
                                                socket: socket,
                                                name: j.firstName,
                                                recieverId: j._id
                                            })
                                        }
                                        } >
                                        <Text key={j._id} >{j.firstName + ' ' + j.lastName}</Text>
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