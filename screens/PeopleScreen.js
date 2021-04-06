import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SocketObj } from "./Main"


const PeopleScreen = ({ navigation }) => {

    let socket = useContext(SocketObj)


    const [peopleList, setPeople] = useState([])


    let socketEvent = () => {
        socket.on("recieve-private-message", (data) => {
            console.log(data)
        })
    }

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/users', {
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": await AsyncStorage.getItem("token")
                        }
                    })
                    setPeople(response.data)
                } catch (err) {
                    console.log(err.response)
                }
            }
            fetchData()
            socketEvent()
        }, []
    )




    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '100%'
        }} >
            <View>
                {
                    peopleList.map(
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
                                    }} >{i.firstName}</Text>
                                    <TouchableOpacity
                                        onPress={
                                            async () => {
                                                socket.emit("send-private-message",
                                                    {
                                                        publicId: i.publicId,
                                                        recvText: "Hello Balaka"
                                                    })
                                                API.post('post/add-friend', {
                                                    friendPublicId: i.publicId
                                                }, {
                                                    headers: {
                                                        "auth-token": await AsyncStorage.getItem("token")
                                                    }
                                                }).then(
                                                    data => console.log(data.data)
                                                )
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
                                        }} >Add Friend</Text>
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

export default PeopleScreen