import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import API from "../api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigationState } from "@react-navigation/native"
import io from 'socket.io-client'

const PeopleScreen = ({ route, navigation }) => {


    const [peopleList, setPeople] = useState([])

    let [socket, setSocket] = useState(undefined)
    const routesLength = useNavigationState(state => state.routes.length);

    useEffect(
        () => {
            const fetchDataAndSocket = async () => {
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
                if (routesLength == 1) {
                    console.log("New")
                    const newSocket = io("http://192.168.43.115:8000", {
                        transports: ['websocket'],
                        query: {
                            token: await AsyncStorage.getItem("token")
                        }
                    })
                    setSocket(newSocket)
                } else {
                    const { socketInstance } = route.params
                    setSocket(socketInstance)
                }
            }
            fetchDataAndSocket()
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
                                    }} >{i.firstName + ' ' + i.email}</Text>
                                    <TouchableOpacity
                                        onPress={
                                            async () => {
                                                console.log(socket)
                                                API.post('post/add-friend', {
                                                    friend_email: i.email
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