import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const ChatScreen = () => {

    return (<View>
        <ScrollView >
            {
                [1, 42, 64, 12, 54, 7567, 86, 86, 6865, 3, 2, 23].map(
                    (i) => <Text style={{
                        marginTop: 60
                    }} >{i}</Text>
                )
            }
        </ScrollView>
    </View>)
}

export default ChatScreen