import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { friendsListAtom } from "../atomState"
import { useAtom } from "jotai"
import { useNavigation } from '@react-navigation/native';
import { recieverIdAtom } from "../atomState.js"


const FriendsScreen = () => {
    const [friendsList, setFriendsList] = useAtom(friendsListAtom)

    let [, setRecieverId] = useAtom(recieverIdAtom)

    const navigation = useNavigation()

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
        }, []
    )

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '90%'
        }} >
            < ScrollView >
                {
                    friendsList.map(
                        (i) => {
                            return (
                                <View
                                    key={i._id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginVertical: 5,
                                        marginBottom: 10,
                                        backgroundColor: 'grey',
                                        height: 50

                                    }}
                                    key={i._id} >
                                    <Text style={{
                                        maxWidth: "50%"
                                    }} >{i.firstName + ' ' + i.lastName}</Text>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                setRecieverId(i._id)
                                                navigation.navigate("PrivateConversation", {
                                                    name: i.firstName
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
            </ ScrollView >
        </View >
    )
}

export default FriendsScreen


