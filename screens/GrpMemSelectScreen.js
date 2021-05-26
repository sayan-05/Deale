import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView , TextInput } from 'react-native';
import { useAtom } from "jotai"
import { friendsListAtom } from "../atomState"
import Icon from 'react-native-vector-icons/AntDesign'


const GrpMemSelectScreen = () => {
    const [friendsList] = useAtom(friendsListAtom)
    const [isPressedComponent, setIsPressedComponent] = useState([])
    const [nameField,setNameField] = useState('')


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: 100,
            justifyContent : 'center',
            alignItems : 'center'
        }} >
            <Text>Group Name</Text>
            <TextInput style={{
                backgroundColor: 'rgb(242, 242, 242)',
                width: '90%',
                height: 45,
                textAlign: 'center',
                borderRadius: 5
            }}
            onChangeText = {v => setNameField(v)} />
            <ScrollView style = {{
                width : '100%'
            }} >
                {
                    friendsList.map(
                        (i) => {
                            return (
                                <TouchableOpacity onPress={
                                    () => {
                                        setIsPressedComponent((prevState) => {
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
                                style = {{
                                    width : '100%',
                                }} >
                                    <View
                                        key={i._id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginVertical: 5,
                                            marginBottom: 10,
                                            backgroundColor: isPressedComponent.includes(i._id) ? "blue" : "grey",
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
            <TouchableOpacity>
            <Icon name="rightcircle" size={45} color="rgb(179, 252, 195)" />
            </TouchableOpacity>
        </View >
    )
}

export default GrpMemSelectScreen