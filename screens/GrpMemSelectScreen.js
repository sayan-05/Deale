import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useAtom } from "jotai"
import { friendsListAtom } from "../atomState"
import Icon from 'react-native-vector-icons/AntDesign'
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { groupMsgAtom } from "../atomState.js"
import { useNavigation } from '@react-navigation/native';

const GrpMemSelectScreen = () => {
    const [friendsList] = useAtom(friendsListAtom)
    const [isSelected, setIsSelected] = useState([])
    const [groupName, setGroupName] = useState('')
    const [groupMessages, setGroupMessages] = useAtom(groupMsgAtom)
    const navigation = useNavigation()

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <Text>Group Name</Text>
            <TextInput style={{
                backgroundColor: 'rgb(242, 242, 242)',
                width: '90%',
                height: 45,
                textAlign: 'center',
                borderRadius: 5
            }}
                onChangeText={v => setGroupName(v)} />
            <ScrollView style={{
                width: '100%'
            }} >
                {
                    friendsList.map(
                        (i) => {
                            return (
                                <TouchableOpacity onPress={
                                    () => {
                                        setIsSelected((prevState) => {
                                            const prevStateCopy = [...prevState]
                                            if (prevStateCopy.includes(i._id)) {
                                                const index = prevStateCopy.indexOf(i._id)
                                                prevStateCopy.splice(index, 1)
                                            } else {
                                                prevStateCopy.push(i._id)
                                            }
                                            return prevStateCopy
                                        })
                                    }

                                }
                                    style={{
                                        width: '100%',
                                    }} >
                                    <View
                                        key={i._id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginVertical: 5,
                                            marginBottom: 10,
                                            backgroundColor: isSelected.includes(i._id) ? "blue" : "grey",
                                            height: 50,
                                        }}
                                        key={i._id} >
                                        <Text style={{
                                            maxWidth: "50%"
                                        }} >{i.firstName + ' ' + i.lastName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    )
                }
            </ScrollView>
            <TouchableOpacity onPress={
                async () => {
                    const response = await API.post('post/create-group', {
                        members : isSelected,
                        name : groupName
                    }, {
                        headers: {
                            "auth-token": await AsyncStorage.getItem("token")
                        }
                    })
                    setGroupMessages((prevState) => [...prevState,response.data] )
                    navigation.goBack()
                }
            } >
                <Icon name="rightcircle" size={45} color="rgb(179, 252, 195)" />
            </TouchableOpacity>
        </View >
    )
}

export default GrpMemSelectScreen