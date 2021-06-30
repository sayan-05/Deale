import React, { useEffect, useState, } from 'react';
import { View, TouchableOpacity, ScrollView ,ToastAndroid } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from 'react-native-vector-icons/Ionicons'
import { ListItem, Avatar, Overlay, Button, Text } from 'react-native-elements'


const PeopleScreen = ({ navigation }) => {


    const [peopleList, setPeople] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await API.get('get/people', {
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
            height: '100%',
            backgroundColor: 'white'
        }} >
            <Overlay isVisible={loading} >
                <Button loading containerStyle={{
                    width: 150,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    buttonStyle={{
                        backgroundColor: 'white'
                    }}
                    loadingProps={{
                        color: 'red',
                        size: 40
                    }}
                />
                <Text style={{
                    alignSelf: 'center'
                }} >Sending Friend Request</Text>
            </Overlay>
            <ScrollView >
                {
                    peopleList.map(
                        (i) => {
                            return (
                                <ListItem
                                    button
                                    key={i._id}
                                    bottomDivider
                                    containerStyle={{
                                        borderBottomWidth: 0.5
                                    }} >
                                    <ListItem.Content style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
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
                                        <ListItem.Title>
                                            {i.firstName + ' ' + i.lastName}
                                        </ListItem.Title>
                                        <TouchableOpacity
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                            activeOpacity={0.2}
                                            onPress={
                                                async () => {
                                                    setLoading(true)
                                                    API.post('post/test', {
                                                        friendId: i._id
                                                    }, {
                                                        headers: {
                                                            "auth-token": await AsyncStorage.getItem("token")
                                                        }
                                                    }).then(
                                                        data => {
                                                            console.log(data.data)
                                                            setLoading(false)
                                                            setPeople(prevState => {
                                                                const prevStateCopy = JSON.parse(JSON.stringify(prevState))
                                                                const filteredState = prevStateCopy.filter(v => v._id !== i._id)
                                                                return filteredState
                                                            })
                                                            ToastAndroid.show("Friend Request Sent",ToastAndroid.SHORT)
                                                        }
                                                    )
                                                }} >
                                            <Icon
                                                name="person-add-sharp"
                                                size={28}
                                                color="rgb(230, 57, 70)" />
                                        </TouchableOpacity>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        }
                    )
                }
            </ScrollView>
        </View >
    )
}

export default PeopleScreen