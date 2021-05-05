import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native'

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


const PrivateConversationScreen = () => {

    const route = useRoute()
    const {
        chats,
        userId,
     } = route.params

    const forceUpdate = useForceUpdate()   


    const onSend = (messages) => {
        chats.unshift(messages[0])
        forceUpdate()
    }



    return (<GiftedChat
        messages={chats}
        onSend={
            messages => onSend(messages)
        }
        user={{
            _id: userId,
        }}
    />)
}

export default PrivateConversationScreen