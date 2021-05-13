import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native'


function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


const PrivateConversationScreen = () => {


    const route = useRoute()
    const {
        chats,
        userId,
        socket,
        recieverId,
    } = route.params

    

    const forceUpdate = useForceUpdate()

    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

    const onSend = (message) => {
        message[0]._id = ObjectId()
        chats.unshift(message[0])
        forceUpdate()
        socket.emit("send-private-message", {
            chatObj: message[0],
            recieverId: recieverId
        })
    }



    return (<GiftedChat
        messages={chats}
        onSend={
            message => onSend(message)
        }
        user={{
            _id: userId,
        }}
    />)
}

export default PrivateConversationScreen