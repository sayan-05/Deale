import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SocketObj } from "./Main"

const FriendsScreen = () => {
    const [friendsList, setFriendsList] = useState([])

    let socket = useContext(SocketObj)



    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/friends', {
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": await AsyncStorage.getItem("token")
                        }
                    })
                    setFriendsList(response.data)
                } catch (err) {
                    console.log(err.response)
                }
            }
            fetchData()
        },[]
    )

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '90%'
        }} >
            <View>
                {
                    friendsList.map(
                        (i, key) => {
                            return (
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    top: 40,
                                    marginVertical: 5,
                                    marginBottom: 10,
                                    backgroundColor: 'grey',
                                    height: 50

                                }}
                                    key={key} >
                                    <Text style={{
                                        maxWidth: "50%"
                                    }} >{i.firstName + ' ' + i.lastName}</Text>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                socket.emit("send-private-message",
                                                    {
                                                        friendId: i._id,
                                                        recvText: "Hello " + i.firstName
                                                    })
                                            }
                                        }
                                        style={{

                                            backgroundColor: 'rgb(255, 105, 105)',
                                            width: 130,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            left: 150
                                        }}
                                        activeOpacity={0.6} >
                                        <Text style={{
                                            color: 'white',
                                        }} >Send</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    )
                }
            </View>
        </View >
    )
}

export default FriendsScreen


