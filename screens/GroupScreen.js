import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import API from '../api.js'
import { useNavigation } from '@react-navigation/native';
import { groupMsgAtom } from "../atomState.js"
import { groupIdAtom } from "../atomState.js"
import { socketAtom } from '../atomState'
import { useAtom } from "jotai"
import Icon from 'react-native-vector-icons/AntDesign'

const GroupScreen = () => {

    let [groupMessages, setGroupMessages] = useAtom(groupMsgAtom)

    let [socket] = useAtom(socketAtom)

    let [, setGroupId] = useAtom(groupIdAtom)

    const navigation = useNavigation()

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/group-chats', {
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": await AsyncStorage.getItem("token")
                        }
                    })
                    setGroupMessages(response.data)
                } catch (err) {
                    console.log(err.response)
                }
            }
            fetchData()

        }, []
    )
    return (<View>
        <TouchableOpacity onPress = {
            () => navigation.navigate("GrpMemSelect")
        } >
            <Icon name="pluscircle" size={45} color="rgb(179, 252, 195)" />
        </TouchableOpacity>
        <ScrollView >
            {
                groupMessages.map(
                    (i) => (
                        <>
                            <TouchableOpacity
                                key={i._id}
                                onPress={() => {
                                    setGroupId(i._id)
                                    navigation.navigate("GroupConversation", {
                                        name: i.name
                                    })
                                }
                                } >
                                <Text key={i._id} >{i.name}</Text>
                            </TouchableOpacity>
                        </>
                    )
                )

            }
        </ScrollView>
    </View>)
}

export default GroupScreen