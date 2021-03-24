import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import API from "../api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PeopleScreen = ({ navigation }) => {


    const [peopleList, setPeople] = useState([])


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
                                }} >
                                    <Text style={{
                                        maxWidth: "50%"
                                    }} >{i.firstName + ' ' + i.email}</Text>
                                    <TouchableOpacity
                                        onPress={
                                            async () => {
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
        </View>
    )
}

export default PeopleScreen