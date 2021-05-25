import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAtom } from "jotai"
import { friendsListAtom } from "../atomState"

const GrpMemSelectScreen = () => {
    const [friendsList] = useAtom(friendsListAtom)

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '90%'
        }} >
            <ScrollView  >
                {
                    friendsList.map(
                        (i) => {
                            return (
                                <TouchableOpacity>
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
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    )
                }
            </ScrollView>
        </View >
    )
}

export default GrpMemSelectScreen