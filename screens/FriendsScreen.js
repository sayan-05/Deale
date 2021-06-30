import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { friendsListAtom } from "../atomState"
import { useAtom } from "jotai"
import { useNavigation } from '@react-navigation/native';
import { recieverIdAtom } from "../atomState.js"
import { ListItem, Avatar } from 'react-native-elements'


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
            height: '100%',
            backgroundColor: 'white'
        }} >
            < ScrollView >
                {
                    friendsList.map(
                        (i) => {
                            return (
                                <ListItem
                                    button
                                    key={i._id}
                                    bottomDivider
                                    containerStyle={{
                                        borderBottomWidth: 0.5
                                    }}
                                    onPress={() => {
                                        setRecieverId(i._id)
                                        navigation.navigate("PrivateConversation", { name: i.firstName })
                                    }} >
                                    {
                                        i.avatar === null ?
                                            <Avatar
                                                rounded
                                                icon={{ name: 'user', type: 'font-awesome' }}
                                                activeOpacity={0.7}
                                                containerStyle={{
                                                    backgroundColor: 'grey'
                                                }}
                                            />
                                            :
                                            <Avatar rounded source={{ uri: i.avatar }} />
                                    }
                                    <ListItem.Content >
                                        <ListItem.Title >
                                            {i.firstName + ' ' + i.lastName}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        }
                    )
                }
            </ ScrollView >
        </View >
    )
}

export default FriendsScreen


