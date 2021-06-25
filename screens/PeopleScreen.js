import React, { useEffect, useState,} from 'react';
import { View,TouchableOpacity, ScrollView } from 'react-native';
import API from '../api.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from 'react-native-vector-icons/Ionicons'
import { ListItem, Avatar } from 'react-native-elements'


const PeopleScreen = ({ navigation }) => {


    const [peopleList, setPeople] = useState([])



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
            <ScrollView >
                {
                    peopleList.map(
                        (i, key) => {
                            return (
                                <ListItem
                                    key={key} >
                                    <ListItem.Content style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomWidth: 0.5
                                    }} >
                                        <Avatar rounded source={{ uri: i.avatar }} />
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
                                                    API.post('post/add-friend', {
                                                        friendId: i._id
                                                    }, {
                                                        headers: {
                                                            "auth-token": await AsyncStorage.getItem("token")
                                                        }
                                                    }).then(
                                                        data => console.log(data.data)
                                                    )
                                                }} >
                                            <Icon
                                                name="person-add-sharp"
                                                size={28}
                                                color="#00ffbf" />
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