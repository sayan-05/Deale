import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { SocketObj } from "./Main"

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const ChatScreen = () => {

    const navigation = useNavigation()

    let socket = useContext(SocketObj)

    let [privateMessages, setPrivateMessages] = useState([])

    let [userId, setUserId] = useState('')

    const forceUpdate = useForceUpdate()

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
                const privateMessagesCopy = [...privateMessages]
                const updatedPrivateMessages = privateMessagesCopy.map((i) => {
                    if (i.pair[0]._id == data.sender) {
                        i.chat.unshift(data.chatObj)
                    }
                    return i
                })
                setPrivateMessages([...updatedPrivateMessages])
            }, []
            )
        }
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