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
import { ListItem, Avatar } from 'react-native-elements'

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
            socket.on("recieve-group-message", (data) => {
                setGroupMessages((prevState) => {
                    const groupMessagesCopy = [...prevState]
                    groupMessagesCopy.forEach((i) => {
                        if (i._id == data.groupId) {
                            i.chat.unshift(data.chatObj)
                        }
                    })
                    return groupMessagesCopy
                })
            })
        }, []
    )
    return (<View style={{
        height: '100%',
        backgroundColor: 'white'
    }} >
        <ScrollView >
            {
                groupMessages.map(
                    (i) => (
                        <>
                            <ListItem
                                button
                                bottomDivider
                                key={i._id}
                                onPress={() => {
                                    setGroupId(i._id)
                                    navigation.navigate("GroupConversation", {
                                        name: i.name
                                    })
                                }
                                }
                                containerStyle={{
                                    borderBottomWidth: 0.5
                                }}
                            >
                                {
                                    i.avatar === null ?
                                        <Avatar
                                            rounded
                                            icon={{ name: 'group', type: 'font-awesome' }}
                                            activeOpacity={0.7}
                                            containerStyle={{
                                                backgroundColor: 'grey'
                                            }}
                                        />
                                        :
                                        <Avatar rounded source={{ uri: i.avatar }} />
                                }
                                <ListItem.Content >
                                    <ListItem.Title
                                    >
                                        {i.name}
                                    </ListItem.Title>
                                    {
                                        i.chat.length !== 0 ?
                                            <ListItem.Subtitle>
                                                {i.chat[0].text}
                                            </ListItem.Subtitle> : null
                                    }
                                </ListItem.Content>
                            </ListItem>
                        </>
                    )
                )
            }
        </ScrollView>
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                elevation: 5,
                shadowOpacity: 0.8,
                backgroundColor: '#fff',
                borderRadius: 26
            }}
            onPress={
                () => navigation.navigate("GrpMemSelect")
            } >
            <Icon name="pluscircle" size={45} color="rgb(230, 57, 70)" />
        </TouchableOpacity>
    </View>)
}

export default GroupScreen