import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native'
import { privateMsgAtom } from "../atomState"
import { singleChatMsgAtom } from "../atomState"
import { useAtom } from "jotai"

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


const PrivateConversationScreen = () => {


    const route = useRoute()
    const {
        userId,
        socket,
        recieverId,
    } = route.params

    let [,setPrivateMessages] = useAtom(privateMsgAtom)

    const [chats] = useAtom(singleChatMsgAtom)


    const forceUpdate = useForceUpdate()

    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

    const onSend = (message) => {
        message[0]._id = ObjectId()
        setPrivateMessages(prevState => {
            const privateMessagesCopy = JSON.parse(JSON.stringify(prevState))
            privateMessagesCopy.forEach((i) => {
                if (i.pair[0]._id == recieverId) {
                    i.chat.unshift(message[0])
                }
            })
            return privateMessagesCopy
        }
        )
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