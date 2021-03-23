import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import API from "../api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PeopleScreen = ({ route, navigation }) => {

    const [peopleList, setPeople] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/users', {
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token" : await AsyncStorage.getItem("token")
                        }
                    })
                    setPeople(response.data)
                } catch (err) {
                    console.log(err.response)
                }
            }
            fetchData()
        }, []
    )



    const { socket } = route.params
    socket.on(
        'connect', () => {
            console.log("Connected")
        }
    )
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }} >
            <View>
                {
                    peopleList.map(
                        (i) => {
                            return (
                                <Text>{i.firstName}</Text>
                            )
                        }
                    )
                }
            </View>
        </View>
    )
}

export default PeopleScreen